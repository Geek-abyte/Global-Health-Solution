import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/user/authSlice";
import appointmentReducer from "./states/appointmentSlice";
import notificationReducer from "./states/notificationSlice";
import popUpReducer from "./states/popUpSlice";
import blogReducer from "./states/blog/blogSlice";
import videoCallReducer from "./states/videoCallSlice";
import medicalFileReducer from "./states/medicalFileSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    notifications: notificationReducer,
    popUp: popUpReducer,
    blog: blogReducer,
    videoCall: videoCallReducer,
    medicalFile: medicalFileReducer,
  },
});

export default store;
