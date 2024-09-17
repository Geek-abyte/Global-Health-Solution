import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { defaultUser } from "../../../assets";
import { FaCamera } from "react-icons/fa";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../states/user/authSlice";

const EditProfile = () => {
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
    allergies: "",
    medications: "",
    surgeries: [],
    conditions: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        allergies: user.allergies || "",
        medications: user.medications || "",
        surgeries: user.surgeries || [],
        conditions: user.conditions || "",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

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

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key !== 'surgeries') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Handle surgeries array separately
    if (Array.isArray(formData.surgeries)) {
      formData.surgeries.forEach((surgery, index) => {
        formDataToSend.append(`surgeries[${index}]`, surgery);
      });
    }

    // Explicitly handle the profile image
    if (selectedImage) {
      formDataToSend.append("profileImage", selectedImage);
    }

    console.log("see the form", formDataToSend);

    try {
      const response = await dispatch(
        updateUserProfile(formDataToSend)
      ).unwrap();
      console.log("Profile update response:", response);
      // Handle successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="main p-4 md:p-8 w-full">
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
                  alt="User"
                  crossOrigin="anonymous"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer"
                >
                  <FaCamera className="text-primary-6" />
                  <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <h1 className="font-bold text-2xl md:text-3xl text-primary-7 mb-2">
                  {formData.firstName} {formData.lastName}
                </h1>
                <div className="text-primary-6 mb-4">{formData.gender}</div>
                <Button
                  background="bg-primary-6 hover:bg-primary-7 transition-colors"
                  borderRadius="rounded-full"
                  className="px-6 py-2 text-white"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
                <Button
                  background="bg-gray-300 hover:bg-gray-400 transition-colors"
                  borderRadius="rounded-full"
                  className="px-6 py-2 text-gray-700 mt-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <form
            className="p-6 md:p-8 text-sm md:text-base"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-2 text-primary-6">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">
                  Current Medications
                </label>
                <input
                  type="text"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-primary-6">
                  Chronic Conditions
                </label>
                <input
                  type="text"
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
