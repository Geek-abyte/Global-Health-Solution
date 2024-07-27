import React from 'react';
import { doctor3 } from '../../assets';
import { SignInForm } from '../../components';
import { Link } from 'react-router-dom';
import { PATH } from '../../routes/path';

const SpecialistSignIn = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 hidden lg:block">
            <img 
              src={doctor3} 
              alt="Medical equipment" 
              className="w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
              Specialist Portal
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Sign in to access your healthcare professional account
            </p>
            <SignInForm specialist/>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Not a healthcare specialist?{' '}
                <Link to={PATH.general.signIn} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in as a patient
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpecialistSignIn;