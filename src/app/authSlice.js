import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import apiLoginAdmin from '../api/apiLoginAdmin'
import StorageKeys from "../constants/storage-keys";


// createAsyncThunk cái này sử dụng cho login và register
export const login = createAsyncThunk("user/login_admin", async (payload) => {
  const response = await apiLoginAdmin.login(payload)
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data));
  return response.token;
});

const userSlice = createSlice({
  name: "admin",
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {
    //clear local storage
    logout(state) {
      state.current = {};
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
      localStorage.removeItem(StorageKeys.USER)
    },
  },
  extraReducers: {
      [login.fulfilled]: (state, action) => {
        state.current = action.payload;
      },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;

