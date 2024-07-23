import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userImage } from '../../../assets';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { FaStethoscope } from 'react-icons/fa';
import { PATH } from '../../../routes/path';

const SpecialistProfile = ({ className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [specialist, setSpecialist] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'janesmith@example.com',
    phone: '+44 123 456 789',
    address: 'London, England',
    gender: 'Female',
    dateOfBirth: '1985-05-15',
    specialistCategory: 'Cardiologist',
    certifications: 'Board Certified in Cardiology',
    isApproved: true,
    isOnline: true,
  });

  const handleInputChange = (e) => {
    setSpecialist({ ...specialist, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log('Updated specialist data:', specialist);
    setIsEditing(false);
  };

  return (
    <main className={`main p-4 md:p-8 w-full ${className}`}>
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-primary-1 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img className="border-4 rounded-full w-24 h-24 md:w-32 md:h-32 border-white object-cover" src={userImage} alt="Specialist" />
              <div className='flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-2xl md:text-3xl text-primary-7 mb-2'>{`${specialist.firstName} ${specialist.lastName}`}</h1>
                <div className="text-primary-6 mb-4">{specialist.specialistCategory}</div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary-6 hover:bg-primary-7 text-white px-6 py-2 rounded-full transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-primary-6">
              <div className="flex items-center gap-2"><IoLocationOutline className="text-xl" />{specialist.address}</div>
              <div className="flex items-center gap-2"><LuPhoneCall className="text-xl" />{specialist.phone}</div>
              <div className="flex items-center gap-2"><LuMail className="text-xl" />{specialist.email}</div>
              <div className="flex items-center gap-2"><FaStethoscope className="text-xl" />{specialist.isApproved ? 'Approved' : 'Pending Approval'}</div>
            </div>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-1 text-primary-6">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={specialist.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-1 text-primary-6">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={specialist.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-primary-6">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={specialist.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1 text-primary-6">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={specialist.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="mb-1 text-primary-6">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={specialist.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-1 text-primary-6">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={specialist.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dateOfBirth" className="mb-1 text-primary-6">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={specialist.dateOfBirth}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Professional Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="specialistCategory" className="mb-1 text-primary-6">Specialist Category</label>
                <input
                  type="text"
                  id="specialistCategory"
                  name="specialistCategory"
                  value={specialist.specialistCategory}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="certifications" className="mb-1 text-primary-6">Certifications</label>
                <input
                  type="text"
                  id="certifications"
                  name="certifications"
                  value={specialist.certifications}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-6"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-primary-6 hover:bg-primary-7 text-white px-6 py-2 rounded-full transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard title="Personal Information">
            <InfoItem label="First Name" value={specialist.firstName} />
            <InfoItem label="Last Name" value={specialist.lastName} />
            <InfoItem label="Email" value={specialist.email} />
            <InfoItem label="Phone" value={specialist.phone} />
            <InfoItem label="Address" value={specialist.address} />
            <InfoItem label="Gender" value={specialist.gender} />
            <InfoItem label="Date of Birth" value={specialist.dateOfBirth} />
          </InfoCard>

          <InfoCard title="Professional Information">
            <InfoItem label="Specialist Category" value={specialist.specialistCategory} />
            <InfoItem label="Certifications" value={specialist.certifications} />
            <InfoItem label="Approval Status" value={specialist.isApproved ? 'Approved' : 'Pending Approval'} />
            <InfoItem label="Online Status" value={specialist.isOnline ? 'Online' : 'Offline'} />
          </InfoCard>
        </div>
      )}
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