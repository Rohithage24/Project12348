import userModel from "../model/user.js";
import dotenv from "dotenv";
import twilio from "twilio";
import auth from "../Auth/authUser.js";


dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export const sendOTPFor = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await userModel.findOneAndUpdate(
      { mobile },
      { otp, otpExpiresAt: expiry },
      { upsert: true, new: true }
    );

    // await client.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: mobile
    // });

    res.status(200).json({ message: "OTP sent successfully" , otp : otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP sending failed" });
  }
};


export const verifyOTPFor = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const user = await userModel.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(401).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = auth.createToken(user);

    res.status(200).json({
      message: "OTP verified successfully",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};


export const passwordForget = async (req, res) => {
  try {
    const { gmail, password, Repassword } = req.body;

    // 1️⃣ Validate inputs
    if (!gmail || !password || !Repassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Check password match
    if (password !== Repassword) {
      return res.status(401).json({
        message: "Password and Repassword do not match"
      });
    }

    // 3️⃣ Check user exists
    const user = await userModel.findOne({ gmail });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // // 4️⃣ Hash new password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Update password
    user.password = Repassword;
    await user.save();

    // 6️⃣ Success response
    return res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
