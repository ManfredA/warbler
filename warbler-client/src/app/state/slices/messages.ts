import { Message, MessagesState } from '../../types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store';
import { apiCall } from '../../services/api';

const initialState: MessagesState = {
  messages: [],
  isLoading: false
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMessages.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(loadMessages.fulfilled, (state, { payload }: PayloadAction<Message[]>) => {
      state.isLoading = false
      state.messages = payload
    })
    builder.addCase(postNewMessage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(postNewMessage.fulfilled, (state, { payload }: PayloadAction<Message>) => {
      state.messages = [...state.messages, payload]
      state.isLoading = false
    })
    builder.addCase(deleteMessage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteMessage.fulfilled, (state, { payload }: PayloadAction<Message>) => {
      state.messages = state.messages.filter(({ id }) => payload.id !== id )
      state.isLoading = false
    })
  }
})

export const selectMessages =  (state: RootState) => state.messages;

export default messagesSlice.reducer


export const loadMessages = createAsyncThunk(
  'messages/load',
  async () => {
    return await apiCall('get', `/api/messages`)
  }
);

export const postNewMessage = createAsyncThunk(
  'messages/post',
  async ({ userId, message }:{ userId: string, message: { text: string}}) => {
  return await apiCall('post', `/api/users/${userId}/messages/`, message)
})

export const deleteMessage = createAsyncThunk(
  'messages/delete',
  async({userId, messageId}:{ userId: string, messageId: string }) => {
    return await apiCall('delete', `/api/users/${userId}/messages/${messageId}`)
  }
)