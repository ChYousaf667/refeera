import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partnerService from "./partnerService";

const initialState = {
  partner: null,
  selectedPartner: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addPartner = createAsyncThunk(
  "partner/addPartner",
  async (partnerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await partnerService.addPartner(partnerData, token);
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

export const getPartner = createAsyncThunk(
  "partner/getPartner",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await partnerService.getPartner(userId, token);
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

export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async ({ partnerId, partnerData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await partnerService.updatePartner(partnerId, partnerData, token);
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

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    reset: (state) => {
      state.partner = null;
      state.selectedPartner = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.partner = action.payload;
        state.selectedPartner = action.payload; // Update selectedPartner
      })
      .addCase(addPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPartner = action.payload;
      })
      .addCase(getPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.partner = action.payload;
        state.selectedPartner = action.payload;
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = partnerSlice.actions;
export default partnerSlice.reducer;
