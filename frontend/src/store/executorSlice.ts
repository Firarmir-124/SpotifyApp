import {Albums, Artists} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbums, fetchArtist, fetchExecutor} from "./executorThunk";
import {RootState} from "../app/store";

interface executorType {
  executors: Artists[];
  artist: Artists | null;
  albums: Albums[];
  albumLoading: boolean;
  executorLoading: boolean;
  artistLoading: boolean;
}

const initialState:executorType = {
  executors: [],
  artist: null,
  albums: [],
  albumLoading: false,
  executorLoading: false,
  artistLoading: false,
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

    builder.addCase(fetchArtist.pending, (state) => {
      state.artistLoading = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, {payload: executor}) => {
      state.artistLoading = false;
      state.artist = executor;
    });
    builder.addCase(fetchArtist.rejected, (state) => {
      state.artistLoading = false;
    });

    builder.addCase(fetchAlbums.pending, (state) => {
      state.albumLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
      state.albumLoading = false;
      state.albums = albums;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.albumLoading = false;
    });
  }
});

export const executorReducer = executorSlice.reducer;
export const selectExecutors = (state: RootState) => state.executor.executors;
export const selectExecutorLoading = (state: RootState) => state.executor.executorLoading;
export const selectArtistLoading = (state: RootState) => state.executor.artistLoading;
export const selectArtist = (state: RootState) => state.executor.artist;
export const selectAlbums = (state: RootState) => state.executor.albums;
export const selectAlbumLoading = (state: RootState) => state.executor.albumLoading;