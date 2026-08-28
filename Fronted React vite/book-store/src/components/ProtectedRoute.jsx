import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {

  const { user } = useUser();

  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;