import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResponseSchema } from "src/app/types/ResponseSchema";
import { AUTH_TOKEN_KEY, DOMAIN } from "src/app/consts/consts";
import { UserActions } from "../slice/UserSlice";

export const verifyToken = createAsyncThunk<
  ResponseSchema,
  {},
  { rejectValue: string }
>("User/verifyToken", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const response = await axios.post(
      `${DOMAIN}/verifyToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.isFailure) dispatch(UserActions.logout());
    return {};
  } catch (e) {
    return rejectWithValue("Error");
  }
});
