import React, { useState } from "react";
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
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">Interview Prep</div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>

        {/* If user logged in */}
        {auth?.user ? (
          <div style={{ position: "relative" }}>
            <button
              className="navbar-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {auth.user.Name}
            </button>

            {showDropdown && (
              <div className="navbar-dropdown-content">
                <Link
                  to="/profile"
                  className="navbar-dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="navbar-dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Settings
                </Link>

                <Link
                  to="/"
                  className="navbar-dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* If user NOT logged in */
          <>
            <button
              className="navbar-button"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>

            <button
              className="navbar-button-dark"
              onClick={() => setShowSignup(true)}
            >
              Signup
            </button>
          </>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="navbar-overlay" onClick={closeModals}>
          <div
            className="navbar-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginForm onClose={closeModals} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="navbar-overlay" onClick={closeModals}>
          <div
            className="navbar-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <SignupForm onClose={closeModals} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
