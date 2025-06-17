import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import partnerReducer from "../features/partners/partnerSlice";
import businessReducer from "../features/business/businessSlice";
import referralReducer from "../features/referral/referralSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    partner: partnerReducer,
      business: businessReducer,
      referral:referralReducer,
  },
});
