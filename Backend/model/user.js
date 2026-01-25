import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  Name: String,
  gmail: {type: String, unique: true, sparse: true},
  password: String,
  mobile: { type: String, unique: true },
  address: String,
  otp: String,
  otpExpiresAt: Date,
  isVerified: { type: Boolean, default: false }
})

const userModel = mongoose.model('user', userSchema)

export default userModel
