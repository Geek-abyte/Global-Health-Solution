import React from "react";
import { Outlet } from "react-router-dom";
import { ChatBot, Footer, Navbar } from "../components";
import PatientSidebar from "./PatientSidebar";
import DoctorSidebar from "./DoctorSidebar";

// const layoutList = "default" | "doctor" | "patient";

const Layout = ({ layout, selected }) => {
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
      </div>
    )
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
      </div>
    )
  }
  return (
    <>
      <Navbar />
        <Outlet />
        {/* <ChatBot /> */}
      <Footer/>
    </>
  );
};

export default Layout;
