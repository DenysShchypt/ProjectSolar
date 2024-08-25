import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../common/types/auth';
import { registerOrLoginGoogle } from '../../thunks/auth';

const initialState: IAuthState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    roles: [],
    token: {
      accuseToken: localStorage.getItem('token') || '',
    },
    verifyLink: false,
  },
  isLogged:false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.isLogged = true;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOrLoginGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOrLoginGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerOrLoginGoogle.rejected, (state) => {
        state.isLoading = false;
        state.user = initialState.user;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
