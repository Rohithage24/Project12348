import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openLogin) {
      setShowLogin(true);
    }
  }, [location]);

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}/logout`, {
        method: "GET",
        credentials: "include",
      });
      setAuth({ user: null, token: "" });
      localStorage.removeItem("auth");
      setShowDropdown(false);
    } catch (err) {
      console.error("Logout API failed", err);
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>Mock<span>Prep</span> 🚀</div>
      
      <div className='navbar-links'>
        <Link to='/' className='navbar-link'>Home</Link>
        <Link to='/about' className='navbar-link'>About</Link>
        <Link to='/contact' className='navbar-link'>Contact</Link>

        {auth?.user ? (
          <div className="user-menu-container">
            <button
              className='navbar-user-btn'
              onClick={() => setShowDropdown(prev => !prev)}
            >
              {auth.user.Name} ▾
            </button>

            {showDropdown && (
              <div className='navbar-dropdown-content'>
                <Link to='/profile' onClick={() => setShowDropdown(false)} className='navbar-dropdown-item'>
                  Profile
                </Link>
                <Link to='/settings' onClick={() => setShowDropdown(false)} className='navbar-dropdown-item'>
                  Settings
                </Link>
                <div onClick={handleLogout} className='navbar-dropdown-item logout'>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => setShowLogin(true)} className='navbar-button-outline'>
              Login
            </button>
            <button onClick={() => setShowSignup(true)} className='navbar-button-filled'>
              Signup
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {(showLogin || showSignup) && (
        <div className='navbar-overlay' onClick={closeModals}>
          <div className='navbar-modal-wrapper' onClick={e => e.stopPropagation()}>
            {showLogin ? <LoginForm onClose={closeModals} /> : <SignupForm onClose={closeModals} />}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;