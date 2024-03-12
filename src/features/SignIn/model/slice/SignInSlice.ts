import { createSlice } from "@reduxjs/toolkit";
import { SignInSchema } from "../types/SignInSchema";
import { signIn } from "../services/signIn";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "src/app/consts/consts";
import { jwtDecode } from "jwt-decode";
import { store } from "src/app/config/store";
import { UserActions } from "src/entities/User";

const initialState: SignInSchema = {
  login: "",
  password: "",
};

export const SignInSlice = createSlice({
  name: "sign-in",
  initialState,
  reducers: {
    clear: (state) => {
      state.login = "";
      state.password = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailure = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      });
  },
});

export const { actions: SignInActions } = SignInSlice;
export const { reducer: SignInReducer } = SignInSlice;
