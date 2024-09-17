import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationAsRead } from '../states/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.list);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  return (
    <div className="fixed top-5 right-5 w-64">
      {notifications.map(notification => (
        <div key={notification._id} className="bg-white border p-2 mb-2 rounded shadow">
          <p>{notification.message}</p>
          <button
            onClick={() => handleMarkAsRead(notification._id)}
            className="text-sm text-blue-500"
          >
            Mark as read
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
