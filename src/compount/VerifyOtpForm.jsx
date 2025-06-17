import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { verifyOTPData, userReset } from "../redux/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userReset, verifyOTPData } from "../features/users/userSlice";

const VerifyOtpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userLoading, userError, userSuccess, userMessage } =
    useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTPData({ otp }));
  };

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }

    if (userSuccess && user?.token) {
      toast.success("OTP verified. You are now logged in.");
      navigate("/dashboard"); // Or wherever you want to send them
      dispatch(userReset());
    }
  }, [userError, userSuccess, user, userMessage, dispatch, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {userLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
