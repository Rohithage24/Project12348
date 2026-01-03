import express from "express";
import userjs from "../controllers/UserCon.js"; // ✅ FIXED PATH

const router = express.Router();

router.post("/signup", userjs.addUser);
router.post("/login", userjs.signup); // ✅ FIXED METHOD NAME

export default router;
