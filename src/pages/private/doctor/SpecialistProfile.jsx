import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from '../../../states/user/authSlice';
import { Button } from '../../../components';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { FaStethoscope } from 'react-icons/fa';
import { defaultUser } from '../../../assets';
import { PATH } from '../../../routes/path';

const SpecialistProfile = ({ className }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <main className={`main p-4 md:p-8 w-full ${className}`}>
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-primary-1 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img className="border-4 rounded-full w-24 h-24 md:w-32 md:h-32 border-white object-cover" src={user.profileImage || defaultUser} alt="Specialist" />
              <div className='flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-2xl md:text-3xl text-primary-7 mb-2'>{`${user.firstName} ${user.lastName}`}</h1>
                <div className="text-primary-6 mb-4">{user.specialistCategory}</div>
                <Link to={PATH.doctor.edit}>
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
              <div className="flex items-center gap-2"><IoLocationOutline className="text-xl" />{user.location}</div>
              <div className="flex items-center gap-2"><LuPhoneCall className="text-xl" />{user.phone}</div>
              <div className="flex items-center gap-2"><LuMail className="text-xl" />{user.email}</div>
              <div className="flex items-center gap-2"><FaStethoscope className="text-xl" />{user.isApproved ? 'Approved' : 'Pending Approval'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard title="Personal Information">
          <InfoItem label="First Name" value={user.firstName} />
          <InfoItem label="Last Name" value={user.lastName} />
          <InfoItem label="Email" value={user.email} />
          <InfoItem label="Phone" value={user.phone} />
          <InfoItem label="Location" value={user.location} />
          <InfoItem label="Gender" value={user.gender} />
          <InfoItem label="Date of Birth" value={user.dateOfBirth} />
        </InfoCard>

        <InfoCard title="Professional Information">
          <InfoItem label="Specialist Category" value={user.specialistCategory} />
          <InfoItem label="Certifications" value={user.certifications} />
          <InfoItem label="Approval Status" value={user.isApproved ? 'Approved' : 'Pending Approval'} />
          <InfoItem label="Online Status" value={user.isOnline ? 'Online' : 'Offline'} />
        </InfoCard>
      </div>
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

export default SpecialistProfile;