import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {trackHistoryGet, trackHistoryPost} from "./executorThunk";
import {RootState} from "../app/store";
import {TracksHistory} from "../types";

interface trackHistoryType {
  trackHistoryPostLoading: boolean;
  trackHistory: TracksHistory[];
  trackHistoryGetLoading: boolean;
  videoId: string;
  openModal: boolean;
}

const initialState:trackHistoryType = {
  trackHistoryPostLoading: false,
  trackHistory: [],
  trackHistoryGetLoading: false,
  videoId: '',
  openModal: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {
    getVideoId: (state, {payload: id}:PayloadAction<string>) => {
      state.videoId = id;
      state.openModal = true;
    },
    closeModal: (state) => {
      state.openModal = false;
    }
  },
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

    builder.addCase(trackHistoryGet.pending, (state) => {
      state.trackHistoryGetLoading = true;
    });
    builder.addCase(trackHistoryGet.fulfilled, (state, {payload: trackHistory}) => {
      state.trackHistoryGetLoading = false;
      state.trackHistory = trackHistory;
    });
    builder.addCase(trackHistoryGet.rejected, (state) => {
      state.trackHistoryGetLoading = false;
    });
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const {getVideoId, closeModal} = trackHistorySlice.actions;
export const selectTrackHistory = (state: RootState) => state.trackHistory.trackHistory;
export const selectTrackHistoryGetLoading = (state: RootState) => state.trackHistory.trackHistoryGetLoading;
export const selectVideoId = (state: RootState) => state.trackHistory.videoId;
export const selectOpenModal = (state: RootState) => state.trackHistory.openModal;
