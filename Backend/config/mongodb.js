import mongoose from  "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb = async () => {
    try {
        // console.log(process.env.MONGODB);
        
        await mongoose.connect(`${process.env.MONGODB}`);
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default mongodb

// const mongoos = require("mongoose");

// exports.mongodb = async () => {
//  async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/Interview');

//   console.log("Mongodb Connected.");
  
// }
// }
