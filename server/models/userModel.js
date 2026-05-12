import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  verifyOTP: {
    type: String,
    default: "",
  },
  verifyOtpExpiresAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpiresAt: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
