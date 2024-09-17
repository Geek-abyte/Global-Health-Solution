import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialistAppointments, updateAppointmentStatus } from '../../../states/appointmentSlice';

const AppointmentManagement = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.list);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchSpecialistAppointments());
  }, [dispatch]);

  const handleStatusChange = (appointmentId, newStatus) => {
    dispatch(updateAppointmentStatus({ appointmentId, status: newStatus }));
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    // Open reschedule modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div key={appointment._id} className="border p-4 rounded">
            <h3 className="font-bold">{appointment.userId.firstName} {appointment.userId.lastName}</h3>
            <p>{new Date(appointment.dateTime).toLocaleString()}</p>
            <p>{appointment.notes}</p>
            <select
              value={appointment.status}
              onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => handleReschedule(appointment)}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Reschedule
            </button>
          </div>
        ))}
      </div>
      {/* Add reschedule modal here */}
    </div>
  );
};

export default AppointmentManagement;