import React, { useState, useEffect } from 'react';
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
  const { user, loading, error } = useSelector((state) => state.auth);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    gender: "",
    dateOfBirth: "",
    specialistCategory: "",
    certifications: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserProfile()).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("User data received:", user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        specialistCategory: user.specialistCategory || "",
        certifications: user.certifications || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("Image selected:", file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (selectedImage) {
      formDataToSend.append("profileImage", selectedImage);
    }

    try {
      const response = await dispatch(updateUserProfile(formDataToSend)).unwrap();
      console.log("Profile update response:", response);
      navigate('/profile'); // Redirect to profile page after update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center py-8">No user data available.</div>;
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
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : user?.profileImage ? `${apiUrl}${user.profileImage}` : defaultUser
                  }
                  alt="Specialist"
                  crossOrigin="anonymous"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-primary-6 text-white p-2 rounded-full cursor-pointer"
                >
                  <FaCamera />
                  <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className='flex flex-col items-center md:items-start'>
                <h1 className='font-bold text-2xl md:text-3xl text-primary-7 mb-2'>{`${formData.firstName} ${formData.lastName}`}</h1>
                <div className="text-primary-6 mb-4">{formData.specialistCategory}</div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-base">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-primary-6">
              <div className="flex items-center gap-2"><IoLocationOutline className="text-xl" />{formData.location}</div>
              <div className="flex items-center gap-2"><LuPhoneCall className="text-xl" />{formData.phone}</div>
              <div className="flex items-center gap-2"><LuMail className="text-xl" />{formData.email}</div>
              <div className="flex items-center gap-2"><FaStethoscope className="text-xl" />{user?.isApproved ? 'Approved' : 'Pending Approval'}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Personal Information</h2>
          <div className="space-y-4">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <InputField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary-7">Professional Information</h2>
          <div className="space-y-4">
            <InputField label="Specialist Category" name="specialistCategory" value={formData.specialistCategory} onChange={handleChange} />
            <InputField label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} />
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