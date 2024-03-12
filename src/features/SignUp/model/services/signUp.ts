import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpSchema } from "../types/SignUpSchema";
import { ResponseSchema } from "src/app/types/ResponseSchema";
import { DOMAIN } from "src/app/consts/consts";
import { setToken } from "src/shared/lib/setToken";

export const signUp = createAsyncThunk<
  ResponseSchema,
  SignUpSchema,
  { rejectValue: string }
>("SignUp/signUp", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const promise = await axios.post(`${DOMAIN}/register`, payload, {
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
