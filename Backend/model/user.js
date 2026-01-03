import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    password: String,
    mobile: Number,
    address: String,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;

