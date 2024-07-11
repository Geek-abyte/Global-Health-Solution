import React from 'react';
import { Link } from 'react-router-dom';
import { userImage } from '../../../assets';
import { Button } from '../../../components';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { PATH } from '../../../routes/path';

const PatientProfile = ({ className }) => {
  return (
    <main className={`main p-4 md:p-8 w-full ${className}`}>
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-primary-1 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img className="border-4 rounded-full w-24 h-24 md:w-32 md:h-32 border-white object-cover" src={userImage} alt="User" />
              <div className='flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-2xl md:text-3xl text-primary-7 mb-2'>West Brown</h1>
                <div className="text-primary-6 mb-4">Male</div>
                <Link to={PATH.dashboard.edit}>
                  <Button
                    background="bg-primary-6 hover:bg-primary-7 transition-colors"
                    borderRadius='rounded-full'
                    className='px-6 py-2 text-white'
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-primary-6">
              <div className="flex items-center gap-2"><IoLocationOutline className="text-xl" />Liverpool, England</div>
              <div className="flex items-center gap-2"><LuPhoneCall className="text-xl" />+44 345 678 85</div>
              <div className="flex items-center gap-2"><LuMail className="text-xl" />westbrown@mail.com</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard title="Personal Information">
          <InfoItem label="First Name" value="West" />
          <InfoItem label="Last Name" value="Brown" />
          <InfoItem label="Email" value="westbrown@mail.com" />
          <InfoItem label="Phone" value="+44 345 678 85" />
          <InfoItem label="Location" value="Liverpool, England" />
          <InfoItem label="Gender" value="Male" />
          <InfoItem label="Date of Birth" value="01/01/1980" />
        </InfoCard>

        <InfoCard title="Medical History">
          <InfoItem label="Allergies" value="None" />
          <InfoItem label="Current Medications" value="None" />
          <InfoItem label="Past Surgeries" value="Appendectomy (2010)" />
          <InfoItem label="Chronic Conditions" value="Hypertension" />
        </InfoCard>
      </div>

      <AppointmentCard title="Appointment History">
        <AppointmentItem date="05/05/2024" doctor="Dr. John Doe" reason="General Checkup" />
        <AppointmentItem date="10/12/2023" doctor="Dr. Jane Smith" reason="Blood Pressure Check" />
      </AppointmentCard>

      <AppointmentCard title="Upcoming Appointments">
        <AppointmentItem date="20/06/2024" doctor="Dr. Emma Brown" reason="Follow-up Consultation" />
      </AppointmentCard>
    </main>
  );
}

const InfoCard = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
    <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <p className="flex flex-col sm:flex-row sm:justify-between">
    <strong className="text-primary-6">{label}:</strong>
    <span className="text-gray-700">{value}</span>
  </p>
);

const AppointmentCard = ({ title, children }) => (
  <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
    <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const AppointmentItem = ({ date, doctor, reason }) => (
  <div className="border-b border-gray-200 py-4 last:border-b-0">
    <p><strong className="text-primary-6">Date:</strong> {date}</p>
    <p><strong className="text-primary-6">Doctor:</strong> {doctor}</p>
    <p><strong className="text-primary-6">Reason:</strong> {reason}</p>
  </div>
);

export default PatientProfile;