import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingType } from "../models";
import { AuthApi, UserData } from "../utils/authApi";

export interface AuthStateType extends LoadingType {
  error?: string;
}

const initialAuthState = {} as AuthStateType;

export const postRegister = createAsyncThunk(
  "auth/postRegister",
  async (userData: UserData) => await AuthApi.postRegister(userData)
);

export const postLogin = createAsyncThunk(
  "auth/postLogin",
  async (userData: Omit<UserData, "name">) => await AuthApi.postLogin(userData)
);

export const postToken = createAsyncThunk(
  "auth/postToken",
  async (token: string | null) => await AuthApi.postToken({ token: token })
);

export const postLogout = createAsyncThunk(
  "auth/postLogout",
  async (token: string | null) => await AuthApi.postLogout({ token: token })
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    clearAuthError: (state) => {
      state.error = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postRegister.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.loading = "succeeded";
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(postLogin.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.loading = "succeeded";
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(postToken.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postToken.fulfilled, (state, action) => {
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.loading = "succeeded";
    });
    builder.addCase(postToken.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(postLogout.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.loading = "succeeded";
    });
    builder.addCase(postLogout.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
