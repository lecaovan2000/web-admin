import userReducer from '../app/authSlice'

import { configureStore,createSlice } from '@reduxjs/toolkit';


const rootReducer = {
  admin: userReducer,
}

const store = configureStore({
   reducer: rootReducer,
})

export default store