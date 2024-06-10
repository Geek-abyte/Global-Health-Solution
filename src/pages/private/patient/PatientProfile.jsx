import React from 'react';
import { Link } from 'react-router-dom';
import { userImage } from '../../../assets';
import { Button } from '../../../components';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { PATH } from '../../../routes/path';

const PatientProfile = ({ className }) => {
  return (
    <main className={`main p-[40px] w-full ${className}`}>
      <div className="top mb-8">
        <div className="card flex flex-col md:flex-row bg-primary-1 shadow-lg rounded-lg p-[20px]">
          <div className="right flex flex-col md:flex-row gap-[20px] p-[20px]">
            <img className="border-4 rounded-full w-[100px] border-white" src={userImage} alt="User" />
            <div className='flex justify-center items-start flex-col'>
              <p className='font-bold text-[25px] text-primary-7'>West Brown</p>
              <div className="gender font-semibold text-primary-6">Male</div>
              <Link to={PATH.dashboard.edit}>
                <Button
                  background="bg-primary-6"
                  borderRadius='rounded-full'
                  className='mt-4'
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="left border-t-2 md:border-t-0 md:border-l-2 border-primary-2 font-bold text-[18px] text-primary-7 flex flex-col md:flex-row gap-[20px] p-[20px] justify-center items-center">
            <div className="location flex flex-row gap-2 justify-center items-center text-primary-6"><IoLocationOutline />Liverpool, England</div>
            <div className="number flex flex-row gap-2 justify-center items-center text-primary-6"><LuPhoneCall />+44 345 678 85</div>
            <div className="email flex flex-row gap-2 justify-center items-center text-primary-6"><LuMail />westbrown@mail.com</div>
          </div>
        </div>
      </div>

      <div className="info grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="personal-info bg-white shadow-lg rounded-lg p-[20px] border border-primary-2">
          <h2 className="text-[22px] font-bold mb-4 text-primary-7">Personal Information</h2>
          <p><strong className="text-primary-6">First Name:</strong> West</p>
          <p><strong className="text-primary-6">Last Name:</strong> Brown</p>
          <p><strong className="text-primary-6">Email:</strong> westbrown@mail.com</p>
          <p><strong className="text-primary-6">Phone:</strong> +44 345 678 85</p>
          <p><strong className="text-primary-6">Location:</strong> Liverpool, England</p>
          <p><strong className="text-primary-6">Gender:</strong> Male</p>
          <p><strong className="text-primary-6">Date of Birth:</strong> 01/01/1980</p>
        </div>

        <div className="medical-history bg-white shadow-lg rounded-lg p-[20px] border border-primary-2">
          <h2 className="text-[22px] font-bold mb-4 text-primary-7">Medical History</h2>
          <p><strong className="text-primary-6">Allergies:</strong> None</p>
          <p><strong className="text-primary-6">Current Medications:</strong> None</p>
          <p><strong className="text-primary-6">Past Surgeries:</strong> Appendectomy (2010)</p>
          <p><strong className="text-primary-6">Chronic Conditions:</strong> Hypertension</p>
        </div>
      </div>

      <div className="appointments mt-8 bg-white shadow-lg rounded-lg p-[20px] border border-primary-2">
        <h2 className="text-[22px] font-bold mb-4 text-primary-7">Appointment History</h2>
        <div className="appointment-list">
          <div className="appointment border-b border-gray-200 py-4">
            <p><strong className="text-primary-6">Date:</strong> 05/05/2024</p>
            <p><strong className="text-primary-6">Doctor:</strong> Dr. John Doe</p>
            <p><strong className="text-primary-6">Reason:</strong> General Checkup</p>
          </div>
          <div className="appointment border-b border-gray-200 py-4">
            <p><strong className="text-primary-6">Date:</strong> 10/12/2023</p>
            <p><strong className="text-primary-6">Doctor:</strong> Dr. Jane Smith</p>
            <p><strong className="text-primary-6">Reason:</strong> Blood Pressure Check</p>
          </div>
        </div>
      </div>

      <div className="upcoming-appointments mt-8 bg-white shadow-lg rounded-lg p-[20px] border border-primary-2">
        <h2 className="text-[22px] font-bold mb-4 text-primary-7">Upcoming Appointments</h2>
        <div className="appointment-list">
          <div className="appointment border-b border-gray-200 py-4">
            <p><strong className="text-primary-6">Date:</strong> 20/06/2024</p>
            <p><strong className="text-primary-6">Doctor:</strong> Dr. Emma Brown</p>
            <p><strong className="text-primary-6">Reason:</strong> Follow-up Consultation</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PatientProfile;
