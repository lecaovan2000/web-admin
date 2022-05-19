import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import StorageKeys from '@/constants/storage-keys'




const authSlice = createSlice({
   name: 'store',
   initialState: {
      // current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
      current: {},
      settings: {}
   },
   reducers: {
      // logout(state, action) {
      //    // clear local storage
      //    localStorage.removeItem(StorageKeys.USER)
      //    localStorage.removeItem(StorageKeys.ACCESS_TOKEN)

      //    state.current = {}
      // }
   },
   extraReducers: {
      // [login.fulfilled]: (state, action) => {},
      // [getCurrentUser.fulfilled]: (state, action) => {
      //    state.current = action.payload
      // }
   }
})

const { actions, reducer } = authSlice
export const { logout } = actions
export default reducer
