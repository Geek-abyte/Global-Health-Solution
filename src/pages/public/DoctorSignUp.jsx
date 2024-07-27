import React from 'react';
import { doctorsBlue, logoDark, logoWhite } from '../../assets';
import { SpecialistSignUpForm } from '../../components';

const DoctorSignUp = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-primary-7">
      <div className="hidden md:block md:w-1/2 sticky top-0 left-0 h-screen ">
        <div className="h-full flex items-center justify-center p-8">
          <img
            src={doctorsBlue}
            alt="Image of doctors"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      <main className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <img
          src={logoDark}
          alt="Logo"
          className="w-40 mb-8 md:hidden"
        />
        <div className="w-full max-w-md">
          <SpecialistSignUpForm />
        </div>
      </main>
    </div>
  );
};

export default DoctorSignUp;