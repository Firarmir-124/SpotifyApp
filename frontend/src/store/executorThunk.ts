import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, Albums, Artists, Tracks, TracksHistory} from "../types";
import axiosApi from "../axiosApi";

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