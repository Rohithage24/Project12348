

import mongoose from  "mongoose";

const mongodb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Interview');
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
