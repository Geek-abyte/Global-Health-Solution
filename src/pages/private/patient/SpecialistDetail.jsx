import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchAvailableSlots } from '../../../utils/api';

const SpecialistDetail = ({ specialist }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const slots = await fetchAvailableSlots(specialist._id, selectedDate);
      setAvailableSlots(slots);
    };
    fetchSlots();
  }, [specialist._id, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelection = (slot) => {
    navigate('/appointment-confirmation', { state: { slot, specialist } });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{specialist.firstName} {specialist.lastName}</h2>
      <p className="mb-2">{specialist.specialistCategory}</p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Consultation Types</h3>
        <ul>
          {specialist.consultationTypes.map(type => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Availability</h3>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Available Slots</h3>
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map(slot => (
            <button
              key={slot}
              onClick={() => handleSlotSelection(slot)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetail;