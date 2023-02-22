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