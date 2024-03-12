import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResponseSchema } from "src/app/types/ResponseSchema";
import { DOMAIN } from "src/app/consts/consts";
import { getToken } from "src/shared/lib/getToken";

export const getDisciplines = createAsyncThunk(
  "Disciplines/getDisciplines",
  async (thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(`${DOMAIN}/get-disciplines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isSuccess) {
        return response.data;
      }
      if (response.data.isFailure) {
        throw new Error(response.data.message);
      }
    } catch (e) {
      // @ts-ignore
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
