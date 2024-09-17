import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialistAppointments, updateAppointmentStatus } from '../../../states/appointmentSlice.js';

const SpecialistAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.list);

  useEffect(() => {
    dispatch(fetchSpecialistAppointments());
  }, [dispatch]);

  const handleStatusChange = (appointmentId, newStatus) => {
    dispatch(updateAppointmentStatus({ appointmentId, status: newStatus }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">My Appointments</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialistAppointments;
