import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import auth from "../Auth/authUser.js"

dotenv.config();

const addUser = async (req, res) => {
  try {
    const { Name, gmail, password, mobile, address } = req.body;
    //  console.log(req.body);
     
    const existingUser = await userModel.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json( {message : "Gmail already exists"});
    }

    const newUser = await userModel.create({
      Name,
      gmail,
      password,
      mobile,
      address,
    });

    

     const token = auth.createToken()
    //  jwt.sign(
    //   { id: newUser._id, gmail: newUser.gmail, password: newUser.password },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message:"Internal Server Error"});
  }
};

const signup = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    // console.log(req.body);
    
    const existUser = await userModel.findOne({ gmail });

    if (existUser) {
      if (existUser.password == password) {

        const token = auth.createToken(existUser)

        // const token = jwt.sign(
        //   { id: existUser._id, gmail: existUser.gmail, password: existUser.password },
        //   process.env.JWT_SECRET,
        //   { expiresIn: "7d" }
        // );

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          message: "User login successful",
          user: existUser,
          token:token,
        });
      } else {
        return res.status(401).json({ message:"Invalid password."});
      }
    } else {
      return res.status(402).json({ message:"Gmail is not registered."});
    }
  } catch (error) {
    return res.status(500).json(`Error: ${error}`);
  }
};



export default {
  addUser,
  signup
};