import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { createOrder } from "../services/orderApi";

import "./Checkout.css";
import Footer from "../components/Footer";


function Checkout() {

  const navigate = useNavigate();

  const location = useLocation();


  const {
    cart,
    totalItems,
    totalAmount,
    clearCart,
  } = useCart();


  // Address selected from Addresses page
  const addressId = location.state?.addressId;


  // Place Order
  const handlePlaceOrder = async () => {

    // Check address
    if (!addressId) {

      alert("Please select a delivery address.");

      navigate("/addresses");

      return;

    }


    // Check cart
    if (cart.length === 0) {

      alert("Your cart is empty.");

      return;

    }


    try {

      // Convert cart into backend order items
      const items = cart.map((book) => ({

        bookId: book.id,

        quantity: Number(book.quantity),

      }));


      const orderData = {

        addressId: addressId,

        paymentMethod: "COD",

        items: items,

      };


      console.log(
        "ORDER DATA:",
        orderData
      );


      // POST order
      const response = await createOrder(
        orderData
      );


      console.log(
        "ORDER RESPONSE:",
        response
      );


      // Clear cart only after successful order
      clearCart();


      // Go to success page
      navigate("/order-success");

    } catch (error) {

      console.error(
        "Order failed:",
        error
      );


      console.error(
        "Backend response:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Failed to place order"
      );

    }

  };


  // Empty cart
  if (cart.length === 0) {

    return (

      <div className="checkout-page">

        <div className="checkout-empty">

          <h2>
            No items to checkout
          </h2>

          <p>
            Your cart is empty.
          </p>

          <Link to="/dashboard">
            Browse Books
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="checkout-page">

      <div className="checkout-container">


        {/* Header */}

        <div className="checkout-header">

          <div>

            <h1>
              Checkout
            </h1>

            <p>
              Review your order before placing it.
            </p>

          </div>


          <Link to="/cart">
            ← Back to Cart
          </Link>

        </div>



        <div className="checkout-content">


          {/* LEFT */}

          <div className="checkout-left">


            {/* Delivery Address */}

            <div className="checkout-card">

              <div className="checkout-card-header">

                <h2>
                  Delivery Address
                </h2>

                <Link to="/addresses">
                  Change
                </Link>

              </div>


              <div className="checkout-address">

                <p>
                  Selected Address ID: {addressId}
                </p>

                <p>
                  Your selected delivery address will be used for this order.
                </p>

              </div>

            </div>



            {/* Order Items */}

            <div className="checkout-card">

              <div className="checkout-card-header">

                <h2>
                  Order Items
                </h2>

                <span>

                  {totalItems}{" "}

                  {totalItems === 1
                    ? "Item"
                    : "Items"}

                </span>

              </div>


              <div className="checkout-items">

                {cart.map((book) => (

                  <div
                    className="checkout-item"
                    key={book.id}
                  >


                    <div className="checkout-item-image">

                      <img
                        src={book.image}
                        alt={book.title}
                      />

                    </div>


                    <div className="checkout-item-info">

                      <h3>
                        {book.title}
                      </h3>

                      <p>
                        {book.author}
                      </p>

                      <span>
                        Quantity: {book.quantity}
                      </span>

                    </div>


                    <strong>
                      ₹{book.price * book.quantity}
                    </strong>


                  </div>

                ))}

              </div>

            </div>



            {/* Payment */}

            <div className="checkout-card">

              <h2>
                Payment Method
              </h2>


              <div className="payment-option">

                <input
                  type="radio"
                  checked
                  readOnly
                />


                <div>

                  <strong>
                    Cash on Delivery
                  </strong>

                  <p>
                    Pay when your order is delivered.
                  </p>

                </div>

              </div>

            </div>


          </div>



          {/* RIGHT */}

          <div className="checkout-summary">

            <h2>
              Price Details
            </h2>


            <div className="price-row">

              <span>
                Items ({totalItems})
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>


            <div className="price-row">

              <span>
                Delivery
              </span>

              <strong>
                Free
              </strong>

            </div>


            <hr />


            <div className="price-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>


            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>


            <p className="secure-note">
              🔒 Your order information is secure.
            </p>


          </div>


        </div>

      </div>

    </div>

  );

}


export default Checkout;