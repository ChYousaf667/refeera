import axios from "axios";

// Use environment variable for API URL
const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://reffera-backend-production.up.railway.app";

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/api/users/register-user`, data);

  if (response.data) {
    localStorage.setItem("myUser", JSON.stringify(response.data));
  }

  return response.data;
};

export const logUser = async (data) => {
  const response = await axios.post(`${API_URL}/api/users/login-user`, data);

  if (response.data) {
    localStorage.setItem("myUser", JSON.stringify(response.data));
  }

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("myUser");
};

export const verifyOTP = async (otpData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/api/users/verify-otp`,
    otpData,
    config
  );

  return response.data;
};
