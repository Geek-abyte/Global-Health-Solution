// ManageSpecialists.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchSpecialists } from "../../../utils/adminRequest";
import axiosInstance from "../../../utils/axiosConfig";
import { LoadingAnimation } from "../../../components";
import { PATH } from "../../../routes/path";

const ManageSpecialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axiosInstance.get("/admin/unapproved-specialists");
        setSpecialists(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <LoadingAnimation />
        <p className="text-xl font-semibold mt-4">Loading specialists...</p>
      </div>
    );
  }

  if (specialists.length === 0) {
    return (
      <motion.div
        className="p-6 bg-gray-100 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Manage Specialists</h1>
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FiUser className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            No Unapproved Specialists
          </h2>
          <p className="text-gray-600">
            There are currently no specialists waiting for approval. Check back
            later or add new specialists to the system.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Manage Specialists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialists?.map((specialist) => (
          <motion.div
            key={specialist._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={
                    specialist.profileImage || "https://via.placeholder.com/60"
                  }
                  alt={`${specialist.firstName} ${specialist.lastName}`}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{`${specialist.firstName} ${specialist.lastName}`}</h2>
                  <p className="text-gray-600">
                    {specialist.specialistCategory}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600">
                  <FiMail className="mr-2" /> {specialist.email}
                </p>
                <p className="flex items-center text-gray-600">
                  <FiPhone className="mr-2" /> {specialist.phone}
                </p>
                <p className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />{" "}
                  {new Date(specialist.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Link
              to={`${PATH.admin.specialist}/${specialist._id}`}
              className="block bg-blue-500 text-white text-center py-3 hover:bg-blue-600 transition-colors"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageSpecialists;
