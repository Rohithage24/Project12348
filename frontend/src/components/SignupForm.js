import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const SignupForm = ({ onClose, onBack }) => {
  // --- YOUR ORIGINAL STATE ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    otp: "",
    address: "",
    gender: "",
  });
  const [auth, setAuth] = useAuth();
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  // --- YOUR ORIGINAL HANDLERS ---
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleSendOTP = async () => {
    if (!formData.mobile) {
      return setMessage("Please enter your mobile number.");
    }
    try {
      setMessage("Sending OTP...");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/user/send-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: formData.mobile }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        console.log("Mock OTP (for testing):", data.otp || "Use backend OTP");
        setMessage("OTP sent successfully! Check console for OTP (dev mode).");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setMessage("Please enter OTP.");
      return false;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/user/verify-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: formData.mobile,
            otp: formData.otp,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setOtpVerified(true);
        setMessage("OTP verified successfully!");
        return true;
      } else {
        setMessage(data.message || "Invalid or expired OTP");
        return false;
      }
    } catch (err) {
      console.error(err);
      setMessage("Error verifying OTP");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      return setMessage("Password must be at least 8 characters and include a number and special character.");
    }
    if (!formData.gender) {
      return setMessage("Please select your gender.");
    }
    if (!otpSent) {
      return setMessage("Please send OTP first.");
    }
    if (!otpVerified) {
      const verified = await handleVerifyOTP();
      if (!verified) return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/user/register`,
        {
          method: "POST",
           credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: formData.name,
            gmail: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            address: formData.address,
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.user && data.token) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify({ user: data.user, token: data.token }));
        setMessage(data.message || "Login successful");
        onClose && onClose();
        navigate("/");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error during signup");
    }
  };

  const handleResendOTP = async () => {
    try {
      setMessage("Resending OTP...");
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/user/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: formData.mobile }),
        }
      );
      const data = await res.json();
      setMessage(res.ok ? "OTP resent successfully!" : data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error resending OTP");
    }
  };

  // --- UI START ---
  // To prevent the "Corner" issue, we only wrap in modal-overlay IF we are on a direct page
  const MainContent = (
    <div className="modal-inner signup-scroll">
      <button className="modal-close-btn" onClick={onClose}>✖</button>
      <div className="modal-header">
        <div className="modal-icon">🚀</div>
        <h2 className="modal-heading">Signup Form</h2>
        <p className="modal-subtext">Join our community today</p>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="modal-input" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="modal-input" required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="modal-input" required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="modal-input" required />
        <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="modal-input" required />

        {!otpSent ? (
          <button type="button" onClick={handleSendOTP} className="otp-btn">Send OTP</button>
        ) : (
          <div className="otp-container">
            <input name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="modal-input" required />
            <span onClick={handleResendOTP} className="modal-link resend-text">Resend OTP</span>
          </div>
        )}

        <select name="gender" value={formData.gender} onChange={handleChange} className="modal-input modal-select" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" className="modal-button">Sign Up</button>
        <p className="modal-link-small">
          Already have an account? <span onClick={onBack} className="modal-link">Go back to Login</span>
        </p>

        {message && (
          <div className={`alert-info ${message.toLowerCase().includes("success") || message.toLowerCase().includes("sent") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );

  // If "onBack" exists, we are already inside a centered modal from LoginForm.
  // If not, we need to provide the centering wrappers ourselves.
  return onBack ? (
    MainContent
  ) : (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {MainContent}
      </div>
    </div>
  );
};

export default SignupForm;


// import React, { useState } from "react";

// const SignupForm = ({ onClose, onBack }) => {
//   const [formData, setFormData] = useState({
//     Name: "",
//     gmail: "",
//     password: "",
//     mobile: "",
//     OTP: "",
//     address: "",
//     gender: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const validatePassword = (password) => {
//     const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
//     return regex.test(password);
//   };

//   const handleResendOTP = async () => {
//     try {
//       setMessage("Sending OTP...");
//       const res = await fetch(`${process.env.REACT_APP_BACKEND}/resend-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile: formData.mobile }),
//       });
//       const data = await res.json();
//       if (res.ok) setMessage("OTP resent successfully");
//       else setMessage(data.message || "Failed to resend OTP");
//     } catch (error) {
//       console.error(error);
//       setMessage("Error while resending OTP");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validatePassword(formData.password)) {
//       return setMessage(
//         "Password must be at least 8 characters and include a number and special character."
//       );
//     }

//     if (!formData.gender) {
//       return setMessage("Please select your gender.");
//     }

//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) setMessage(data.message || "Signup successful");
//       else setMessage(data.message || "Signup failed");
//     } catch (error) {
//       console.error(error);
//       setMessage("An error occurred while signing up.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <button className="signup-close-btn" onClick={onClose}>✖</button>
//       <h2 className="signup-heading">Signup Form</h2>

//       <form onSubmit={handleSubmit} className="signup-form">
//         <input type="text" name="Name" placeholder="Full Name" value={formData.Name} onChange={handleChange} className="signup-input" required />
//         <input type="email" name="gmail" placeholder="Email Address" value={formData.gmail} onChange={handleChange} className="signup-input" required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="signup-input" required />
//         <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="signup-input" required />
//         <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="signup-input" required />
//         <input type="tel" name="OTP" placeholder="Enter OTP" value={formData.OTP} onChange={handleChange} className="signup-input" required />

//         <span onClick={handleResendOTP} className="signup-resend-otp">Resend OTP</span>

//         <select name="gender" value={formData.gender} onChange={handleChange} className="signup-input" required>
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>

//         <button type="submit" className="signup-button">Sign Up</button>

//         <p style={{ fontSize: "14px", marginTop: "10px" }}>
//           Already have an account?{" "}
//           <span onClick={onBack} className="signup-link">Go back to Login</span>
//         </p>

//         {message && <div className="signup-message">{message}</div>}
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
