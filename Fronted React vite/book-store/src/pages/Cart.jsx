import { Link } from "react-router-dom";

import "./Cart.css";

import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";


function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
    totalItems,
  } = useCart();


  // Empty Cart
  if (cart.length === 0) {

    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Looks like you haven't added any books yet.
          </p>

          <Link to="/dashboard">
            Browse Books
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* Header */}
        <div className="cart-header">

          <h1>
            Your Cart
          </h1>

          <span>
            {totalItems}{" "}
            {totalItems === 1
              ? "Book"
              : "Books"}
          </span>

        </div>


        <div className="cart-content">

          {/* Cart Items */}
          <div className="cart-items">

            {cart.map((book) => (

              <CartItem
                key={book.id}
                book={book}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />

            ))}

          </div>


          {/* Order Summary */}
          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <strong>
                {totalItems}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Shipping
              </span>

              <strong>
                Free
              </strong>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>


            <Link
              to="/addresses"
              className="checkout-btn"
            >
              Proceed to Checkout →
            </Link>


            <Link
              to="/dashboard"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;