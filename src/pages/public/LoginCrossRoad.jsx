import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUser } from 'react-icons/fa';
import { PATH } from '../../routes/path';

const LoginCrossroad = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 py-12 sm:py-16">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to HealthCare Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please select your role to proceed
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Link
              to="/specialist-signin"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserMd className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
              </span>
              I'm a Healthcare Specialist
            </Link>
            <Link
              to={PATH.general.loginCrossroad}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-teal-500 group-hover:text-teal-400" aria-hidden="true" />
              </span>
              I'm a client
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginCrossroad;