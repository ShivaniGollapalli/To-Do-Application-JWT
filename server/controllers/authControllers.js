import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import transporter from "../config/nodemailer.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing details",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Please verify email first",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.updateOne(
      { email },
      {
        name,
        password: hashedPassword,
      },
    );

    return res.status(201).json({
      status: true,
      message: "User registration successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser?.isAccountVerified) {
      return res.json({
        status: false,
        message: "Email already exists",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await userModel.findOneAndUpdate(
      { email },
      {
        email,
        verifyOTP: otp,
        verifyOtpExpiresAt: Date.now() + 60 * 1000,
      },
      {
        upsert: true,
        new: true,
      },
    );

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email Address",
      text: `Hello,

Thank you for creating your account.

Your email verification code is: ${otp}

This code will expire in 1 minute.

If you did not request this verification, please ignore this email.

Regards,
Support Team`,
    });

    return res.json({
      status: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
      console.log("VERIFY EMAIL ERROR:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        status: false,
        message: "Missing details",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (Date.now() > user.verifyOtpExpiresAt) {
      return res.status(400).json({
        status: false,
        message: "OTP expired, please request a new one",
      });
    }

    if (user.verifyOTP !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    await userModel.updateOne(
      { email },
      {
        verifyOTP: "",
        verifyOtpExpiresAt: 0,
        isAccountVerified: true,
      },
    );

    return res.json({
      status: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await userModel.updateOne(
      { email },
      {
        verifyOTP: otp,
        verifyOtpExpiresAt: Date.now() + 60 * 1000,
      },
    );

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your New Verification Code",
      text: `Hello,

As requested, here is your new email verification code:

${otp}

This code will expire in 1 minute.

If you did not request this code, please ignore this email.

Regards,
Support Team`,
    });

    return res.json({
      status: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Missing login details",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "No user found with the email",
      });
    }

    if (!user.isAccountVerified) {
      return res.json({
        status: false,
        message: "Please verify your account first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: false,
        message: "Password mismatch",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      status: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      status: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("name email");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const sendForgotOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await userModel.updateOne(
      { email },
      {
        resetOtp: otp,
        resetOtpExpiresAt: Date.now() + 60 * 1000,
      },
    );

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset Verification Code",
      text: `Hello,

We received a request to reset your password.

Your password reset verification code is: ${otp}

This code will expire in 1 minute.

If you did not request a password reset, please ignore this email. Your account will remain secure.

Regards,
Support Team`,
    });

    return res.json({
      status: true,
      message: "Forgot password OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const verifyForgotOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        status: false,
        message: "Missing details",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "User not found",
      });
    }

    if (Date.now() > user.resetOtpExpiresAt) {
      return res.json({
        status: false,
        message: "OTP expired",
      });
    }

    if (user.resetOtp !== otp) {
      return res.json({
        status: false,
        message: "Invalid OTP",
      });
    }

    return res.json({
      status: true,
      message: "OTP verified",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Missing details",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await userModel.updateOne(
      { email },
      {
        password: hashed,
        resetOtp: "",
        resetOtpExpiresAt: 0,
      },
    );

    return res.json({
      status: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
