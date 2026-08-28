import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

import { getBooks } from "../services/bookApi";

import "./Dashboard.css";
import Footer from "../components/Footer";


function Dashboard() {

  const navigate = useNavigate();

  const { user, logout } = useUser();

  const { addToCart } = useCart();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);


  // ================= GET BOOKS FROM BACKEND =================

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const data = await getBooks();

        setBooks(data);

      } catch (error) {

        console.error(
          "Failed to fetch books:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchBooks();

  }, []);


  // ================= LOGOUT =================

  const handleLogout = () => {

    logout();

    navigate("/");

  };


  // ================= ADD TO CART =================

  const handleAddToCart = (book) => {

    addToCart(book);

    alert(`${book.title} added to cart`);

  };


  return (

    <div className="dashboard">


      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">


        {/* Logo */}

        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        >
          📚 BookStore
        </div>


        {/* Navigation */}

        <div className="dashboard-links">

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </button>


          <button
            type="button"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart
          </button>


          <button
            type="button"
            onClick={() => navigate("/addresses")}
          >
            📍 Addresses
          </button>


          <button
            type="button"
            onClick={() => navigate("/orders")}
          >
            📦 Orders
          </button>

        </div>


        {/* User */}

        <div className="dashboard-user">

          <span>
            Hi, {user?.name || "User"}
          </span>


          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================= WELCOME ================= */}

      <section className="dashboard-welcome">

        <div>

          <p className="dashboard-subtitle">
            WELCOME BACK
          </p>


          <h1>
            Hello, {user?.name || "User"} 👋
          </h1>


          <p>
            Explore our collection and find your
            next favorite book.
          </p>

        </div>

      </section>


      {/* ================= BOOKS ================= */}

      <section className="dashboard-books">


        <div className="section-header">

          <div>

            <h2>
              Popular Books
            </h2>

            <p>
              Explore our bestselling collection
            </p>

          </div>

        </div>


        {/* Loading */}

        {loading && (

          <div className="loading">
            Loading books...
          </div>

        )}


        {/* No Books */}

        {!loading && books.length === 0 && (

          <div className="no-books">
            No books available.
          </div>

        )}


        {/* All Books */}

        {!loading && books.length > 0 && (

          <div className="book-grid">

            {books.map((book) => (

              <div
                className="book-card"
                key={book.id}
              >


                {/* Book Image */}

                <div className="book-image">

                  <img
                    src={book.image}
                    alt={book.title}
                  />

                </div>


                {/* Book Info */}

                <div className="book-info">

                  <h3>
                    {book.title}
                  </h3>


                  <p className="author">
                    {book.author}
                  </p>


                  <div className="rating">
                    ⭐ {book.rating}
                  </div>


                  <div className="book-bottom">

                    <strong>
                      ₹{book.price}
                    </strong>


                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(book)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="quick-actions">


        <h2>
          Quick Actions
        </h2>


        <div className="quick-action-grid">


          {/* Cart */}

          <div
            className="quick-card"
            onClick={() => navigate("/cart")}
          >

            <span>
              🛒
            </span>

            <h3>
              My Cart
            </h3>

            <p>
              View books added to your cart
            </p>

          </div>


          {/* Addresses */}

          <div
            className="quick-card"
            onClick={() => navigate("/addresses")}
          >

            <span>
              📍
            </span>

            <h3>
              My Addresses
            </h3>

            <p>
              Manage your delivery addresses
            </p>

          </div>


          {/* Orders */}

          <div
            className="quick-card"
            onClick={() => navigate("/orders")}
          >

            <span>
              📦
            </span>

            <h3>
              My Orders
            </h3>

            <p>
              Track your previous orders
            </p>

          </div>


        </div>

      </section>

      <Footer />
    </div>
    

  );

}


export default Dashboard;