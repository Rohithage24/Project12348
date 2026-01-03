// components/Signup.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import home from "../pages/Home";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    gmail: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [message, setMessage] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      return setMessage(
        "Password must be at least 8 characters and include a number and special character."
      );
    }

    try {

      const res = await fetch( `${process.env.REACT_APP_BACKEND}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
    
      

      const data = await res.json();
        console.log(data);
      if (res.ok) {
        setMessage(data.message || "Signup successful");
         navigate('/')
        setShowLogin(true);


      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Name"
        className="form-control mb-3"
        placeholder="Full Name"
        value={formData.Name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="gmail"
        className="form-control mb-3"
        placeholder="Email Address"
        value={formData.gmail}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="form-control mb-3"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="mobile"
        className="form-control mb-3"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        className="form-control mb-3"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-primary w-100">
        Sign Up
      </button>

      {message && (
        <div className="alert alert-info text-center mt-3">{message}</div>
      )}
    </form>
  );
};

export default Signup;
