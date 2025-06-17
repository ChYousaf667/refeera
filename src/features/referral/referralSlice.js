import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3003/api/referral/";

const initialState = {
  referralLink: null,
  isLoading: false,
  isLinkValidated: false,
  isFormSubmitted: false,
  isError: false,
  message: "",
  isDisqualified: false,
};

export const generateReferralLink = createAsyncThunk(
  "referral/generateReferralLink",
  async ({ partnerId, offerId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
      console.log("Generating link with:", { partnerId, offerId, token });
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        `${API_URL}generate`,
        { partnerId, offerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("generateReferralLink response:", response.data);
      return response.data.referralLink;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      console.error(
        "generateReferralLink error:",
        message,
        error.response?.status
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getReferralDetails = createAsyncThunk(
  "referral/getReferralDetails",
  async (referralId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}${referralId}`);
      console.log("getReferralDetails response:", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      console.error("getReferralDetails error:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const validateReferralLink = createAsyncThunk(
  "referral/validateReferralLink",
  async (referralId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}${referralId}`);
      console.log("validateReferralLink response:", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      console.error("validateReferralLink error:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const submitReferralForm = createAsyncThunk(
  "referral/submitReferralForm",
  async (formData, thunkAPI) => {
    try {
      console.log("Sending form data:", Object.fromEntries(formData));
      const response = await axios.post(`${API_URL}submit-form`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      console.error("submitReferralForm error:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    reset: (state) => {
      state.referralLink = null;
      state.isLoading = false;
      state.isLinkValidated = false;
      state.isFormSubmitted = false;
      state.isError = false;
      state.message = "";
      state.isDisqualified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateReferralLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateReferralLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.referralLink = action.payload;
      })
      .addCase(generateReferralLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReferralDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReferralDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.referralLink = action.payload;
      })
      .addCase(getReferralDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(validateReferralLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateReferralLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLinkValidated = true;
        state.isDisqualified = action.payload.isDisqualified || false;
      })
      .addCase(validateReferralLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(submitReferralForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitReferralForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFormSubmitted = true;
        state.isDisqualified = action.payload.isDisqualified || false;
      })
      .addCase(submitReferralForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = referralSlice.actions;
export default referralSlice.reducer;
