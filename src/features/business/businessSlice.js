import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import businessService from "./businessService";

// Initialize business and token from localStorage
const storedBusiness = JSON.parse(localStorage.getItem("business")) || null;

const initialState = {
  business: storedBusiness,
  token: storedBusiness ? storedBusiness.token : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Register business
export const registerBusiness = createAsyncThunk(
  "business/register",
  async (businessData, thunkAPI) => {
    try {
      return await businessService.registerBusiness(businessData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login business
export const loginBusiness = createAsyncThunk(
  "business/login",
  async (businessData, thunkAPI) => {
    try {
      return await businessService.loginBusiness(businessData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logoutBusiness: (state) => {
      state.business = null;
      state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("business");
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.business = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("business", JSON.stringify(action.payload));
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(loginBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.business = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("business", JSON.stringify(action.payload));
      })
      .addCase(loginBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logoutBusiness, setBusiness } = businessSlice.actions;
export default businessSlice.reducer;
