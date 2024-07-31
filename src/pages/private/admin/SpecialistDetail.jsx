// SpecialistDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiFlag,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { LoadingAnimation } from "../../../components";
import axiosInstance from "../../../utils/axiosConfig";
import { PATH } from "../../../routes/path";
import { useDispatch } from "react-redux";
import { showToast } from "../../../states/popUpSlice";

const SpecialistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [specialist, setSpecialist] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  
  useEffect(() => {
    // Fetch specialist details from your API
    const fetchSpecialist = async () => {
      // Replace with your actual API call
      const response = await axiosInstance.get(`/admin/fetch-user/${id}`);
      const { data } = response;
      setSpecialist(data);
    };

    fetchSpecialist();
  }, [id]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await axiosInstance.patch(`/admin/approve-user/${id}`);
      dispatch(showToast({ type: 'success', message: 'Specialist approved successfully!' }));
      setTimeout(() => {
        navigate(PATH.admin.manageSpecialists);
      }, 2000);
    } catch (error) {
      dispatch(showToast({ type: 'error', message: 'Approval failed. Please try again.' }));
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    // Replace with your actual API call to reject the specialist
    await fetch(`/api/specialists/${id}/reject`, { method: "POST" });
    navigate("/admin/manage-specialists");
  };

  if (!specialist)
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <LoadingAnimation />
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Specialist Detail</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={specialist.profileImage || "https://via.placeholder.com/120"}
              alt={`${specialist.firstName} ${specialist.lastName}`}
              className="w-32 h-32 rounded-full mr-6 object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold">{`${specialist.firstName} ${specialist.lastName}`}</h2>
              <p className="text-xl text-gray-600">
                {specialist.specialistCategory}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <FiMail className="mr-2" /> {specialist.email}
              </p>
              <p className="flex items-center text-gray-600">
                <FiPhone className="mr-2" /> {specialist.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />{" "}
                {new Date(specialist.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="flex items-center text-gray-600">
                <FiMapPin className="mr-2" /> {specialist.address}
              </p>
              <p className="flex items-center text-gray-600">
                <FiFlag className="mr-2" /> {specialist.country}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Practicing License:</strong>{" "}
                {specialist.practicingLicense}
              </p>
              <p className="text-gray-600">
                <strong>Doctor Registration Number:</strong>{" "}
                {specialist.doctorRegistrationNumber}
              </p>
              <p className="text-gray-600">
                <strong>Gender:</strong> {specialist.gender}
              </p>
              <p className="text-gray-600">
                <strong>Email Verified:</strong>{" "}
                {specialist.isEmailVerified ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                <strong>Account Created:</strong>{" "}
                {new Date(specialist.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 p-6 bg-gray-50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-green-500 text-white rounded-md flex items-center"
            onClick={handleApprove}
          >
            <FiCheck className="mr-2" /> Approve
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-red-500 text-white rounded-md flex items-center"
            onClick={handleReject}
          >
            <FiX className="mr-2" /> Reject
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetail;
