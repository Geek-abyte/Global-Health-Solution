import React, { useEffect, useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../states/user/authSlice";
import axiosInstance from "../../../utils/axiosConfig";
import { Link } from "react-router-dom";
import { PATH } from "../../../routes/path";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isOnline, setIsOnline] = useState(user?.isOnline ?? false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      message:
        "New Appointment Request: John Doe has requested an appointment on June 7, 2024.",
    },
    {
      id: 2,
      type: "system-update",
      message: "System Update: New features have been added to the dashboard.",
    },
  ]);

  const toggleOnlineStatus = async () => {
    try {
      const response = await axiosInstance.put("/users/availability");
      setIsOnline(response.data.isOnline);
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("Failed to update online status:", error);
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user) {
      setIsOnline(user.isOnline);
    }
  }, [user]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary-5">Doctor Dashboard</h1>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white ${isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            onClick={toggleOnlineStatus}
          >
            <span>{isOnline ? "Online" : "Offline"}</span>
            {isOnline ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.length === 0 ? (
              <p className="text-gray-600">No new notifications</p>
            ) : (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 rounded-md ${notification.type === "appointment"
                      ? "bg-blue-100"
                      : "bg-yellow-100"
                      }`}
                  >
                    <p className="text-lg font-medium">{notification.message}</p>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      Dismiss
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Upcoming Appointments */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <ul className="space-y-4">
              {/* Sample appointments */}
              <li className="p-4 bg-gray-50 rounded-md">
                <p className="text-lg font-medium">John Doe</p>
                <p>June 5, 2024 at 3:00 PM</p>
              </li>
              <li className="p-4 bg-gray-50 rounded-md">
                <p className="text-lg font-medium">Jane Smith</p>
                <p>June 6, 2024 at 10:00 AM</p>
              </li>
              {/* Add more appointments here */}
            </ul>
          </section>

          {/* Recent Calls */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
            <ul className="space-y-4">
              {/* Sample call logs */}
              <li className="p-4 bg-gray-50 rounded-md">
                <p className="text-lg font-medium">John Doe</p>
                <p>June 3, 2024 at 2:00 PM</p>
              </li>
              <li className="p-4 bg-gray-50 rounded-md">
                <p className="text-lg font-medium">Jane Smith</p>
                <p>June 2, 2024 at 1:00 PM</p>
              </li>
              {/* Add more call logs here */}
            </ul>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <Link to={PATH.doctor.appointments} className="text-blue-600 hover:underline">
              View All Appointments
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default DoctorDashboard;
