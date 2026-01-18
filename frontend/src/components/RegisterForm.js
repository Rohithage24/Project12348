// src/components/RegisterForm.js
import React, { useState } from "react";

const RegisterForm = ({ mobile }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const registerUser = async () => {
    const { name, email, password, address } = form;
    if (!name || !email || !password || !address) return alert("Fill all fields");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mobile })
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Failed to register");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Register User</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <button onClick={registerUser} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
