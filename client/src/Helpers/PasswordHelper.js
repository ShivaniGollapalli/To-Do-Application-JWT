import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export const sendForgotOTP = async (email) => {
  try {
    const response = await API.post("/auth/forgotPassword/sendOTP", {
      email,
    });
    const { status, message } = response.data;
    status ? toast.success(message) : toast.error(message);
    return status;
  } catch (err) {
    toast.error("Something went wrong");
  }
};

export const verifyForgotOTPService = async (email, otp) => {
  try {
    const response = await API.post("/auth/forgotPassword/verifyOTP", {
      email,
      otp,
    });
    const { status, message } = response.data;
    status ? toast.success(message) : toast.error(message);
    return status;
  } catch (err) {
    toast.error("Something went wrong");
  }
};

export const resetPasswordService = async (email, newPassword) => {
  try {
    const response = await API.post("/auth/forgotPassword/reset", {
      email,
      newPassword,
    });
    const { status, message } = response.data;
    status ? toast.success(message) : toast.error(message);
    return status;
  } catch (err) {
    toast.error("Something went wrong");
  }
};
