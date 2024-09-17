import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../../states/appointmentSlice';
import { Link } from 'react-router-dom';
import { PATH } from '../../../routes/path';

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.list);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">My Appointments</h2>
      <Link to={PATH.dashboard.createAppointment} className="bg-blue-500 text-white p-2 rounded mb-5 inline-block">
        Create New Appointment
      </Link>
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div key={appointment._id} className="border p-4 rounded">
            <h3 className="font-bold">{appointment.specialistId.firstName} {appointment.specialistId.lastName}</h3>
            <p>{new Date(appointment.dateTime).toLocaleString()}</p>
            <p>{appointment.status}</p>
            <p>{appointment.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
