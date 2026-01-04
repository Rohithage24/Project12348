import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // token validity

// Create a JWT token
const createToken = (payload) => {
  try {
    const token = jwt.sign(
      {
        Name: payload.name,
        gmail: payload.gmail,
        mobile: payload.mobile
      },
      JWT_SECRET
      // { expiresIn: JWT_EXPIRES_IN }
    );
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Token creation failed");
  }
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET );
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
