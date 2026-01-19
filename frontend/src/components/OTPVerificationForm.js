// src/components/OTPVerificationForm.js
import React, { useState } from "react";

const OTPVerificationForm = ({ mobile, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (!otp) return alert("Enter OTP");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp })
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.message === "OTP verified successfully") {
        onVerified(); // Move to registration
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage("Failed to verify OTP");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Enter OTP sent to {mobile}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOTP} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPVerificationForm;
