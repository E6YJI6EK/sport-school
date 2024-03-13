import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "src/app/consts/consts";
import { getToken } from "src/shared/lib/getToken";

export const getAchievements = createAsyncThunk(
  "workouts/getAchievements",
  async (thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(`${DOMAIN}/get-achievements`, {
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
