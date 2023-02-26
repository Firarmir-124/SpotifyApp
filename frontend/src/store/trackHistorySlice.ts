import {createSlice} from "@reduxjs/toolkit";
import {trackHistoryPost} from "./executorThunk";
import {RootState} from "../app/store";

interface trackHistoryType {
  trackHistoryPostLoading: boolean;
}

const initialState:trackHistoryType = {
  trackHistoryPostLoading: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trackHistoryPost.pending, (state) => {
      state.trackHistoryPostLoading = true;
    });
    builder.addCase(trackHistoryPost.fulfilled, (state) => {
      state.trackHistoryPostLoading = false;
    });
    builder.addCase(trackHistoryPost.rejected, (state) => {
      state.trackHistoryPostLoading = false;
    });
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const trackHistoryPostLoading = (state: RootState) => state.trackHistory.trackHistoryPostLoading;
