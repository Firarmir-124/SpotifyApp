import {Artists} from "../types";
import {createSlice} from "@reduxjs/toolkit";

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
  reducers: {}
});

export const executorReducer = executorSlice.reducer;