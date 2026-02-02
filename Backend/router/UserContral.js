import express from "express";
import {
  sendOTP,
  verifyOTP,
  addUser,
  signup
} from "../controllers/UserCon.js";

import authMiddleware from '../middlewares/authMiddleware.js'


import {sendOTPFor , verifyOTPFor , passwordForget} from "../controllers/ForgotPass.js"
const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp" ,verifyOTP);
router.post("/register",authMiddleware, addUser);
router.post("/login", signup);


router.post("/send-otpFor", sendOTPFor);
router.post("/verify-otpfor", verifyOTPFor);
router.post("/restepass",authMiddleware ,  passwordForget);

export default router;
