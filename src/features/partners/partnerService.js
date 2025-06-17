import axios from "axios";

const API_URL = "http://localhost:3003/api/partner/";

const addPartner = async (partnerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    API_URL + "add-partner",
    partnerData,
    config
  );
  return response.data;
};

const getPartner = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}get-partner/${userId}`, config);
  return response.data;
};

const updatePartner = async (partnerId, partnerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.put(
    API_URL + `update-partner/${partnerId}`,
    partnerData,
    config
  );
  return response.data;
};

const partnerService = {
  addPartner,
  getPartner,
  updatePartner,
};
export default partnerService;
