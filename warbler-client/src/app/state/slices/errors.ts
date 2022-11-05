import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../../store";
import { authenticateUser } from "./user";

interface ErrorState {
  message: string
}

const initialState: ErrorState = {
  message: ''
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
    removeError: (state) => {
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(authenticateUser.fulfilled, (state) => {
      state.message = ''
    })
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.message = action.error.message;
      }
     )
  }
})

export const selectErrors =  (state: RootState) => state.errors;

export default errorSlice.reducer
