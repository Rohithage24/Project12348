import express from "express";
import {
  sendOTP,
  verifyOTP,
  addUser,
  signup
} from "../controllers/UserCon.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", addUser);
router.post("/login", signup);

export default router;
