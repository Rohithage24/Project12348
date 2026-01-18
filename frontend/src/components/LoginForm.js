import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SignupForm from "./SignupForm";

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [formData, setFormData] = useState({ gmail: "", password: "" });
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // ✅ ONLY ONCE

      if (res.ok && data.user && data.token) {
        // ✅ Update auth context
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        // ✅ Save clean auth object
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );

        setMessage(data.message || "Login successful");

        onClose && onClose();
        navigate("/");
      } else if (res.status === 401) {
        setMessage(data.message || "Wrong email or password");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Login error. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!showSignup ? (
          <>
            <button className="modal-close-btn" onClick={onClose}>
              ✖
            </button>
            <h2 className="modal-heading">Login</h2>

            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="email"
                name="gmail"
                className="modal-input"
                placeholder="Email Address"
                value={formData.gmail}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                className="modal-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="modal-button">
                Login
              </button>

              <p className="modal-link-small">
                Don’t have an account?{" "}
                <span
                  onClick={() => setShowSignup(true)}
                  className="modal-link"
                >
                  Sign up
                </span>
              </p>

              {message && <div className="alert-info">{message}</div>}
            </form>
          </>
        ) : (
          <SignupForm onClose={onClose} onBack={() => setShowSignup(false)} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
