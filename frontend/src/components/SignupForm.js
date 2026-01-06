import React, { useState } from "react";

const SignupForm = ({ onClose, onBack }) => {
  const [formData, setFormData] = useState({
    Name: "",
    gmail: "",
    password: "",
    mobile: "",
    OTP: "",
    address: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

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

  const handleResendOTP = async () => {
    try {
      setMessage("Sending OTP...");
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      const data = await res.json();
      if (res.ok) setMessage("OTP resent successfully");
      else setMessage(data.message || "Failed to resend OTP");
    } catch (error) {
      console.error(error);
      setMessage("Error while resending OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      return setMessage(
        "Password must be at least 8 characters and include a number and special character."
      );
    }

    if (!formData.gender) {
      return setMessage("Please select your gender.");
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) setMessage(data.message || "Signup successful");
      else setMessage(data.message || "Signup failed");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while signing up.");
    }
  };

  return (
    <div className="signup-container">
      <button className="signup-close-btn" onClick={onClose}>✖</button>
      <h2 className="signup-heading">Signup Form</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="Name" placeholder="Full Name" value={formData.Name} onChange={handleChange} className="signup-input" required />
        <input type="email" name="gmail" placeholder="Email Address" value={formData.gmail} onChange={handleChange} className="signup-input" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="signup-input" required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="signup-input" required />
        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="signup-input" required />
        <input type="tel" name="OTP" placeholder="Enter OTP" value={formData.OTP} onChange={handleChange} className="signup-input" required />

        <span onClick={handleResendOTP} className="signup-resend-otp">Resend OTP</span>

        <select name="gender" value={formData.gender} onChange={handleChange} className="signup-input" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" className="signup-button">Sign Up</button>

        <p style={{ fontSize: "14px", marginTop: "10px" }}>
          Already have an account?{" "}
          <span onClick={onBack} className="signup-link">Go back to Login</span>
        </p>

        {message && <div className="signup-message">{message}</div>}
      </form>
    </div>
  );
};

export default SignupForm;
