import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Interview Prep</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>

        {auth?.user ? (
          <div style={{ position: "relative" }}>
            <button
              className="navbar-button"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {auth.user.Name}
            </button>

            {showDropdown && (
              <div className="navbar-dropdown-content">
                <Link to="/profile" onClick={() => setShowDropdown(false)} className="navbar-dropdown-item">Profile</Link>
                <Link to="/settings" onClick={() => setShowDropdown(false)} className="navbar-dropdown-item">Settings</Link>
                <Link to="/" onClick={handleLogout} className="navbar-dropdown-item">Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => setShowLogin(true)} className="navbar-button">Login</button>
            <button onClick={() => setShowSignup(true)} className="navbar-button-dark">Signup</button>
          </>
        )}
      </div>

      {showLogin && (
        <div className="navbar-overlay" onClick={closeModals}>
          <div className="navbar-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={closeModals} />
          </div>
        </div>
      )}

      {showSignup && (
        <div className="navbar-overlay" onClick={closeModals}>
          <div className="navbar-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <SignupForm onClose={closeModals} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
