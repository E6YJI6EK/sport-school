import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { User, UserState, jwtObject } from "../types/User";
import { RouterPath } from "src/app/config/routerConfig";
import { removeToken } from "src/shared/lib/removeToken";
import { changePassword } from "../services/changePassword";
import { changeContactData } from "../services/changeContactData";
import { getUser } from "../services/getUser";
import { setUserData } from "src/shared/lib/setUserData";
import { removeUserData } from "src/shared/lib/removeUserData";

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    lastName: "",
    patronymic: "",
    birthdayDate: "",
    userType: undefined,
    gender: undefined,
    contactData: "",
    authorized: false,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearResponseStatus: (state) => {
      state.isSuccess = false;
      state.isFailure = false;
      state.isLoading = false;
    },
    initUser: (state, action: PayloadAction<string>) => {
      try {
        const data = jwtDecode(action.payload) as jwtObject;

        const user = new User({
          id: data.id,
          name: data.name,
          lastName: data.last_name,
          patronymic: data.patronymic,
          birthdayDate: data.birthday_date,
          userType: data.user_type,
          gender: data.gender,
          contactData: data.contact_data,
          login: data.login,
          authorized: true,
        });
        setUserData(user);
        // @ts-ignore
        state.user = user;
      } catch {}
    },
    changeUser: (state, action: PayloadAction<jwtObject>) => {
      const user = new User({
        id: action.payload.id,
        name: action.payload.name,
        lastName: action.payload.last_name,
        patronymic: action.payload.patronymic,
        birthdayDate: action.payload.birthday_date,
        userType: action.payload.user_type,
        gender: action.payload.gender,
        contactData: action.payload.contact_data,
        login: action.payload.login,
        authorized: true,
      });
      // @ts-ignore
      state.user = user;
    },
    logout: (state) => {
      removeToken();
      removeUserData();
      state.user = {
        name: "",
        lastName: "",
        patronymic: "",
        birthdayDate: "",
        userType: undefined,
        gender: undefined,
        contactData: "",
        authorized: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      })
      .addCase(changeContactData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeContactData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(changeContactData.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;

        const user = new User({
          id: action.payload.data.id,
          name: action.payload.data.name,
          lastName: action.payload.data.last_name,
          patronymic: action.payload.data.patronymic,
          birthdayDate: action.payload.data.birthday_date,
          userType: action.payload.data.user_type,
          gender: action.payload.data.gender,
          contactData: action.payload.data.contact_data,
          login: action.payload.data.login,
          authorized: true,
        });
        // @ts-ignore
        state.user = user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      });
  },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
