import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResponseSchema } from "src/app/types/ResponseSchema";
import { DOMAIN } from "src/app/consts/consts";
import { getToken } from "src/shared/lib/getToken";

export const createWorkout = createAsyncThunk<
  ResponseSchema,
  { beginDatetime: string; endDatetime: string; disciplineId: string },
  { rejectValue: string }
>("Workouts/createWorkout", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const token = getToken();
    const response = await axios.post(`${DOMAIN}/create-workout`, payload, {
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
    return rejectWithValue(e.message);
  }
});
