import React, { useState } from 'react';
import { Button } from '../../../components';
import { userImage } from '../../../assets';
import { FaCamera, FaPlus, FaTrash } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

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
    surgeries: ['Appendectomy (2010)'],
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
    console.log('Form submitted:', formData);
  };

  const addSurgery = () => {
    setFormData({ ...formData, surgeries: [...formData.surgeries, ''] });
  };

  const removeSurgery = (index) => {
    const newSurgeries = formData.surgeries.filter((_, i) => i !== index);
    setFormData({ ...formData, surgeries: newSurgeries });
  };

  const updateSurgery = (index, value) => {
    const newSurgeries = [...formData.surgeries];
    newSurgeries[index] = value;
    setFormData({ ...formData, surgeries: newSurgeries });
  };

  return (
    <main className="main p-4 md:p-8 w-full">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-primary-2">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-7">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img 
                src={selectedImage || userImage} 
                alt="Profile" 
                className="border-4 rounded-full w-32 h-32 object-cover border-primary-2 mb-4" 
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            <InputField label="Allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
            <InputField label="Current Medications" name="medications" value={formData.medications} onChange={handleChange} />
            <InputField label="Chronic Conditions" name="conditions" value={formData.conditions} onChange={handleChange} />
          </div>
          
          <div className="space-y-4">
            <label className="block text-primary-6 font-semibold">Past Surgeries</label>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <IoMdInformationCircleOutline className="mr-2" />
              <span>Format: Surgery Name (Year) - e.g., Appendectomy (2010)</span>
            </div>
            {formData.surgeries.map((surgery, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={surgery}
                  onChange={(e) => updateSurgery(index, e.target.value)}
                  className="flex-grow p-2 border border-primary-2 rounded"
                  placeholder="e.g., Appendectomy (2010)"
                />
                <button
                  type="button"
                  onClick={() => removeSurgery(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSurgery}
              className="flex items-center text-primary-6 hover:text-primary-7"
            >
              <FaPlus className="mr-2" /> Add Surgery
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <Button type="submit" background="bg-primary-6 hover:bg-primary-7 transition-colors" borderRadius='rounded-full' className="px-8 py-3 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-primary-6 font-semibold mb-2">{label}</label>
    <input 
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="p-2 border border-primary-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-6"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-primary-6 font-semibold mb-2">{label}</label>
    <select 
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="p-2 border border-primary-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-6"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default EditProfile;