import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './states/user/authSlice'

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;