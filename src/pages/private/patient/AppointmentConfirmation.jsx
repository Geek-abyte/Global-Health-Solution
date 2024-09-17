import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createAppointment } from '../../../states/appointmentSlice';
import { useDispatch } from 'react-redux';

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slot, specialist } = location.state;

  const handleConfirm = async (payNow) => {
    const appointmentData = {
      specialistId: specialist.id,
      dateTime: slot,
      paymentStatus: payNow ? 'paid' : 'pending'
    };
    await dispatch(createAppointment(appointmentData));
    navigate('/appointments');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Appointment</h1>
      <div className="mb-4">
        <p><strong>Specialist:</strong> {specialist.name}</p>
        <p><strong>Date and Time:</strong> {new Date(slot).toLocaleString()}</p>
        <p><strong>Consultation Type:</strong> {specialist.consultationType}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleConfirm(true)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Pay Now
        </button>
        <button
          onClick={() => handleConfirm(false)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Pay Later
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;