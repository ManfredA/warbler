import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import errorsReducer from './state/slices/errors'
import messagesReducer from './state/slices/messages'
import userReducer from './state/slices/user'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
