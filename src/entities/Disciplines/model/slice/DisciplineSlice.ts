import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DisciplinesState } from "../types/Discipline";
import { createDiscipline } from "../services/createDiscipline";
import { getDisciplines } from "../services/getDisciplines";

const initialState: DisciplinesState = {
  list: [],
};

export const DisciplineSlice = createSlice({
  name: "disciplines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiscipline.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDiscipline.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
      })
      .addCase(createDiscipline.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      })
      .addCase(getDisciplines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDisciplines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.isSuccess;
        state.isFailure = action.payload.isFailure;
        state.message = action.payload.message;
        state.list = [];
        action.payload.data.forEach((elem:any) => {
          state.list.push({
            name: elem.name,
            userId: elem.user_id,
          });
        });
      })
      .addCase(getDisciplines.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error as string;
      });
  },
});

export const { actions: DisciplineActions } = DisciplineSlice;
export const { reducer: DisciplineReducer } = DisciplineSlice;
