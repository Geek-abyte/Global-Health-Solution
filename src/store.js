import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './states/user/authSlice'
import popUpReducer from './states/popUpSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    popUp: popUpReducer,
  },
});

export default store;