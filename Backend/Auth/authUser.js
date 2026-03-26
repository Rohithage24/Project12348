import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // token validity

// Create a JWT token
const createToken = (res,payload) => {
  try {
    const token = jwt.sign(
      {
        id:payload._id,
        Name: payload.name,
        gmail: payload.gmail,
        mobile: payload.mobile
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
    httpOnly: true,       // JS cannot access this cookie (XSS safe)
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",   // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Token creation failed");
  }
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    throw new Error("Invalid token");
  }
};

// Decode a JWT token without verifying
const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default {
  createToken,
  verifyToken,
  decodeToken
};
