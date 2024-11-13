import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiPhone,
  FiChevronDown,
  FiChevronRight,
  FiSettings,
  FiLogOut,
  FiBook,
  FiPlusCircle
} from "react-icons/fi";
import { Outlet, useLocation, Link } from "react-router-dom";
import { PATH } from "../routes/path";
import { logoDark, logoWhite } from "../assets";
import { useDispatch } from "react-redux";
import { showModal } from "../states/popUpSlice";

const AdminLayout = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-600" : "";
  };

  useEffect(() => {
    setIsUserMenuOpen(
      location.pathname === PATH.admin.users ||
      location.pathname === PATH.admin.manage
    );
  }, [location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(showModal({ content: "logout" }));
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 relative top-0 left-0 h-full">
        <img src={logoDark} alt="Logo" className="mb-6 h-12" />
        <nav>
          <ul>
            <li className={`mb-2 ${isActive(PATH.admin.dashboard)}`}>
              <a
                href={PATH.admin.dashboard}
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FiHome className="mr-2" /> Dashboard
              </a>
            </li>
            <li className="mb-2">
              <button
                onClick={toggleUserMenu}
                className={`flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded ${isActive(
                  PATH.admin.users || PATH.admin.manage
                )}`}
              >
                <span className="flex items-center">
                  <FiUsers className="mr-2" /> User
                </span>
                {isUserMenuOpen ? <FiChevronDown /> : <FiChevronRight />}
              </button>
              {isUserMenuOpen && (
                <ul className="ml-4 mt-2">
                  <li className={`mb-2 ${isActive(PATH.admin.users)}`}>
                    <a
                      href={PATH.admin.users}
                      className="flex items-center p-2 hover:bg-gray-700 rounded"
                    >
                      All Users
                    </a>
                  </li>
                  <li className={`mb-2 ${isActive(PATH.admin.manage)}`}>
                    <a
                      href={PATH.admin.manage}
                      className="flex items-center p-2 hover:bg-gray-700 rounded"
                    >
                      Manage Specialist
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className={`mb-2 ${isActive(PATH.admin.payments)}`}>
              <Link
                to={PATH.admin.payments}
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FiDollarSign className="mr-2" /> Payments
              </Link>
            </li>
            <li className={`mb-2 ${isActive(PATH.admin.calls)}`}>
              <Link
                to={PATH.admin.calls}
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FiPhone className="mr-2" /> Calls
              </Link>
            </li>
            <li className={`mb-2 ${isActive(PATH.admin.preference)}`}>
              <Link
                to={PATH.admin.preference}
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FiSettings className="mr-2" /> Preferences
              </Link>
            </li>
            <li className={`mb-2 ${isActive(PATH.admin.blogs)}`}>
              <Link
                to={PATH.admin.blogs}
                className="flex items-center p-2 hover:bg-gray-700 rounded"
              >
                <FiBook className="mr-2" /> Blogs
              </Link>
            </li>
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
