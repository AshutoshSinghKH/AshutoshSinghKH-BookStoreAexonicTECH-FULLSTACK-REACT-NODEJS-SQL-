import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { useUser } from "../context/UserContext";
import "./LoginModal.css";

function LoginModal({ onClose, onRegister }) {

  const navigate = useNavigate();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {

      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      // Save user + JWT
      login(data);

      // Close modal
      onClose();

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="modal-overlay">

      <div className="login-modal">

        <button
          type="button"
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>


        <div className="modal-header">

          <div className="modal-icon">
            📚
          </div>

          <h2>Welcome Back</h2>

          <p>
            Login to continue shopping
          </p>

        </div>


        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          {error && (
            <p className="form-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="modal-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <div className="modal-footer">

          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="switch-btn"
            onClick={onRegister}
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default LoginModal;