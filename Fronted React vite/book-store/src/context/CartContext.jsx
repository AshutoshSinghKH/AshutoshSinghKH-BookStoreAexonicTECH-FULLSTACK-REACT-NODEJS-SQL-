import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add book to cart
  const addToCart = (book) => {
    setCart((currentCart) => {
      const existingBook = currentCart.find(
        (item) => item.id === book.id
      );

      if (existingBook) {
        return currentCart.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...book,
          quantity: 1,
        },
      ];
    });
  };

  // Remove book completely
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Total number of books
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}