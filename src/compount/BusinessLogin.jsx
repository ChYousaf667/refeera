import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputWithIcon from "./InputWithIcon";
import logo from "../assets/logo.png";
import { loginBusiness, reset } from "../features/business/businessSlice";

export default function BusinessLogin({ setIsSignIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const businessState = useSelector((state) => state.business || {});
  const { isLoading, isSuccess, isError, message } = businessState;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginBusiness(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
      dispatch(reset());
    }
    if (isError) {
      toast.error(message || "An error occurred during login.", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(reset());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Sign In Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-3 sm:mb-4 text-center">
          Sign in to business account
        </h2>

        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4 md:mb-6">
          {[FaFacebookF, FaGoogle, FaLinkedinIn].map((Icon, idx) => (
            <button
              key={idx}
              className="border rounded-full p-2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Icon className="text-sm sm:text-base md:text-lg" />
            </button>
          ))}
        </div>

        <p className="mb-3 sm:mb-4 text-gray-500 text-xs sm:text-sm md:text-base text-center">
          Or Sign in Through Your Email
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-[24rem]">
          <InputWithIcon
            type="email"
            name="email"
            placeholder="Email"
            Icon={FaEnvelope}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="password"
            name="password"
            placeholder="Password"
            Icon={FaLock}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="w-full text-right mb-3 sm:mb-4">
            <button
              type="button"
              className="text-xs sm:text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex items-center mb-3 sm:mb-4 w-full">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
            />
            <label
              htmlFor="remember"
              className="text-xs sm:text-sm md:text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-2.5 sm:p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition text-xs sm:text-sm md:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 relative bg-gradient-to-b from-cyan-300 to-blue-400 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none">
        <div className="absolute top-1 left-1 sm:top-1 sm:left-1 flex items-center z-10">
          <img src={logo} className="w-16 md:w-24" alt="Referra Logo" />
        </div>

        <div className="absolute w-20 h-20 bg-white/20 rounded-full top-6 right-6 blur-2xl"></div>
        <div className="absolute w-10 h-10 bg-white/10 rounded-full top-24 left-10 blur-xl"></div>
        <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-[-24px] left-[-24px] blur-2xl"></div>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-10 z-10 text-center">
          New Business!
        </h2>
        <p className="text-center max-w-xs mb-4 z-10 text-sm">
          Don't have an account? Sign up to join Referra!
        </p>
        <button
          onClick={() => setIsSignIn(false)}
          className="border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition z-10 text-sm"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
