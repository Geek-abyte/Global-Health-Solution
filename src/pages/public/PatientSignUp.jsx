import React from 'react';
import { doctors, logoWhite } from '../../assets';
import { SignUpForm } from '../../components';

const PatientSignUp = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block md:w-1/2 sticky top-0 left-0 h-screen">
        <div className="h-full flex items-center justify-center p-8">
          <img
            src={doctors}
            alt="Image of doctors"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      <main className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <img
          src={logoWhite}
          alt="Logo"
          className="w-40 mb-8 md:hidden"
        />
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </main>
    </div>
  );
};

export default PatientSignUp;