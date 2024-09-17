import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../states/popUpSlice';
import axiosInstance from '../utils/axiosConfig';
import { FaUserMd, FaCalendarAlt, FaStar, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FindSpecialistModal = ({ category, closeModal, setTheSpecialist }) => {
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  useEffect(() => {
    const fetchAvailableSpecialist = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/specialists/available/${category}`);
        setSpecialist(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching available specialist:', err);
        setError('Failed to find an available specialist');
        setLoading(false);
      }
    };

    fetchAvailableSpecialist();
  }, [category]);

  const handleCallSpecialist = () => {
    closeModal();
    setTheSpecialist(specialist);
    dispatch(showModal({ content: "pricingModal", }));
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-auto relative"
    >
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <FaTimes className="text-xl" />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Specialist</h2>
      {specialist ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <img
              src={specialist.profileImage || "https://via.placeholder.com/150"}
              alt={`${specialist.firstName} ${specialist.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800">{`${specialist.firstName} ${specialist.lastName}`}</h3>
            <p className="text-blue-600 font-medium">{specialist.specialistCategory}</p>
          </div>
          <div className="space-y-2">
            {specialist.yearsOfExperience && (
              <div className="flex items-center">
                <FaUserMd className="text-blue-500 mr-2" />
                <p><strong>Experience:</strong> {specialist.yearsOfExperience} years</p>
              </div>
            )}
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <p><strong>Availability:</strong> Now</p>
            </div>
            {specialist.rating && (
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                <p><strong>Rating:</strong> {specialist.rating}/5</p>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCallSpecialist}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Call this Specialist
          </motion.button>
        </div>
      ) : (
        <p className="text-center text-gray-600">No specialists available at the moment. Please try again later.</p>
      )}
    </motion.div>
  );
};

export default FindSpecialistModal;