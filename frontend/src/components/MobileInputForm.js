// src/components/MobileInputForm.js
import React, { useState } from "react";

const MobileInputForm = ({ onOTPSent }) => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendOTP = async () => {
    if (!mobile) return alert("Enter mobile number");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile })
      });
      const data = await response.json();
      setMessage(data.message);
      onOTPSent(mobile); // Pass mobile to OTP form
    } catch (error) {
      console.error("Send OTP error:", error);
      setMessage("Failed to send OTP");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Enter Mobile Number</h2>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={sendOTP} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MobileInputForm;
