import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User, UserState } from "../../types"
import { apiCall, setTokenHeader } from "../../services/api"

import { RootState } from "../../store"

const initialState: UserState = {
  isAuthenticated: false,
  user: undefined,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | undefined>) => {
      state.user = payload;
      state.isAuthenticated = Boolean(payload)
    },
  },
  extraReducers: (builder) => {
    builder
    // authenticate
    .addCase(authenticateUser.pending, (state) => {
      state.isLoading = true
    })
    .addCase(authenticateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.isAuthenticated = true
    })
    .addCase(authenticateUser.rejected, (state) => {
      state.isLoading = false
      state.isAuthenticated = false
    })
    // logout
    .addCase(logout.pending, (state) => {
      state.isLoading = true
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = undefined
      state.isAuthenticated = false
    })
  }
})

export const selectUser =  (state: RootState) => state.user;

export default userSlice.reducer

//#region
export const authenticateUser = createAsyncThunk(
  'user/auth',
  async ({
    userData,
    type
  }: {
    type: string,
    userData: Omit<User, 'id'>
  }) => {
    const { token, ...user } = await apiCall("post", `/api/auth/${type}`, userData);
    localStorage.setItem('jwtToken', token)
    setTokenHeader(token)
    return user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    localStorage.clear()
    setTokenHeader(false)
    window.location.replace('/');
  }
);
//#endregion