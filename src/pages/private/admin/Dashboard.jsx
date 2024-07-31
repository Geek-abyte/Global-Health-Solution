import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiUsers,
  FiPhone,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../../../utils/axiosConfig";
import { PATH } from "../../../routes/path";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [isUnapprovedUsers, setIsUnapprovedUsers] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Sample data for charts
  const userChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Patients",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Specialists",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const callChartData = {
    labels: ["Completed", "Missed", "Scheduled"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const CardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchUnapprovedUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/check-unapproved");
        console.log('milipede')
        setIsUnapprovedUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnapprovedUsers()
  }, []);

  const NotificationBar = () => (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 relative"
        >
          <div className="flex items-center">
            <FiAlertCircle className="text-2xl mr-2" />
            <p>
              <strong>Attention:</strong> There are unapproved registered
              specialists waiting for review.
              <a
                href={PATH.admin.manage}
                className="ml-2 text-blue-500 hover:text-blue-700 underline"
              >
                see unapproved users
              </a>
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-0 right-0 mt-2 mr-2 text-yellow-700 hover:text-yellow-900"
          >
            <FiX />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {isUnapprovedUsers && <NotificationBar />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          variants={CardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <FiUsers className="text-2xl text-blue-500" />
          </div>
          <p className="text-3xl font-bold">12,345</p>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <FiArrowUp className="mr-1" /> 5.3% from last month
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          variants={CardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Calls</h2>
            <FiPhone className="text-2xl text-green-500" />
          </div>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-red-500 flex items-center mt-2">
            <FiArrowDown className="mr-1" /> 2.1% from last month
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          variants={CardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <FiDollarSign className="text-2xl text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">$98,765</p>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <FiArrowUp className="mr-1" /> 8.7% from last month
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          variants={CardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Avg. Call Duration</h2>
            <FiPhone className="text-2xl text-purple-500" />
          </div>
          <p className="text-3xl font-bold">18:30</p>
          <p className="text-sm text-gray-500 mt-2">minutes</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <Line data={userChartData} options={{ responsive: true }} />
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Call Distribution</h2>
          <Doughnut data={callChartData} options={{ responsive: true }} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
