import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import App from "./App";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <UserProvider>
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
</UserProvider>
  </StrictMode>
);