import express from "express";
import {
  register,
  verifyEmail,
  verifyOTP,
  resendOTP,
  signIn,
  signOut,
  getUserInfo,
  sendForgotOTP,
  verifyForgotOTP,
  resetPassword,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verifyEmail", verifyEmail);
authRouter.post("/verifyOTP", verifyOTP);
authRouter.post("/resendOTP", resendOTP);
authRouter.post("/signIn", signIn);
authRouter.post("/signOut", signOut);
authRouter.get("/getUser", authMiddleware, getUserInfo);
authRouter.post("/forgotPassword/sendOTP", sendForgotOTP);
authRouter.post("/forgotPassword/verifyOTP", verifyForgotOTP);
authRouter.post("/forgotPassword/reset", resetPassword);

export default authRouter;
