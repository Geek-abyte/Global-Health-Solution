import React from 'react';
import { doctors2 } from '../../assets';
import { SignInForm } from '../../components';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 hidden lg:block">
            <img 
              src={doctors2} 
              alt="Healthcare professionals" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please sign in to access your account
            </p>
            <SignInForm client />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Are you a healthcare specialist?{' '}
                <Link to="/specialist-signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;