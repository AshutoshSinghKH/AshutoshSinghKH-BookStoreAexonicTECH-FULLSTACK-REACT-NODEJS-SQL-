const pool = require("../config/db");


// GET ALL ADDRESSES OF LOGGED-IN USER
const getAddresses = async (req, res) => {
  try {

    const userId = req.user.userId;

    const [addresses] = await pool.query(
      `SELECT *
       FROM addresses
       WHERE user_id = ?
       ORDER BY id DESC`,
      [userId]
    );

    res.status(200).json(addresses);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch addresses",
    });

  }
};


// ADD ADDRESS
const addAddress = async (req, res) => {
  try {

    const userId = req.user.userId;

    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;


    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    const [result] = await pool.query(
      `INSERT INTO addresses
       (user_id, name, phone, address, city, state, pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        name,
        phone,
        address,
        city,
        state,
        pincode,
      ]
    );


    res.status(201).json({
      message: "Address added successfully",
      addressId: result.insertId,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add address",
    });

  }
};


// UPDATE ADDRESS
const updateAddress = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params;

    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;


    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    const [result] = await pool.query(
      `UPDATE addresses
       SET
         name = ?,
         phone = ?,
         address = ?,
         city = ?,
         state = ?,
         pincode = ?
       WHERE id = ?
       AND user_id = ?`,
      [
        name,
        phone,
        address,
        city,
        state,
        pincode,
        id,
        userId,
      ]
    );


    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Address not found",
      });
    }


    res.status(200).json({
      message: "Address updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update address",
    });

  }
};


// DELETE ADDRESS
const deleteAddress = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { id } = req.params;


    const [result] = await pool.query(
      `DELETE FROM addresses
       WHERE id = ?
       AND user_id = ?`,
      [id, userId]
    );


    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Address not found",
      });
    }


    res.status(200).json({
      message: "Address deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete address",
    });

  }
};


module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};