import userModel from "../model/user.js";
import dotenv from "dotenv";
import twilio from "twilio";
import auth from "../Auth/authUser.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const existingUser = await userModel.findOne({ mobile });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Number already registered" });
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

export const verifyOTP = async (req, res) => {
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


export const addUser = async (req, res) => {
  try {
    const { Name, gmail, password, mobile, address } = req.body;

    const user = await userModel.findOne({ mobile });

    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "Mobile not verified" });
    }

    const gmailExists = await userModel.findOne({ gmail });
    if (gmailExists) {
      return res.status(400).json({ message: "Gmail already exists" });
    }

    user.Name = Name;
    user.gmail = gmail;
    user.password = password;
    user.address = address;

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};



export const signup = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    const user = await userModel.findOne({ gmail });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = auth.createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};






















// import userModel from "../model/user.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import auth from "../Auth/authUser.js"

// dotenv.config();

// const verfiyNum = async(req ,res)=>{
//   try {

//     const Number = req.body;


//   const otp = Math.floor(1000 + Math.random() * 9000).toString();


//      const existingUser = await userModel.findOne({ mobile });
//     if (existingUser) {
//       return res.status(400).json( {message : "Number already exists"});
//     }

//     const newUser = await userModel.create({
//       mobile,
//       otp,
//     });


    
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message:"Internal Server Error"});
//   }
// }



// const addUser = async (req, res) => {
//   try {
//     const { Name, gmail, password, mobile, address } = req.body;
//     //  console.log(req.body);
     
//     const existingUser = await userModel.findOne({ gmail });
//     if (existingUser) {
//       return res.status(400).json( {message : "Gmail already exists"});
//     }

//     const newUser = await userModel.create({
//       Name,
//       gmail,
//       password,
//       mobile,
//       address,
//     });

    

//      const token = auth.createToken()
//     //  jwt.sign(
//     //   { id: newUser._id, gmail: newUser.gmail, password: newUser.password },
//     //   process.env.JWT_SECRET,
//     //   { expiresIn: "7d" }
//     // );

//     // res.cookie("token", token, {
//     //   httpOnly: true,
//     //   secure: false,
//     //   sameSite: "lax",
//     //   maxAge: 7 * 24 * 60 * 60 * 1000,
//     // });

//     return res.status(201).json({
//       message: "User created successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message:"Internal Server Error"});
//   }
// };

// const signup = async (req, res) => {
//   try {
//     const { gmail, password } = req.body;
//     // console.log(req.body);
    
//     const existUser = await userModel.findOne({ gmail });

//     if (existUser) {
//       if (existUser.password == password) {

//         const token = auth.createToken(existUser)

//         // const token = jwt.sign(
//         //   { id: existUser._id, gmail: existUser.gmail, password: existUser.password },
//         //   process.env.JWT_SECRET,
//         //   { expiresIn: "7d" }
//         // );

//         res.cookie("token", token, {
//           httpOnly: true,
//           secure: false,
//           sameSite: "lax",
//           maxAge: 7 * 24 * 60 * 60 * 1000,
//         });

//         return res.status(200).json({
//           message: "User login successful",
//           user: existUser,
//           token:token,
//         });
//       } else {
//         return res.status(401).json({ message:"Invalid password."});
//       }
//     } else {
//       return res.status(402).json({ message:"Gmail is not registered."});
//     }
//   } catch (error) {
//     return res.status(500).json(`Error: ${error}`);
//   }
// };



// export default {
//   addUser,
//   signup
// };