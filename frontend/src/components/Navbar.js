import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {
  const [auth, setAuth] = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Close login/signup modals
  const closeModals = () => {
    setShowLogin(false)
    setShowSignup(false)
  }

  // When user logs in, close modals & dropdown reset
  useEffect(() => {
    if (auth?.user) {
      closeModals()
      setShowDropdown(false)
    }
  }, [auth])

  // Handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    localStorage.removeItem("auth")
    setShowDropdown(false)
  }

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo}>Interview Prep</div>
        <div style={styles.links}>
          <Link to='/' style={styles.link}>Home</Link>
          <Link to='/about' style={styles.link}>About</Link>
          <Link to='/contact' style={styles.link}>Contact</Link>

          {auth?.user ? (
            <div className='dropdown' style={{ position: 'relative' }}>
              <button
                className='dropbtn'
                style={styles.button}
                onClick={() => setShowDropdown(prev => !prev)}
              >
                {auth.user.Name}
              </button>

              {showDropdown && (
                <div style={styles.dropdownContent}>
                  <Link
                    to='/profile'
                    onClick={() => setShowDropdown(false)}
                    style={styles.dropdownItem}
                  >
                    Profile
                  </Link>
                  <Link
                    to='/settings'
                    onClick={() => setShowDropdown(false)}
                    style={styles.dropdownItem}
                  >
                    Settings
                  </Link>
                  <Link
                    to='/'
                    onClick={handleLogout}
                    style={styles.dropdownItem}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} style={styles.button}>
                Login
              </button>
              <button onClick={() => setShowSignup(true)} style={styles.buttonDark}>
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div style={styles.overlay} onClick={closeModals}>
          <div style={styles.modalWrapper} onClick={e => e.stopPropagation()}>
            <LoginForm onClose={closeModals} />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div style={styles.overlay} onClick={closeModals}>
          <div style={styles.modalWrapper} onClick={e => e.stopPropagation()}>
            <SignupForm onClose={closeModals} />
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  nav: {
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 24px',
    alignItems: 'center'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '20px'
  },
  links: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500'
  },
  button: {
    backgroundColor: 'white',
    color: '#3498db',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  buttonDark: {
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modalWrapper: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    minWidth: '500px',
    position: 'relative',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  },
  dropdownContent: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#f1f1f1',
    minWidth: '160px',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  dropdownItem: {
    padding: '10px 16px',
    textDecoration: 'none',
    color: '#333',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd'
  }
}

export default Navbar
