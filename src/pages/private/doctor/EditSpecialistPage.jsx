import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from '../../../states/user/authSlice';
import { Button } from '../../../components';
import { defaultUser } from '../../../assets';
import { FaCamera } from 'react-icons/fa';
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';
import { FaStethoscope } from 'react-icons/fa';


const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-6"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-6"
      />
    </div>
  );
};

const EditSpecialistProfile = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);
  const [editedUser, setEditedUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      setProfileImage(user.profileImage || defaultUser);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setEditedUser(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(editedUser));
    navigate('/profile'); // Redirect to profile page after update
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!editedUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className={`main p-4 md:p-8 w-full ${className}`}>
      <div className="mb-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-primary-1 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  className="border-4 rounded-full w-24 h-24 md:w-32 md:h-32 border-white object-cover"
                  src={profileImage}
                  alt="Specialist"
                />
                <button
                  className="absolute bottom-0 right-0 bg-primary-6 text-white p-2 rounded-full"
                  onClick={handleImageClick}
                >
                  <FaCamera />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className='flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-2xl md:text-3xl text-primary-7 mb-2'>{`${editedUser.firstName} ${editedUser.lastName}`}</h1>
                <div className="text-primary-6 mb-4">{editedUser.specialistCategory}</div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-primary-6">
              <div className="flex items-center gap-2"><IoLocationOutline className="text-xl" />{editedUser.location}</div>
              <div className="flex items-center gap-2"><LuPhoneCall className="text-xl" />{editedUser.phone}</div>
              <div className="flex items-center gap-2"><LuMail className="text-xl" />{editedUser.email}</div>
              <div className="flex items-center gap-2"><FaStethoscope className="text-xl" />{editedUser.isApproved ? 'Approved' : 'Pending Approval'}</div>
            </div>
          </div>
        </div>
      </div>

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
    </main>
  );
}

export default EditSpecialistProfile;