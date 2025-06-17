import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import InputWithIcon from "./InputWithIcon";
import logo from "../assets/logo.png";
import {
  registerMyUser,
  verifyOTPData,
  userReset,
} from "../features/users/userSlice";

export default function SignupForm({ setIsSignIn }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userLoading, userError, userMessage, userSuccess } =
    useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOtpInput) {
      dispatch(registerMyUser(formData));
    } else {
      dispatch(verifyOTPData({ otp }));
    }
  };

  useEffect(() => {
    if (userSuccess && user && !showOtpInput) {
      setShowOtpInput(true);
      dispatch(userReset());
    } else if (userSuccess && user && showOtpInput) {
      toast.success(
        `Welcome, ${user.username}! Account verified successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      navigate("/");
      dispatch(userReset());
    }
  }, [userSuccess, user, showOtpInput, navigate, dispatch]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 relative bg-gradient-to-b from-cyan-400 to-blue-500 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none">
        <div className="absolute top-1 left-1 flex items-center z-10">
          <img src={logo} alt="Referra Logo" className="w-16 md:w-24" />
        </div>

        <div className="absolute w-20 h-20 bg-white/20 rounded-full top-6 right-6 blur-2xl"></div>
        <div className="absolute w-10 h-10 bg-white/10 rounded-full top-24 left-10 blur-xl"></div>
        <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-[-24px] left-[-24px] blur-2xl"></div>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-10 z-10 text-center">
          Welcome Back!
        </h2>
        <p className="text-center max-w-xs mb-4 z-10 text-sm">
          Already have an account? Sign in to continue with Referra!
        </p>
        <button
          onClick={() => setIsSignIn(true)}
          className="border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition z-10 text-sm"
        >
          Sign In
        </button>
      </div>

      {/* Sign Up Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-4 text-center">
          {showOtpInput ? "Verify Your Email" : "Create An Account"}
        </h2>

        {userSuccess && !showOtpInput && (
          <p className="text-green-500 text-sm mb-4">OTP sent to your email!</p>
        )}
        {userSuccess && showOtpInput && (
          <p className="text-green-500 text-sm mb-4">
            Email verified successfully!
          </p>
        )}

        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-4">
          {[FaFacebookF, FaGoogle, FaLinkedinIn].map((Icon, idx) => (
            <button
              key={idx}
              className="border rounded-full p-2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Icon className="text-sm sm:text-base md:text-lg" />
            </button>
          ))}
        </div>

        <p className="mb-4 text-gray-500 text-sm text-center">
          {showOtpInput
            ? "Enter the OTP sent to your email"
            : "Or Signup Through Your Email"}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-[24rem]">
          {!showOtpInput ? (
            <>
              <InputWithIcon
                type="text"
                name="username"
                placeholder="Name"
                Icon={FaUser}
                value={formData.username}
                onChange={handleChange}
              />
              <InputWithIcon
                type="email"
                name="email"
                placeholder="Email"
                Icon={FaEnvelope}
                value={formData.email}
                onChange={handleChange}
              />
              {userError && (
                <p className="text-red-500 text-sm mb-4">{userMessage}</p>
              )}
              <InputWithIcon
                type="password"
                name="password"
                placeholder="Password"
                Icon={FaLock}
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex items-center mb-4 w-full">
                <input type="checkbox" id="robot" className="mr-2 w-4 h-4" />
                <label htmlFor="robot" className="text-sm text-gray-700">
                  I am not a robot
                </label>
              </div>
            </>
          ) : (
            <InputWithIcon
              type="text"
              name="otp"
              placeholder="Enter OTP"
              Icon={FaLock}
              value={otp}
              onChange={handleOtpChange}
            />
          )}

          <button
            type="submit"
            disabled={userLoading}
            className={`w-full p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition text-sm ${
              userLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {userLoading
              ? showOtpInput
                ? "Verifying OTP..."
                : "Signing Up..."
              : showOtpInput
              ? "Verify OTP"
              : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
