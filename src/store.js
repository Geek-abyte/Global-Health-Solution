import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './states/user/authSlice'
import popUpReducer from './states/popUpSlice';
import navBarReducer from './states/navBarSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    popUp: popUpReducer,
    navBar: navBarReducer
  },
});

export default store;