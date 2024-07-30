import React, { useEffect } from "react";
import Router from "./routes";
import { toast, ToastContainer } from "react-toastify";
import IncomingCallNotification from "./components/IncomingCallNotification";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./states/popUpSlice";

function App() {
  const dispatch = useDispatch();
  const { showToast, toastMessage, toastStatus, showModal, modalContent } =
    useSelector((state) => state.popUp);

  const commonElements = (
    <>
      <ToastContainer />
      {showModal && modalContent === "incomingCall" && (
        <IncomingCallNotification />
      )}
    </>
  );

  useEffect (() => {
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

  return (
    <>
      <Router />
      {commonElements}
    </>
  );
}

export default App;
