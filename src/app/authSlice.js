import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import apiLoginAdmin from '../api/apiLoginAdmin'
import StorageKeys from "../constants/storage-keys";
import { common } from "../utils/common";
import { path } from "../constants/path";
import { utilsToken } from "../../src/utils/token";

// createAsyncThunk cái này sử dụng cho login và register
export const register = createAsyncThunk("user/register", async (payload) => {
  const res = await apiLoginAdmin.register(payload);
  console.log(res);
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, res.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(res.user));
  return res.user;
});

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
      // const getToken = utilsToken.getAccessToken()

      //clear local storage
      state.current = {};
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
      localStorage.removeItem(StorageKeys.USER);
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;





// const authSlice = createSlice({
//    name: 'store',
//    initialState: {
//       current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
//       current: {},
//       settings: {}
//    },
//    reducers: {
//       logout(state, action) {
//          // clear local storage
//          localStorage.removeItem(StorageKeys.USER)
//          localStorage.removeItem(StorageKeys.ACCESS_TOKEN)

//          state.current = {}
//       }
//    },
//    extraReducers: {
//       [login.fulfilled]: (state, action) => {},
//       [getCurrentUser.fulfilled]: (state, action) => {
//          state.current = action.payload
//       }
//    }
// })

// const { actions, reducer } = authSlice
// export const { logout } = actions
// export default reducer
