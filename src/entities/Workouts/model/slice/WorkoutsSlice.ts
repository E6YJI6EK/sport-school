import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { WorkoutsSchema } from "../types/Workouts";
import { getSchedule } from "../services/getSchedule";
import { createWorkout } from "../services/createWorkout";

const initialState: WorkoutsSchema = {
  list: [],
};

export const WorkoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    clearResponseStatus: (state) => {
      state.isSuccess = false;
      state.isFailure = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
        state.list = [];
        action.payload.data.forEach((elem: any) => {
          state.list.push({
            name: elem.d_name,
            beginDateTime: new Date(elem.begin_datetime),
            endDateTime: new Date(elem.end_datetime),
            coach: [elem.last_name, elem.name, elem.patronymic].join(" "),
          });
        });
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      })
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      });
  },
});

export const { actions: WorkoutsActions } = WorkoutsSlice;
export const { reducer: WorkoutsReducer } = WorkoutsSlice;
