import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingType } from "../models";
import {
  AuthUserData,
  ForgotPassword,
  ProfileApi,
  ResetPassword,
} from "../utils/profileApi";

export interface UserType {
  email?: string;
  name?: string;
}

export interface ProfileStateType extends LoadingType {
  passwordIsSend: boolean;
  user: UserType | null;
  error?: string;
}

const initialProfileState = {
  user: null,
  passwordIsSend: false,
} as ProfileStateType;

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (token: string) => await ProfileApi.getUser(token)
);

export const patchUser = createAsyncThunk(
  "profile/patchUser",
  async (userData: AuthUserData) => await ProfileApi.patchUser(userData)
);

export const postForgotPassword = createAsyncThunk(
  "profile/postForgotPassword",
  async (body: ForgotPassword) => await ProfileApi.postForgotPassword(body)
);

export const postResetPassword = createAsyncThunk(
  "profile/postResetPassword",
  async (body: ResetPassword) => await ProfileApi.postForgotPassword(body)
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    clearProfileError: (state) => {
      state.error = undefined;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "succeeded";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(patchUser.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = "succeeded";
    });
    builder.addCase(patchUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(postForgotPassword.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postForgotPassword.fulfilled, (state) => {
      state.passwordIsSend = true;
      state.loading = "succeeded";
    });
    builder.addCase(postForgotPassword.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(postResetPassword.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(postResetPassword.fulfilled, (state) => {
      state.passwordIsSend = false;
      state.loading = "succeeded";
    });
    builder.addCase(postResetPassword.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearProfileError, resetUser } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
