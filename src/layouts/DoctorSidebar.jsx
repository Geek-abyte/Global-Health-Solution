import React, { useEffect, useState } from "react";
import { defaultUser, userImage } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { HiChip } from "react-icons/hi";
import { PATH } from "../routes/path";
import { fetchUserProfile } from "../states/user/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DoctorSidebar = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, user]);

  useEffect(() => {
    switch (location.pathname) {
      case PATH.doctor.profile:
        setSelectedItem("profile");
        break;
      case PATH.dashboard.history:
        setSelectedItem("medical-history");
        break;
      default:
        setSelectedItem("dashboard");
        break;
    }
  }, [location.pathname]);

  return (
    <nav
      className={`${className} relative flex flex-col w-20 h-screen bg-primary-10 text-white overflow-hidden`}
    >
      <div className="image flex items-center px-4 w-full py-[30px]">
        <img src={defaultUser} alt="" className="w-[70px]" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto items-center">
        <Link
          to={PATH.doctor.dashboard}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === "dashboard" ? "text-[#FFE500]" : ""
          }`}
        >
          <LuLayoutDashboard size={25} className="mr-2" />
        </Link>
        <Link
          to={PATH.doctor.profile}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === "profile" ? "text-[#FFE500]" : ""
          }`}
        >
          <LuUser size={25} className="mr-2" />
        </Link>
        <Link
          to={PATH.doctor.history}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === "medical-history" ? "text-[#FFE500]" : ""
          }`}
        >
          <HiChip size={25} className="mr-2" />
        </Link>
      </div>
    </nav>
  );
};

export default DoctorSidebar;
