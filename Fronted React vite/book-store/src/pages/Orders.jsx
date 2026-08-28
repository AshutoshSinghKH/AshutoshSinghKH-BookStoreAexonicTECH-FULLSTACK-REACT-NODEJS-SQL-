import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getOrders } from "../services/orderApi";

import "./Orders.css";



function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // GET ORDERS
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await getOrders();

        setOrders(data);

      } catch (error) {

        console.error(
          "Failed to fetch orders:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);


  return (

    <div className="orders-page">

      <div className="orders-container">


        {/* Header */}

        <div className="orders-header">

          <div>

            <h1>
              My Orders
            </h1>

            <p>
              View and track your previous orders.
            </p>

          </div>


          <Link to="/dashboard">
            ← Back to Dashboard
          </Link>

        </div>



        {/* Loading */}

        {loading && (

          <div className="orders-message">
            Loading orders...
          </div>

        )}



        {/* No Orders */}

        {!loading && orders.length === 0 && (

          <div className="orders-empty">

            <div className="orders-empty-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't placed any orders yet.
            </p>


            <button
              onClick={() => navigate("/books")}
            >
              Browse Books
            </button>

          </div>

        )}



        {/* Orders */}

        {!loading && orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >


                {/* Order Header */}

                <div className="order-card-header">

                  <div>

                    <span className="order-label">
                      Order ID
                    </span>

                    <h3>
                      #{order.id}
                    </h3>

                  </div>


                  <div className="order-status">

                    {order.status}

                  </div>

                </div>



                {/* Order Details */}

                <div className="order-details">


                  <div className="order-detail">

                    <span>
                      Order Date
                    </span>

                    <strong>
                      {order.created_at
                        ? new Date(
                            order.created_at
                          ).toLocaleDateString()
                        : "N/A"}
                    </strong>

                  </div>



                  <div className="order-detail">

                    <span>
                      Payment
                    </span>

                    <strong>
                      {order.payment_method || "COD"}
                    </strong>

                  </div>



                  <div className="order-detail">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹{order.total_amount}
                    </strong>

                  </div>


                </div>



                {/* View Order */}

                


              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}


export default Orders;