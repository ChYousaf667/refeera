import axios from "axios";

const API_URL = "http://localhost:3003/api/business/";

// Register business
const registerBusiness = async (businessData) => {
  const response = await axios.post(`${API_URL}register`, businessData);
  return response.data;
};

// Login business
const loginBusiness = async (businessData) => {
  const response = await axios.post(`${API_URL}login`, businessData);
  if (response.data.token) {
    localStorage.setItem("businessToken", response.data.token);
  }
  return response.data;
};

// Logout business
const logoutBusiness = () => {
  localStorage.removeItem("businessToken");
};

const businessService = {
  registerBusiness,
  loginBusiness,
  logoutBusiness,
};

export default businessService;
