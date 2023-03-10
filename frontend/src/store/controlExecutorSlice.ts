import {createSlice} from "@reduxjs/toolkit";
import {ValidationError} from "../types";
import {
  createAlbum,
  createExecutor,
  createTrack, isPublishedAlbum,
  isPublishedExecutor, isPublishedTrack,
  removeAlbum,
  removeExecutor,
  removeTrack
} from "./executorThunk";
import {RootState} from "../app/store";

interface controlExecutorType {
  createArtistLoading: boolean;
  errorArtist: ValidationError | null;
  createAlbumLoading: boolean;
  errorAlbum: ValidationError | null;
  createTrackLoading: boolean;
  errorTrack: ValidationError | null;
  removeArtistLoading: boolean;
  removeAlbumLoading: boolean;
  removeTrackLoading: boolean;
  publishedArtist: boolean;
  publishedAlbum: boolean;
  publishedTrack: boolean;
}

const initialState:controlExecutorType = {
  createArtistLoading: false,
  errorArtist: null,
  createAlbumLoading: false,
  errorAlbum: null,
  createTrackLoading: false,
  errorTrack: null,
  removeArtistLoading: false,
  removeAlbumLoading: false,
  removeTrackLoading: false,
  publishedArtist: false,
  publishedAlbum: false,
  publishedTrack: false,
}

export const controlExecutorSlice = createSlice({
  name: 'controlExecutor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExecutor.pending, (state) => {
      state.createArtistLoading = true;
    });
    builder.addCase(createExecutor.fulfilled, (state) => {
      state.createArtistLoading = false;
    });
    builder.addCase(createExecutor.rejected, (state, {payload: error}) => {
      state.createArtistLoading = false;
      state.errorArtist = error || null;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createAlbumLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createAlbumLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.createAlbumLoading = false;
      state.errorAlbum = error || null;
    });

    builder.addCase(createTrack.pending, (state) => {
      state.createTrackLoading = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createTrackLoading = false;
    });
    builder.addCase(createTrack.rejected, (state, {payload: error}) => {
      state.createTrackLoading = false;
      state.errorTrack = error || null;
    });

    builder.addCase(removeExecutor.pending, (state) => {
      state.removeArtistLoading = true;
    });
    builder.addCase(removeExecutor.fulfilled, (state) => {
      state.removeArtistLoading = false;
    });
    builder.addCase(removeExecutor.rejected, (state) => {
      state.removeArtistLoading = false;
    });

    builder.addCase(removeAlbum.pending, (state) => {
      state.removeAlbumLoading = true;
    });
    builder.addCase(removeAlbum.fulfilled, (state) => {
      state.removeAlbumLoading = false;
    });
    builder.addCase(removeAlbum.rejected, (state) => {
      state.removeAlbumLoading = false;
    });

    builder.addCase(removeTrack.pending, (state) => {
      state.removeTrackLoading = true;
    });
    builder.addCase(removeTrack.fulfilled, (state) => {
      state.removeTrackLoading = false;
    });
    builder.addCase(removeTrack.rejected, (state) => {
      state.removeTrackLoading = false;
    });

    builder.addCase(isPublishedExecutor.pending, (state) => {
      state.publishedArtist = true;
    });
    builder.addCase(isPublishedExecutor.fulfilled, (state) => {
      state.publishedArtist = false;
    });
    builder.addCase(isPublishedExecutor.rejected, (state) => {
      state.publishedArtist = false;
    });

    builder.addCase(isPublishedAlbum.pending, (state) => {
      state.publishedAlbum = true;
    });
    builder.addCase(isPublishedAlbum.fulfilled, (state) => {
      state.publishedAlbum = false;
    });
    builder.addCase(isPublishedAlbum.rejected, (state) => {
      state.publishedAlbum = false;
    });

    builder.addCase(isPublishedTrack.pending, (state) => {
      state.publishedTrack = true;
    });
    builder.addCase(isPublishedTrack.fulfilled, (state) => {
      state.publishedTrack = false;
    });
    builder.addCase(isPublishedTrack.rejected, (state) => {
      state.publishedTrack = false;
    });
  }
});

export const controlExecutorReducer = controlExecutorSlice.reducer;
export const selectCreateArtistLoading = (state: RootState) => state.controlExecutor.createArtistLoading;
export const selectArtistError = (state: RootState) => state.controlExecutor.errorArtist;
export const selectCreateAlbumLoading = (state: RootState) => state.controlExecutor.createAlbumLoading;
export const selectAlbumError = (state: RootState) => state.controlExecutor.errorAlbum;
export const selectCreateTrackLoading = (state: RootState) => state.controlExecutor.createTrackLoading;
export const selectTrackError = (state: RootState) => state.controlExecutor.errorTrack;
export const selectRemoveArtistLoading = (state: RootState) => state.controlExecutor.removeArtistLoading;
export const selectRemoveAlbumLoading = (state: RootState) => state.controlExecutor.removeAlbumLoading;
export const selectRemoveTrackLoading = (state: RootState) => state.controlExecutor.removeTrackLoading;
export const selectPublishedArtist = (state: RootState) => state.controlExecutor.publishedArtist;
export const selectPublishedAlbum = (state: RootState) => state.controlExecutor.publishedAlbum;
export const selectPublishedTrack = (state: RootState) => state.controlExecutor.publishedTrack;