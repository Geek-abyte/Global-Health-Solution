import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiPhone,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { Outlet } from "react-router";
import { logoWhite } from "../assets";

const AdminLayout = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <img className="h-10 " src={logoWhite} alt="" />
        </div>
        <nav className="mt-8">
          <ul>
            <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
              <a className="flex items-center text-gray-700 hover:text-indigo-600">
                <FiHome className="mr-3" />
                Dashboard
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
              <div
                className="flex items-center justify-between text-gray-700 hover:text-indigo-600"
                onClick={toggleUserMenu}
              >
                <div className="flex items-center">
                  <FiUsers className="mr-3" />
                  User
                </div>
                {isUserMenuOpen ? <FiChevronDown /> : <FiChevronRight />}
              </div>
              {isUserMenuOpen && (
                <ul className="ml-6 mt-2">
                  <li className="py-1 hover:text-indigo-600">
                    <a>All Users</a>
                  </li>
                  <li className="py-1 hover:text-indigo-600">
                    <a>Manage Specialist</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
              <a className="flex items-center text-gray-700 hover:text-indigo-600">
                <FiDollarSign className="mr-3" />
                Payments
              </a>
            </li>
            <li className="px-4 py-2 hover:bg-indigo-50 cursor-pointer">
              <a className="flex items-center text-gray-700 hover:text-indigo-600">
                <FiPhone className="mr-3" />
                Calls
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
