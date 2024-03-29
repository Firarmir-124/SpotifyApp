import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  Album,
  AlbumMutation,
  Albums,
  ArtistMutation,
  Artists,
  TrackMutation,
  Tracks,
  TracksHistory,
  ValidationError
} from "../types";
import axiosApi from "../axiosApi";
import {isAxiosError} from "axios";

export const fetchExecutor = createAsyncThunk<Artists[]>(
  'executor/fetch',
  async () => {
    const response = await axiosApi.get<Artists[]>('/artists');
    return response.data;
  }
);

export const fetchArtist = createAsyncThunk<Artists | null, string>(
  'artist/fetch',
  async (id) => {
    const response = await axiosApi.get<Artists | null>('/artists/' + id);
    const jsn = response.data;

    if (!jsn) {
      throw new Error('not found');
    }

    return jsn
  }
);

export const fetchAlbums = createAsyncThunk<Albums[], string>(
  'albums/fetch',
  async (id) => {
    const response = await axiosApi.get<Albums[]>('/albums?artist=' + id);
    return response.data;
  }
);

export const fetchAlbum = createAsyncThunk<Album | null, string>(
  'album/fetch',
  async (id) => {
    const response = await axiosApi.get<Album | null>('/albums/' + id);
    const jsn = response.data;

    if (!jsn) {
      throw new Error('not found');
    }

    return jsn
  }
);

export const fetchTracks = createAsyncThunk<Tracks[], string>(
  'tracks/fetch',
  async (id) => {
    const response = await axiosApi.get<Tracks[]>('/tracks?album=' + id);
    return response.data
  }
);

export const trackHistoryPost = createAsyncThunk<void, string>(
  'trackHistory/post',
  async (id) => {
    await axiosApi.post('/track_history', {track: id});
  }
);

export const trackHistoryGet = createAsyncThunk<TracksHistory[]>(
  'trackHistory/get',
  async () => {
    const response = await axiosApi.get('/track_history');
    return response.data
  }
);

export const createExecutor = createAsyncThunk<void, ArtistMutation, {rejectValue: ValidationError}>(
  'controlExecutor/create',
  async (artistMutation, {rejectWithValue}) => {
    const formDate = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      const value = artistMutation[key];


      if (value !== null) {
        formDate.append(key, value);
      }
    });

    try {
      await axiosApi.post('/artists', formDate);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, {rejectValue: ValidationError}>(
  'controlExecutor/createAlbum',
  async (albumMutation, {rejectWithValue}) => {
    const formDate = new FormData();
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumMutation[key];

      if (value !== null) {
        formDate.append(key, value);
      }
    });

    try {
      await axiosApi.post('/albums', formDate);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation, {rejectValue: ValidationError}>(
  'controlExecutor/createTrack',
  async (trackMutation, {rejectWithValue}) => {
    try {
      await axiosApi.post('/tracks', trackMutation);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  }
);

export const removeExecutor = createAsyncThunk<void, string>(
  'controlExecutor/removeExecutor',
  async (id) => {
    await axiosApi.delete('/artists/' + id);
  }
);

export const removeAlbum = createAsyncThunk<void, string>(
  'controlExecutor/removeAlbum',
  async (id) => {
    await axiosApi.delete('/albums/' + id);
  }
);

export const removeTrack = createAsyncThunk<void, string>(
  'controlExecutor/removeTrack',
  async (id) => {
    await axiosApi.delete('/tracks/' + id);
  }
);

interface isPublished {
  id: string;
  published: boolean;
}

export const isPublishedExecutor = createAsyncThunk<void, isPublished>(
  'controlExecutor/isPublishedExecutor',
  async (arg) => {
    await axiosApi.patch('/artists/' + arg.id + '/togglePublished', {isPublished: arg.published});
  }
);

export const isPublishedAlbum = createAsyncThunk<void, isPublished>(
  'controlExecutor/isPublishedAlbum',
  async (arg) => {
    await axiosApi.patch('/albums/' + arg.id + '/togglePublished', {isPublished: arg.published});
  }
);

export const isPublishedTrack = createAsyncThunk<void, isPublished>(
  'controlExecutor/isPublishedTrack',
  async (arg) => {
    await axiosApi.patch('/tracks/' + arg.id + '/togglePublished', {isPublished: arg.published});
  }
);