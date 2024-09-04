import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/user/authSlice";
import popUpReducer from "./states/popUpSlice";
import navBarReducer from "./states/navBarSlice";
import videoCallReducer from "./states/videoCallSlice";
import blogReducer from "./states/blog/blogSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    popUp: popUpReducer,
    navBar: navBarReducer,
    videoCall: videoCallReducer,
    blog: blogReducer,
  },
});

export default store;
