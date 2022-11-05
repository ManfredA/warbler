import { Message, MessagesState } from "../../types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../../store";
import { apiCall } from "../../services/api";

const initialState: MessagesState = {
  messages: [],
  isLoading: false
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }: PayloadAction<Message>) => {
      state.messages = [...state.messages, payload];
    },
    removeMessage: (state) => {
      // state.messages =;
      console.log('reset');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadMessages.fulfilled, (state, { payload }: PayloadAction<Message[]>) => {
      console.log('payload: ', payload);
      state.messages = payload
    })
  }
})

export const selectMessages =  (state: RootState) => state.messages;

export default messagesSlice.reducer


export const loadMessages = createAsyncThunk(
  'messages/load',
  async (userId:string) => {
    console.log('loading messages');
    // return [{ user: '', text: 'empty!', id: '' }]
    return await apiCall("get", `api/messages`)
  }
);