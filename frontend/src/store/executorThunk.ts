import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, Albums, Artists, Tracks} from "../types";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

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

export const fetchTracks = createAsyncThunk<Tracks[], string, {state: RootState}>(
  'tracks/fetch',
  async (id, thunkAPI) => {
    const user = thunkAPI.getState().users.user;

    if (user) {
      const response = await axiosApi.get<Tracks[]>(
        '/tracks?album=' + id,
        {headers: {'Authorization': user.token}}
      );
      return response.data
    }
    throw new Error('Not found');
  }
);

export const trackHistoryPost = createAsyncThunk<void, string, {state: RootState}>(
  'trackHistory/post',
  async (id, thunkAPI) => {
    const user = thunkAPI.getState().users.user;

    if (user) {
      await axiosApi.post(
        '/track_history',
        {track: id},
        {headers: {'Authorization': user.token}}
      );
    } else {
      throw new Error('Not found');
    }
  }
);