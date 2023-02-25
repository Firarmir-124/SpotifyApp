import {User, ValidationError} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {register} from "./userThunk";
import {RootState} from "../app/store";

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
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null
    });
  }
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;