import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, Albums, Artists} from "../types";
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