import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({
  book,
  showAddButton = false,
  onAddToCart,
}) {
  return (
    <div className="book-card">

      <div className="book-image">
        <img
          src={book.image}
          alt={book.title}
        />
      </div>


      <div className="book-info">

        {book.category && (
          <span className="book-category">
            {book.category}
          </span>
        )}

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


          {showAddButton ? (

            <button
              onClick={() => onAddToCart(book)}
            >
              Add to Cart
            </button>

          ) : (

            <Link to={`/books/${book.id}`}>
           
            </Link>

          )}

        </div>

      </div>

    </div>
  );
}

export default BookCard;