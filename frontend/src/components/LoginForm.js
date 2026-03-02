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
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.user && data.token) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
        setMessage(data.message || "Login successful");
        onClose && onClose();
        navigate("/");
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
          <div className="modal-inner">
            <button className="modal-close-btn" onClick={onClose}>✖</button>
            
            <div className="modal-header">
              <div className="modal-icon">🔐</div>
              <h2 className="modal-heading">Welcome Back</h2>
              <p className="modal-subtext">Login to continue your prep</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="input-group">
                <input
                  type="email"
                  name="gmail"
                  className="modal-input"
                  placeholder="Email Address"
                  value={formData.gmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  className="modal-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="modal-button">
                Login ⚡
              </button>

              <p className="modal-link-small">
                Don’t have an account?{" "}
                <span onClick={() => setShowSignup(true)} className="modal-link">
                  Sign up
                </span>
              </p>

              {message && (
                <div className={`alert-info ${message.includes("success") ? "success" : "error"}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        ) : (
          <SignupForm onClose={onClose} onBack={() => setShowSignup(false)} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import SignupForm from "./SignupForm";

// const LoginForm = ({ onClose }) => {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();

//   const [formData, setFormData] = useState({ gmail: "", password: "" });
//   const [showSignup, setShowSignup] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     console.log(e);
    
//     e.preventDefault();
//     try {
//       // const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
//       const res = await fetch(`http://localhost:4000/api/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data && data.user) {
//         setAuth({ ...auth, user: data.user, token: data.token });
//         localStorage.setItem("auth", JSON.stringify(data));
//         setMessage(data.message || "Login successful");
//         navigate("/");
//         onClose && onClose();
//       } else {
//         setMessage(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Login error");
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         {!showSignup ? (
//           <>
//             <button className="modal-close-btn" onClick={onClose}>✖</button>
//             <h2 className="modal-heading">Login</h2>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <input
//                 type="email"
//                 name="gmail"
//                 className="modal-input"
//                 placeholder="Email Address"
//                 value={formData.gmail}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 className="modal-input"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="submit" className="modal-button">Login</button>
//               <p className="modal-link-small">
//                 Don’t have an account?{" "}
//                 <span onClick={() => setShowSignup(true)} className="modal-link">
//                   Sign up
//                 </span>
//               </p>
//               {message && <div className="alert-info">{message}</div>}
//             </form>
//           </>
//         ) : (
//           <SignupForm onClose={onClose} onBack={() => setShowSignup(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
