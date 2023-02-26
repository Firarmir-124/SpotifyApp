import {createSlice} from "@reduxjs/toolkit";

interface trackHistoryType {
  trackHistoryPost: boolean;
}

const initialState:trackHistoryType = {
  trackHistoryPost: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
