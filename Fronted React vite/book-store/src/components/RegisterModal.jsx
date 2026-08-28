import { useState } from "react";
import { registerUser } from "../services/authApi";
import "./LoginModal.css";

function RegisterModal({ onClose, onLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!name || !email || !password) {

      setError("All fields are required");

      return;
    }


    try {

      setLoading(true);


      await registerUser({
        name,
        email,
        password,
      });


      setSuccess(
        "Registration successful! Please login."
      );


      // Clear fields
      setName("");
      setEmail("");
      setPassword("");


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="modal-overlay">

      <div className="register-modal">

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

          <h2>Create Account</h2>

          <p>
            Join BookStore today
          </p>

        </div>


        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          {error && (
            <p className="form-error">
              {error}
            </p>
          )}


          {success && (
            <p className="form-success">
              {success}
            </p>
          )}


          <button
            type="submit"
            className="modal-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>


        <div className="modal-footer">

          <p>
            Already have an account?
          </p>

          <button
            type="button"
            className="switch-btn"
            onClick={onLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterModal;