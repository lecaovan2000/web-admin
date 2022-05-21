import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import apiLoginAdmin from '../api/apiLoginAdmin'
import StorageKeys from "../constants/storage-keys";
import { common } from "../utils/common";
import { path } from "../constants/path";
import { utilsToken } from "../../src/utils/token";

// createAsyncThunk cái này sử dụng cho login và register
// export const register = createAsyncThunk("user/logout", async (data) => {
//   const res = await apiLoginAdmin.logout(data);
//   console.log(res);
//   localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
//   localStorage.removeItem(StorageKeys.USER);
// });

// createAsyncThunk cái này sử dụng cho login và register
export const login = createAsyncThunk("user/login_admin", async (payload) => {
  const response = await apiLoginAdmin.login(payload)
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data));
  return response.token;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {
    logout(state) {

      //clear local storage
      state.current = {};
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
    },
  },
  extraReducers: {
   //  [logout.fulfilled]: (state, action) => {
   //    state.current = action.data;
   //  },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;

