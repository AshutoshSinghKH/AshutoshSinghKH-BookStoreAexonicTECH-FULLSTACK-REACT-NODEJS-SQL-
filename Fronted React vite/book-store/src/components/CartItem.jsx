import "./CartItem.css";

function CartItem({
  book,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="cart-item">

      <div className="cart-book-image">
        <img
          src={book.image}
          alt={book.title}
        />
      </div>

      <div className="cart-book-info">

        <h3>
          {book.title}
        </h3>

        <p>
          {book.author}
        </p>

        <strong>
          ₹{book.price}
        </strong>

      </div>

      <div className="quantity-control">

        <button
          onClick={() => onDecrease(book.id)}
        >
          −
        </button>

        <span>
          {book.quantity}
        </span>

        <button
          onClick={() => onIncrease(book.id)}
        >
          +
        </button>

      </div>

      <div className="cart-item-total">
        ₹{book.price * book.quantity}
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(book.id)}
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;