import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSpecialists } from '../../../utils/adminRequest';
import SpecialistDetail from './SpecialistDetail';

const CreateAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpecialists = async () => {
      try {
        setLoading(true);
        const response = await fetchSpecialists();
        setSpecialists(response.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching specialists:', err);
        setError('Failed to fetch specialists');
        setLoading(false);
      }
    };

    getSpecialists();
  }, []);

  if (loading) {
    return <div>Loading specialists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Appointment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Select a Specialist</h3>
          <ul className="space-y-2">
            {specialists.map(specialist => (
              <li
                key={specialist._id}
                className={`p-2 border rounded cursor-pointer ${selectedSpecialist === specialist ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedSpecialist(specialist)}
              >
                {specialist.firstName} {specialist.lastName} - {specialist.specialistCategory}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {selectedSpecialist && (
            <SpecialistDetail specialist={selectedSpecialist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
