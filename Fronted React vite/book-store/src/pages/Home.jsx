import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Home.css";

import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import BookCard from "../components/BookCard";

import { getBooks } from "../services/bookApi";
import Footer from "../components/Footer";


function Home() {

  const [showLogin, setShowLogin] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const [books, setBooks] = useState([]);


  // GET BOOKS FROM BACKEND
  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const data = await getBooks();

        // Home par sirf 4 books
        setBooks(data.slice(0, 4));

      } catch (error) {

        console.error(
          "Failed to fetch books:",
          error
        );

      }

    };

    fetchBooks();

  }, []);


  return (

    <div className="home">


      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div className="navbar-logo">
          📚 BookStore
        </div>


        <div className="navbar-links">

          <Link
            to="/"
            className="active"
          >
            Home
          </Link>


          <a href="#offers">
            Offers
          </a>


          {/* <a href="#features">
            Why Us
          </a> */}

        </div>


        <div className="navbar-actions">

          <button
            type="button"
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>


          <button
            type="button"
            className="register-btn"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>

        </div>

      </nav>



      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-subtitle">
            WELCOME TO BOOKSTORE
          </p>


          <h1>

            Discover Your

            <br />

            Next <span>Great Book</span>

          </h1>


          <p className="hero-description">

            Explore a wide collection of books
            across categories.

            <br />

            Find your next favorite read.

          </p>


        </div>


        <div className="hero-image">

          <img
            src="/books/hero-books.webp"
            alt="Books"
          />

        </div>

      </section>



      {/* ================= POPULAR BOOKS ================= */}

      <section className="section">


        <div className="section-header">

          <h2>
            Popular Books
          </h2>

        </div>


        <div className="book-grid">

          {books.map((book) => (

            <BookCard
              key={book.id}
              book={book}
            />

          ))}

        </div>

      </section>



      {/* ================= OFFERS ================= */}

      <section
        className="offers"
        id="offers"
      >


        <div className="offer-card offer-one">

          <div>

            <p>
              BEST SELLING BOOKS
            </p>

            <h2>
              Up to 30% OFF
            </h2>

          </div>

        </div>



        <div className="offer-card offer-two">

          <div>

            <p>
              NEW ARRIVALS
            </p>

            <h2>
              Discover New Books
            </h2>

          </div>

        </div>



        <div className="offer-card offer-three">

          <div>

            <p>
              FREE SHIPPING
            </p>

            <h2>
              On orders above ₹499
            </h2>

          </div>

        </div>


      </section>



      {/* ================= WHY CHOOSE US ================= */}

      <section
        className="features"
        id="features"
      >


        <div className="feature">

          <span>
            📚
          </span>

          <div>

            <h3>
              Wide Collection
            </h3>

            <p>
              Books across different categories
            </p>

          </div>

        </div>



        <div className="feature">

          <span>
            ↩️
          </span>

          <div>

            <h3>
              Easy Returns
            </h3>

            <p>
              Simple and hassle-free returns
            </p>

          </div>

        </div>



        <div className="feature">

          <span>
            🔒
          </span>

          <div>

            <h3>
              Secure Shopping
            </h3>

            <p>
              Your information stays protected
            </p>

          </div>

        </div>



        <div className="feature">

          <span>
            💰
          </span>

          <div>

            <h3>
              Best Prices
            </h3>

            <p>
              Great books at affordable prices
            </p>

          </div>

        </div>


      </section>



      {/* ================= LOGIN MODAL ================= */}

      {showLogin && (

        <LoginModal

          onClose={() =>
            setShowLogin(false)
          }

          onRegister={() => {

            setShowLogin(false);

            setShowRegister(true);

          }}

        />

      )}



      {/* ================= REGISTER MODAL ================= */}

      {showRegister && (

        <RegisterModal

          onClose={() =>
            setShowRegister(false)
          }

          onLogin={() => {

            setShowRegister(false);

            setShowLogin(true);

          }}

        />

      )}
<Footer />

    </div>

  );

}


export default Home;