import React, { useEffect } from "react";
import Router from "./routes";
import { toast, ToastContainer } from "react-toastify";
import IncomingCallNotification from "./components/IncomingCallNotification";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./states/popUpSlice";
import { addNotification } from "./states/notificationSlice";
import io from "socket.io-client";
import LogoutModal from "./components/LogoutModal";

function App() {
  const dispatch = useDispatch();
  const { showToast, toastMessage, toastStatus, showModal, modalContent } =
    useSelector((state) => state.popUp);

  const API_URL = import.meta.env.VITE_API_URL;

  const commonElements = (
    <>
      <ToastContainer />
      {showModal && modalContent === "incomingCall" && (
        <IncomingCallNotification />
      )}
      {showModal && modalContent === "logout" && <LogoutModal />}
    </>
  );

  useEffect(() => {
    if (showToast) {
      if (toastStatus === "success") {
        toast.success(toastMessage, {
          onClose: () => dispatch(hideToast()),
        });
      } else if (toastStatus === "error") {
        toast.error(toastMessage, {
          onClose: () => dispatch(hideToast()),
        });
      } else {
        toast(toastMessage, {
          onClose: () => dispatch(hideToast()),
        });
      }
    }
  }, [showToast, toastMessage, toastStatus, dispatch]);

  useEffect(() => {
    const socket = io(API_URL); // Replace with your server URL


    socket.on('notification', (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <Router />
      {commonElements}
    </>
  );
}

export default App;
