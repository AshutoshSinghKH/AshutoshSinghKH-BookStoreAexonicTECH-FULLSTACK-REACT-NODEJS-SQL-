const pool = require("../config/db");


// CREATE ORDER
const createOrder = async (req, res) => {

  const connection = await pool.getConnection();

  try {

   console.log("REQ.USER:", req.user);

    const userId = req.user.userId;

    console.log("ORDER USER ID:", userId);


    const {
      addressId,
      paymentMethod,
      items,
    } = req.body;


    // Check address belongs to logged-in user
    const [addresses] = await connection.query(
      `SELECT id
       FROM addresses
       WHERE id = ?
       AND user_id = ?`,
      [addressId, userId]
    );


    if (addresses.length === 0) {

      return res.status(404).json({
        message: "Address not found",
      });

    }


    // Calculate total from database prices
    let totalAmount = 0;

    const orderItems = [];


    for (const item of items) {

      const [books] = await connection.query(
        `SELECT id, price
         FROM books
         WHERE id = ?`,
        [item.bookId]
      );


      if (books.length === 0) {

        return res.status(404).json({
          message: `Book with id ${item.bookId} not found`,
        });

      }


      const book = books[0];

      const quantity = Number(item.quantity);

      const price = Number(book.price);

      const itemTotal = price * quantity;

      totalAmount += itemTotal;


      orderItems.push({
        bookId: book.id,
        quantity,
        price,
      });

    }


    // Start transaction
    await connection.beginTransaction();


    // Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders
       (user_id, address_id, total_amount, payment_method, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        userId,
        addressId,
        totalAmount,
        paymentMethod || "COD",
        "Confirmed",
      ]
    );


    const orderId = orderResult.insertId;


    // Insert order items
    for (const item of orderItems) {

      await connection.query(
        `INSERT INTO order_items
         (order_id, book_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [
          orderId,
          item.bookId,
          item.quantity,
          item.price,
        ]
      );

    }


    // Commit transaction
    await connection.commit();


    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      totalAmount,
    });


  } catch (error) {

    await connection.rollback();

    console.error(error);

    res.status(500).json({
      message: "Failed to place order",
    });

  } finally {

    connection.release();

  }
};



// GET ALL ORDERS OF LOGGED-IN USER
const getOrders = async (req, res) => {

  try {

    const userId = req.user.userId;


    const [orders] = await pool.query(
      `SELECT
        o.id,
        o.total_amount,
        o.payment_method,
        o.status,
        o.created_at,

        a.name AS address_name,
        a.phone,
        a.address,
        a.city,
        a.state,
        a.pincode

       FROM orders o

       JOIN addresses a
       ON o.address_id = a.id

       WHERE o.user_id = ?

       ORDER BY o.created_at DESC`,
      [userId]
    );


    // Get items for every order
    for (const order of orders) {

      const [items] = await pool.query(
        `SELECT
          oi.book_id,
          oi.quantity,
          oi.price,

          b.title,
          b.author,
          b.image

         FROM order_items oi

         JOIN books b
         ON oi.book_id = b.id

         WHERE oi.order_id = ?`,
        [order.id]
      );


      order.items = items;

    }


    res.status(200).json(orders);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });

  }
};



// GET SINGLE ORDER
const getOrderById = async (req, res) => {

  try {

    const userId = req.user.userId;

    const { id } = req.params;


    const [orders] = await pool.query(
      `SELECT
        o.id,
        o.total_amount,
        o.payment_method,
        o.status,
        o.created_at,

        a.name AS address_name,
        a.phone,
        a.address,
        a.city,
        a.state,
        a.pincode

       FROM orders o

       JOIN addresses a
       ON o.address_id = a.id

       WHERE o.id = ?
       AND o.user_id = ?`,
      [id, userId]
    );


    if (orders.length === 0) {

      return res.status(404).json({
        message: "Order not found",
      });

    }


    const order = orders[0];


    // Get order items
    const [items] = await pool.query(
      `SELECT
        oi.book_id,
        oi.quantity,
        oi.price,

        b.title,
        b.author,
        b.image

       FROM order_items oi

       JOIN books b
       ON oi.book_id = b.id

       WHERE oi.order_id = ?`,
      [id]
    );


    order.items = items;


    res.status(200).json(order);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
    });

  }
};



module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};