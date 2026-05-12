import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  sendForgotOTP,
  verifyForgotOTPService,
  resetPasswordService,
} from "../Helpers/PasswordHelper";
import Header from "./Header";

const API = axios
  .create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000",
    withCredentials: true,  
  })
function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showResendOTP, setShowResendOTP] = useState(false);
  // Forgot Password State
  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState(1);
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  const [fpMessage, setFpMessage] = useState("");
  const [fpError, setFpError] = useState("");

  const [fpConfirmPass, setFpConfirmPass] = useState("");
  const handleEnterNext = (e) => {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const form = e.target.form;
  if (!form) return;

  const index = Array.prototype.indexOf.call(form, e.target);
  const nextField = form.elements[index + 1];

  if (nextField) {
    nextField.focus();
  }
};
  const handleLogin = async () => {
    console.log("Login clicked:", email, password);
    const loginResponse = await API.post("/auth/signIn", { email, password });
    const { status, message } = loginResponse?.data;
    if (status === true) {
      toast.success(message);
      const user = await API.get("/auth/getUser", { withCredentials: true });
      console.log("Logged-in User:", user?.data);
      navigate("/todoList");
    } else {
      toast.error(message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setOtpMessage("");
      setOtpError("");

      const verifyEmailResponse = await API.post("/auth/verifyEmail", {
        email,
      });

      const { status, message } = verifyEmailResponse?.data;

      if (status === true) {
        setOtpMessage(message);
        setStep(2);
      } else {
        setOtpError(message);
      }
    } catch (error) {
      setOtpError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setOtpMessage("");
      setOtpError("");

      const veriryOTPResponse = await API.post("/auth/verifyOTP", {
        email,
        otp,
      });

      const { status, message } = veriryOTPResponse?.data;

      if (status === true) {
        setOtpMessage(message);
        setShowResendOTP(false);

        setTimeout(() => {
          setStep(3);
          setOtpMessage("");
        }, 1000);
      } else {
        setOtpError(message);
        setShowResendOTP(true);
      }
    } catch (error) {
      setOtpError(error?.response?.data?.message || "Something went wrong");
    }
  };
  const resendOTP = async () => {
    try {
      setOtpMessage("");
      setOtpError("");

      const resendOTPResponse = await API.post("/auth/resendOTP", { email });

      const { status, message } = resendOTPResponse?.data;

      if (status === true) {
        setOtpMessage(message);
      } else {
        setOtpError(message);
      }
    } catch (error) {
      setOtpError(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleFinalRegister = async () => {
    try {
      const registerForm = await API.post("/auth/register", {
        name,
        password,
        email,
      });

      const { status, message } = registerForm?.data;

      if (status === true) {
        setIsRegistered(true);
      } else {
        setOtpError(message);
      }
    } catch (error) {
      setOtpError(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleSendForgotOTP = async () => {
    setFpMessage("");
    setFpError("");

    const ok = await sendForgotOTP(fpEmail);

    if (ok) {
      setFpStep(2);
      setFpMessage("OTP sent successfully");
    } else {
      setFpError("Failed to send OTP");
    }
  };
  const handleVerifyForgotOTP = async () => {
    setFpMessage("");
    setFpError("");

    const ok = await verifyForgotOTPService(fpEmail, fpOtp);

    if (ok) {
      setFpMessage("OTP verified successfully");
      setTimeout(() => {
        setFpStep(3);
        setFpMessage("");
      }, 1000);
    } else {
      setFpError("Invalid OTP");
    }
  };
  const handleResetPassword = async () => {
    setFpMessage("");
    setFpError("");

    if (fpNewPass !== fpConfirmPass) {
      setFpError("Passwords do not match");
      return;
    }

    const ok = await resetPasswordService(fpEmail, fpNewPass);

    if (ok) {
      setFpMessage("Password reset successful");

      setTimeout(() => {
        setShowForgot(false);
        setFpStep(1);
        setFpNewPass("");
        setFpConfirmPass("");
        setFpMessage("");
      }, 1200);
    } else {
      setFpError("Password reset failed");
    }
  };

  useEffect(() => {
    setStep(1);
    setName("");
    setEmail("");
    setPassword("");
    setOtp("");
  }, [location.pathname]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div>
      <Header />
    </div>

    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl">
        {isRegistered ? (
          <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg animate-scale-up">
              <span className="text-white text-6xl">✓</span>
            </div>

            <h2 className="text-2xl font-semibold text-green-600 mt-6 text-center">
              User Registration Successful!
            </h2>

            <p className="text-gray-600 mt-2 text-center">
              Your account has been created successfully.
            </p>

            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-6 w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {" "}
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              {isLoginPage ? "Login to your Account" : "Create an Account"}
            </h2>
            <form className="space-y-5">
              {!isLoginPage && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleEnterNext}
                    disabled={step !== 1}
                    className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none
      ${step !== 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEnterNext}
                    disabled={step !== 1}
                    className={`w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none
      ${step !== 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {step === 1 && (
                    <>
                      {otpMessage && (
                        <p className="text-green-400 text-sm mt-2">
                          {otpMessage}
                        </p>
                      )}

                      {otpError && (
                        <p className="text-red-400 text-sm mt-2">{otpError}</p>
                      )}

                      <button
                        onClick={handleVerifyEmail}
                        type="button"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition shadow-md"
                      >
                        Verify Email
                      </button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyDown={handleEnterNext}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                      />

                      {otpMessage && (
                        <p className="text-green-400 text-sm mt-2">
                          {otpMessage}
                        </p>
                      )}

                      {otpError && (
                        <p className="text-red-400 text-sm mt-2">{otpError}</p>
                      )}

                      <button
                        type="button"
                        onClick={handleVerifyOTP}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition shadow-md"
                      >
                        Verify OTP
                      </button>

                      {showResendOTP && (
                        <button
                          type="button"
                          onClick={resendOTP}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition shadow-md"
                        >
                          Resend OTP
                        </button>
                      )}
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleEnterNext}
                        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleFinalRegister}
                        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold transition shadow-md"
                      >
                        Complete Registration
                      </button>
                    </>
                  )}
                </>
              )}

              {isLoginPage && (
                <>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEnterNext}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleEnterNext}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                  />
                  <div className="w-full text-right">
                    <p
                      onClick={() => setShowForgot(true)}
                      className="text-indigo-400 text-sm cursor-pointer hover:underline"
                    >
                      Forget password
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition shadow-md"
                  >
                    Login
                  </button>
                </>
              )}
            </form>
            {isLoginPage ? (
              <p className="text-gray-300 text-center mt-4">
                Don't have an Account?
                <Link
                  to="/register"
                  className="text-indigo-400 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            ) : (
              <p className="text-gray-300 text-center mt-4">
                Already have an account?
                <Link to="/login" className="text-indigo-400 hover:underline">
                  Login
                </Link>
              </p>
            )}
          </>
        )}
      </div>
      </div>
    {showForgot && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
      <button
        type="button"
        className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl leading-none"
        onClick={() => {
          setShowForgot(false);
          setFpStep(1);
          setFpEmail("");
          setFpOtp("");
          setFpNewPass("");
          setFpConfirmPass("");
          setFpMessage("");
          setFpError("");
        }}
      >
        ×
      </button>

      <h2 className="text-xl font-bold text-white mb-4 text-center">
        Reset Password
      </h2>

      {fpStep === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter your Email"
            value={fpEmail}
            onChange={(e) => setFpEmail(e.target.value)}
            onKeyDown={handleEnterNext}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          {fpMessage && (
            <p className="text-green-400 text-sm mb-3">{fpMessage}</p>
          )}

          {fpError && (
            <p className="text-red-400 text-sm mb-3">{fpError}</p>
          )}

          <button
            onClick={handleSendForgotOTP}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl"
          >
            Send OTP
          </button>
        </>
      )}

      {fpStep === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={fpOtp}
            onChange={(e) => setFpOtp(e.target.value)}
            onKeyDown={handleEnterNext}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          {fpMessage && (
            <p className="text-green-400 text-sm mb-3">{fpMessage}</p>
          )}

          {fpError && (
            <p className="text-red-400 text-sm mb-3">{fpError}</p>
          )}

          <button
            onClick={handleVerifyForgotOTP}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl"
          >
            Verify OTP
          </button>
        </>
      )}

      {fpStep === 3 && (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            value={fpNewPass}
            onChange={(e) => setFpNewPass(e.target.value)}
            onKeyDown={handleEnterNext}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={fpConfirmPass}
            onChange={(e) => setFpConfirmPass(e.target.value)}
            onKeyDown={handleEnterNext}
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />

          {fpMessage && (
            <p className="text-green-400 text-sm mb-3">{fpMessage}</p>
          )}

          {fpError && (
            <p className="text-red-400 text-sm mb-3">{fpError}</p>
          )}

          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  </div>
)}
    </div>
  );
}

export default Register;
