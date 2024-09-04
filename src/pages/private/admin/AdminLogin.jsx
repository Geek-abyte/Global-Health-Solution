import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../../states/user/authSlice";
import { showToast } from "../../../states/popUpSlice";
import { PATH } from "../../../routes/path";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = { email: email, password: password, admin: true };
    dispatch(loginUser(values));
  };

  const handleNavigate = () => {
    navigate(PATH.admin.dashboard);
  };

  useEffect(() => {
    console.log("user:", user);
    console.log("is Auth:", isAuthenticated);

    if (isAuthenticated && user) {
      dispatch(showToast({ status: "success", message: "Login successful!" }));
      handleNavigate();
    }
    if (error) {
      // Dispatch the showToast action with the extracted message
      dispatch(showToast({ status: "error", message: error.message }));

      console.log(error);
    }
  }, [isAuthenticated, error, dispatch, user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FaUser className="inline mr-2" />
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FaLock className="inline mr-2" />
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <FaSignInAlt className="inline mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
