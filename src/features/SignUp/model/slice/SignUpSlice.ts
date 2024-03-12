import { createSlice } from "@reduxjs/toolkit";
import { SignUpSchema } from "../types/SignUpSchema";
import { signUp } from "../services/signUp";

const initialState: SignUpSchema = {
  name: "",
  lastName: "",
  patronymic: "",
  birthdayDate: new Date(),
  userType: "sportsman",
  gender: "male",
  contactData: "",
  login: "",
  password: "",
};

export const SignUpSlice = createSlice({
  name: "sign-up",
  initialState,
  reducers: {
    clear: (state) => {
      state.name = "";
      state.lastName = "";
      state.patronymic = "";
      state.birthdayDate = new Date();
      state.userType = "sportsman";
      state.gender = "male";
      state.contactData = "";
      state.login = "";
      state.password = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailure = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      });
  },
});

export const { actions: SignUpActions } = SignUpSlice;
export const { reducer: SignUpReducer } = SignUpSlice;
