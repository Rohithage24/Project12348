import mongoose from  "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb = async () => {
    try {
        console.log(process.env.MONGODB);
        
        await mongoose.connect(`${process.env.MONGODB}`,{maxPoolSize: 10,});
        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default mongodb

