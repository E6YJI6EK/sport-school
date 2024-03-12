import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignInSchema } from "../types/SignInSchema";
import { ResponseSchema } from "src/app/types/ResponseSchema";
import { AUTH_TOKEN_KEY, DOMAIN, USER_DATA_KEY } from "src/app/consts/consts";
import { jwtDecode } from "jwt-decode";
import { UserActions } from "src/entities/User";
import { setToken } from "src/shared/lib/setToken";

export const signIn = createAsyncThunk<
  ResponseSchema,
  SignInSchema,
  { rejectValue: string }
>("SignIn/signIn", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const promise = await axios.post(`${DOMAIN}/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!promise.data) {
      throw new Error();
    }

    if (promise.data.isSuccess) {
      const { token } = promise.data.data;
      setToken(token);
    }

    return promise.data;
  } catch (e) {
    return rejectWithValue("Error");
  }
});
