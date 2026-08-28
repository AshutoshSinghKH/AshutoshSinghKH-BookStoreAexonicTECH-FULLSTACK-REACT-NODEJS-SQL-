import { Link } from "react-router-dom";
import "./OrderSuccess.css";
import Footer from "../components/Footer";

function OrderSuccess() {
  return (
    <div className="order-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          Thank you for your order. Your books are on their way!
        </p>


        <div className="order-details">

          <div className="order-detail">
            <span>Order ID</span>
            <strong>#BS2026001</strong>
          </div>

          <div className="order-detail">
            <span>Payment Method</span>
            <strong>Cash on Delivery</strong>
          </div>

          <div className="order-detail">
            <span>Order Status</span>
            <strong className="status">
              Confirmed
            </strong>
          </div>

        </div>


        <div className="success-actions">

          <Link
            to="/orders"
            className="view-orders-btn"
          >
            View My Orders
          </Link>

          <Link
            to="/dashboard"
            className="continue-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;