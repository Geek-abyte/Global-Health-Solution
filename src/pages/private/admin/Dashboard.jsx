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
import LoadingAnimation from "../../../components/LoadingAnimation";

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
  const [paymentStats, setPaymentStats] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    monthlyRevenue: [],
    paymentDistribution: {
      succeeded: 0,
      failed: 0,
      pending: 0
    }
  });
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    userGrowth: 0,
    monthlyUsers: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Sample data for charts
  const userChartData = {
    labels: userStats.monthlyUsers.map(item => {
      const [year, month] = item.month.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
    }),
    datasets: [
      {
        label: "Patients",
        data: userStats.monthlyUsers.map(item => item.patients),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Specialists",
        data: userStats.monthlyUsers.map(item => item.specialists),
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

  // Update the payment chart data
  const paymentChartData = {
    labels: paymentStats.monthlyRevenue.map(item => {
      const [year, month] = item.month.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
    }).reverse(),
    datasets: [
      {
        label: "Monthly Revenue",
        data: paymentStats.monthlyRevenue.map(item => item.total / 100).reverse(),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Update the payment distribution data
  const paymentDistributionData = {
    labels: ["Successful", "Failed", "Pending"],
    datasets: [
      {
        data: [
          paymentStats.paymentDistribution.succeeded,
          paymentStats.paymentDistribution.failed,
          paymentStats.paymentDistribution.pending
        ],
        backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
        hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
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
        setIsUnapprovedUsers(response.data.hasUnapprovedUsers);
      } catch (error) {
        console.error("Error fetching unapproved users:", error);
        setIsUnapprovedUsers(false);
      }
    };

    const fetchPaymentStats = async () => {
      try {
        const response = await axiosInstance.get("/payment/admin/dashboard-stats");
        setPaymentStats(response.data);
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      }
    };

    const fetchUserStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/dashboard-stats");
        setUserStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    Promise.all([
      fetchUnapprovedUsers(),
      fetchPaymentStats(),
      fetchUserStats()
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <LoadingAnimation />
      <p className="text-xl font-semibold mt-4">Loading dashboard...</p>
    </div>
  );

  const NotificationBar = () => (
    <AnimatePresence>
      {showNotification && isUnapprovedUsers && (
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

      <NotificationBar />

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
          <p className="text-3xl font-bold">{userStats.totalUsers.toLocaleString()}</p>
          <p className={`text-sm flex items-center mt-2 ${userStats.userGrowth >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
            {userStats.userGrowth >= 0 ? (
              <FiArrowUp className="mr-1" />
            ) : (
              <FiArrowDown className="mr-1" />
            )}
            {Math.abs(userStats.userGrowth)}% from last month
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
          <p className="text-3xl font-bold">
            ${(paymentStats.totalRevenue / 100).toLocaleString()}
          </p>
          <p className={`text-sm flex items-center mt-2 ${paymentStats.revenueChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
            {paymentStats.revenueChange >= 0 ? (
              <FiArrowUp className="mr-1" />
            ) : (
              <FiArrowDown className="mr-1" />
            )}
            {Math.abs(paymentStats.revenueChange)}% from last month
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 min-h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6">User Growth</h2>
          <div className="h-[300px]">
            <Line
              data={userChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.dataset.label || '';
                        return `${label}: ${context.parsed.y} users`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 min-h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6">Revenue Trend</h2>
          <div className="h-[300px]">
            <Line
              data={paymentChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `Revenue: $${context.parsed.y.toLocaleString()}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value.toLocaleString()}`
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 min-h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6">Call Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={callChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 min-h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6">Payment Status Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={paymentDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20
                    }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
