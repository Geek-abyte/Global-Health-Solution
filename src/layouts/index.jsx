import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatBot, Footer, Navbar } from "../components";
import PatientSidebar from "./PatientSidebar";
import DoctorSidebar from "./DoctorSidebar";
import { hideToast } from "../states/popUpSlice";

const Layout = ({ layout, selected }) => {
  const dispatch = useDispatch();
  const { showToast, toastMessage, toastStatus, showModal, modalContent } =
    useSelector((state) => state.popUp);

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

  if (layout === "patient") {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-grow overflow-hidden">
          <PatientSidebar />
          <section className="w-full overflow-x-auto">
            <Outlet />
            <ChatBot />
          </section>
        </div>
        <ToastContainer />
      </div>
    );
  }

  if (layout === "doctor") {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-row flex-grow overflow-hidden">
          <DoctorSidebar />
          <section className="w-full overflow-x-auto">
            <Outlet />
            {/* <ChatBot /> */}
          </section>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <ChatBot /> */}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
