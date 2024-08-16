import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../../common/types/auth";

const initialState: IAuthState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    token: "",
    verifyLink: "",
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const authSliceReducer = authSlice.reducer;
