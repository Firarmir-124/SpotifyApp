import {User, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";

interface UserType {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UserType = {
  user: null,
  registerLoading: false,
  registerError: null,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;