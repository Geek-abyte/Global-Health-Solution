import React, { useState } from 'react';
import { Button } from '../../../components';
import { userImage } from '../../../assets'; // Assuming this is the default user image
import { FaCamera } from 'react-icons/fa';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'West',
    lastName: 'Brown',
    email: 'westbrown@mail.com',
    phone: '+44 345 678 85',
    location: 'Liverpool, England',
    gender: 'Male',
    dateOfBirth: '1980-01-01',
    allergies: 'None',
    medications: 'None',
    surgeries: 'Appendectomy (2010)',
    conditions: 'Hypertension',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <main className="main p-[40px] w-full">
      <div className="bg-white shadow-lg rounded-lg p-[20px] border border-primary-2">
        <h2 className="text-[22px] font-bold mb-4 text-primary-7">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img 
                src={selectedImage || userImage} 
                alt="Profile" 
                className="border-4 rounded-full w-[150px] border-primary-2 mb-4" 
              />
              <label 
                htmlFor="imageUpload" 
                className="absolute bottom-0 right-0 bg-primary-6 p-2 rounded-full cursor-pointer hover:bg-primary-7 transition duration-200"
              >
                <FaCamera className="text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  id="imageUpload" 
                  onChange={handleImageChange} 
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-primary-6 font-semibold mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-primary-6 font-semibold mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-primary-6 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-primary-6 font-semibold mb-2">Phone</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="text-primary-6 font-semibold mb-2">Location</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-primary-6 font-semibold mb-2">Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="text-primary-6 font-semibold mb-2">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="allergies" className="text-primary-6 font-semibold mb-2">Allergies</label>
              <input 
                type="text" 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="medications" className="text-primary-6 font-semibold mb-2">Current Medications</label>
              <input 
                type="text" 
                name="medications" 
                value={formData.medications} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="surgeries" className="text-primary-6 font-semibold mb-2">Past Surgeries</label>
              <input 
                type="text" 
                name="surgeries" 
                value={formData.surgeries} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="conditions" className="text-primary-6 font-semibold mb-2">Chronic Conditions</label>
              <input 
                type="text" 
                name="conditions" 
                value={formData.conditions} 
                onChange={handleChange} 
                className="p-2 border border-primary-2 rounded"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Button type="submit" background="bg-primary-6" borderRadius='rounded-full'>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
