import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoDark, logoWhite, defaultUser } from '../assets';
import { LuLayoutDashboard, LuUser, LuLogOut } from "react-icons/lu";
import { BsCapsulePill } from "react-icons/bs";
import { FaRegHospital, FaUserDoctor } from "react-icons/fa6";
import { PATH } from '../routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../states/popUpSlice';
import { FaCalendarAlt } from "react-icons/fa";

const PatientSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const apiUrl = import.meta.env.VITE_API_URL;

  const navItems = [
    { path: PATH.dashboard.default, icon: <LuLayoutDashboard />, label: "Dashboard" },
    { path: PATH.dashboard.profile, icon: <LuUser />, label: "Profile" },
    { path: PATH.dashboard.consultant, icon: <FaUserDoctor />, label: "Consultant" },
    { path: PATH.dashboard.prescription, icon: <BsCapsulePill />, label: "Prescription" },
    { path: PATH.dashboard.history, icon: <FaRegHospital />, label: "Medical History" },
    { path: PATH.dashboard.appointments, icon: <FaCalendarAlt />, label: "Appointments" },
  ];

  const handleLogout = () => {
    dispatch(showModal({ content: "OTP verification" }));
  };

  const NavLink = ({ item }) => (
    <Link
      to={item.path}
      className={`px-4 py-3 my-1 text-lg font-medium flex items-center rounded-lg transition-colors duration-200
        ${location.pathname === item.path
          ? 'bg-primary-7 text-white'
          : 'text-primary-2 hover:bg-primary-5 hover:text-white'
        }`}
      onClick={onClose}
    >
      <span className="mr-3">{item.icon}</span>
      {item.label}
    </Link>
  );

  useEffect(() => {

  }, [user, isAuthenticated])

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col w-64 bg-white shadow-lg overflow-y-hidden z-40`}>
      <div className="flex flex-col items-center p-4 border-b border-gray-200">
        <img
          src={user.profileImage ? `${apiUrl}${user.profileImage}` : defaultUser}
          crossOrigin="anonymous"
          alt="User" className="w-20 h-20 rounded-full mb-2"
        />

        <h2 className="text-xl font-semibold text-gray-800">{user?.firstName}</h2>
        <p className="text-sm text-gray-600">{user?.role}</p>
      </div>

      <nav className="flex-1 px-4 py-4 custom-scrollbar overflow-y-auto">
        {navItems.map((item, index) => (
          <NavLink key={index} item={item} />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-lg font-medium flex items-center rounded-lg transition-colors duration-200 text-primary-2 hover:bg-primary-5 hover:text-white"
        >
          <span className="mr-3"><LuLogOut /></span>
          Logout
        </button>
      </div>

      <div className="p-4 border-t border-gray-200">
        <img src={logoWhite} alt="Logo" className="w-32 mx-auto" />
      </div>
    </div>
  );
};

export default PatientSidebar;