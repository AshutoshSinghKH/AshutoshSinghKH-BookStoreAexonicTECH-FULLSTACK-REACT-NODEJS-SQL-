import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./context/UserContext";


function App() {

  const { user } = useUser();

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Home />
        }
      />


      {/* PROTECTED */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;