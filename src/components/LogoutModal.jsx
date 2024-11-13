import React from "react";
import { hideModal } from "../states/popUpSlice";
import { logout } from "../states/user/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { PATH } from "../routes/path";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmLogout = () => {
    dispatch(logout());
    dispatch(hideModal());
    navigate(PATH.general.home);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />

      {/* Modal Content */}
      <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl transition-all sm:max-w-md w-full mx-4 sm:mx-0">
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={() => dispatch(hideModal())}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="h-6 w-6 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Animated Logout Icon */}
            <div className="mb-4 p-3 rounded-full bg-red-50 dark:bg-red-900/20">
              <svg
                className="w-12 h-12 text-red-500 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sign Out?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={confirmLogout}
                className="w-full px-6 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-transform hover:scale-105"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => dispatch(hideModal())}
                className="w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform transition-transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
