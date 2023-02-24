import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artists} from "../types";
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

    if (jsn) {
      throw new Error('not found');
    }

    return jsn
  }
);