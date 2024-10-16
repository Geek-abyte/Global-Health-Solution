import React, { useEffect, useState } from "react";
import { defaultUser, userImage } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { HiChip } from "react-icons/hi";
import { PATH } from "../routes/path";
import { fetchUserProfile } from "../states/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt } from 'react-icons/fa';

const DoctorSidebar = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const { user } = useSelector((state) => state.auth);

  const apiUrl = import.meta.env.VITE_API_URL;

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
      case PATH.doctor.appointments:
        setSelectedItem("appointments");
        break;
      default:
        setSelectedItem("dashboard");
        break;
    }
  }, [location.pathname]);

  return (
    <nav
      className={`${className} relative flex flex-col items-center p-4 w-20 h-screen bg-primary-10 text-white overflow-hidden`}
    >
      <div className="flex w-12 h-12 m-2 items-center rounded-full justify-center overflow-hidden">
        <img
          src={user.profileImage ? `${apiUrl}${user.profileImage}` : defaultUser}
          crossOrigin="anonymous"
          alt=""
          className="object-cover" />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto items-center">
        <Link
          to={PATH.doctor.dashboard}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${selectedItem === "dashboard" ? "text-[#FFE500]" : ""
            }`}
        >
          <LuLayoutDashboard size={25} className="mr-2" />
        </Link>
        <Link
          to={PATH.doctor.profile}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${selectedItem === "profile" ? "text-[#FFE500]" : ""
            }`}
        >
          <LuUser size={25} className="mr-2" />
        </Link>
        <Link
          to={PATH.doctor.history}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${selectedItem === "medical-history" ? "text-[#FFE500]" : ""
            }`}
        >
          <HiChip size={25} className="mr-2" />
        </Link>
        <Link
          to={PATH.doctor.appointments}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${selectedItem === "appointments" ? "text-[#FFE500]" : ""
            }`}
        >
          <FaCalendarAlt size={25} className="mr-2" />
        </Link>
      </div>
    </nav>
  );
};

export default DoctorSidebar;
