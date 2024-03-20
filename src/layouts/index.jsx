import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
import PatientSidebar from "./PatientSidebar";

// const layoutList = "default" | "doctor" | "patient";

const Layout = ({ layout, selected }) => {
  if (layout == "patient") {
    return (
      <div className="flex flex-row">
        {/* <Navbar /> */}
        <PatientSidebar />
        <Outlet />
      </div>
    )
  } 
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
