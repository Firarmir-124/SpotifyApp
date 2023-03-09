import {Album, Albums, Artists, Tracks, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createExecutor, fetchAlbum, fetchAlbums, fetchArtist, fetchExecutor, fetchTracks} from "./executorThunk";
import {RootState} from "../app/store";

interface executorType {
  executors: Artists[];
  artist: Artists | null;
  albums: Albums[];
  album: Album | null;
  tracks: Tracks[];
  tracksLoading: boolean;
  albumOneLoading: boolean;
  albumLoading: boolean;
  executorLoading: boolean;
  artistLoading: boolean;
  createArtistLoading: boolean;
  errorArtist: ValidationError | null;
}

const initialState:executorType = {
  executors: [],
  artist: null,
  albums: [],
  album: null,
  tracks: [],
  tracksLoading: false,
  albumOneLoading: false,
  albumLoading: false,
  executorLoading: false,
  artistLoading: false,
  createArtistLoading: false,
  errorArtist: null,
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

    builder.addCase(fetchAlbum.pending, (state) => {
      state.albumOneLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, {payload: album}) => {
      state.albumOneLoading = false;
      state.album = album;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.albumOneLoading = false;
    });

    builder.addCase(fetchTracks.pending, (state) => {
      state.tracksLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
      state.tracksLoading = false;
      state.tracks = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.tracksLoading = false;
    });

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
  }
});

export const executorReducer = executorSlice.reducer;
export const selectExecutors = (state: RootState) => state.executor.executors;
export const selectExecutorLoading = (state: RootState) => state.executor.executorLoading;
export const selectArtistLoading = (state: RootState) => state.executor.artistLoading;
export const selectArtist = (state: RootState) => state.executor.artist;
export const selectAlbums = (state: RootState) => state.executor.albums;
export const selectAlbumLoading = (state: RootState) => state.executor.albumLoading;
export const selectAlbum = (state: RootState) => state.executor.album;
export const selectAlbumOneLoading = (state: RootState) => state.executor.albumOneLoading;
export const selectTracks = (state: RootState) => state.executor.tracks;
export const selectTracksLoading = (state: RootState) => state.executor.tracksLoading;
export const selectCreateArtistLoading = (state: RootState) => state.executor.createArtistLoading;
export const selectArtistError = (state: RootState) => state.executor.errorArtist;
