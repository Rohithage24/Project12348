import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #004e92, #000428)",
      }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{isSignup ? "Signup" : "Login"} Form</h2>

        <div className="btn-group w-100 mb-4 " role="group">
            <button
            className={`btn ${isSignup ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => setIsSignup(true)}
          >
           Login
          </button>
          <button
            className={`btn ${!isSignup ? "btn-primary" : "btn-outline-primary"} mx-2` }
            onClick={() => setIsSignup(false)}
          >
            Signup 
          </button>
          
        </div>

        {/* Conditionally render Signup or Login component */}
        {isSignup ?<Login />  : <Signup /> }
      </div>
    </div>
  );
};

export default AuthForm;
