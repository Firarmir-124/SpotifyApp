import {Artists} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchExecutor} from "./executorThunk";
import {RootState} from "../app/store";

interface executorType {
  executors: Artists[];
  executorLoading: boolean;
}

const initialState:executorType = {
  executors: [],
  executorLoading: false,
};

export const executorSlice = createSlice({
  name: 'executor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExecutor.pending, (state) => {
      state.executorLoading = true;
    });
    builder.addCase(fetchExecutor.fulfilled, (state, {payload: executor}) => {
      state.executorLoading = false;
      state.executors = executor;
    });
    builder.addCase(fetchExecutor.rejected, (state) => {
      state.executorLoading = false;
    });
  }
});

export const executorReducer = executorSlice.reducer;
export const selectExecutors = (state: RootState) => state.executor.executors;
export const selectExecutorLoading = (state: RootState) => state.executor.executorLoading;