import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from '../../../states/user/authSlice'; 
import { Button } from '../../../components';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { FaStethoscope } from 'react-icons/fa';
import { PATH } from '../../../routes/path';
import { defaultUser } from '../../../assets';

const SpecialistProfile = ({ className }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(editedUser));
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    background="bg-primary-6 hover:bg-primary-7 transition-colors"
                    borderRadius='rounded-full'
                    className='px-6 py-2 text-white'
                  >
                    Edit Profile
                  </Button>
                )}
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

      {isEditing ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Personal Information</h2>
            <div className="space-y-4">
              <InputField label="First Name" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
              <InputField label="Last Name" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
              <InputField label="Email" name="email" value={editedUser.email} onChange={handleInputChange} type="email" />
              <InputField label="Phone" name="phone" value={editedUser.phone} onChange={handleInputChange} />
              <InputField label="Location" name="location" value={editedUser.location} onChange={handleInputChange} />
              <SelectField label="Gender" name="gender" value={editedUser.gender} onChange={handleInputChange} options={['Male', 'Female', 'Other']} />
              <InputField label="Date of Birth" name="dateOfBirth" value={editedUser.dateOfBirth} onChange={handleInputChange} type="date" />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Professional Information</h2>
            <div className="space-y-4">
              <InputField label="Specialist Category" name="specialistCategory" value={editedUser.specialistCategory} onChange={handleInputChange} />
              <InputField label="Certifications" name="certifications" value={editedUser.certifications} onChange={handleInputChange} />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <Button
              type="submit"
              background="bg-primary-6 hover:bg-primary-7 transition-colors"
              borderRadius='rounded-full'
              className='px-6 py-2 text-white'
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
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
      )}
    </main>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-primary-6">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-primary-6">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

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