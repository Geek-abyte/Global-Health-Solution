import React from 'react';
import { defaultUser } from '../assets';

const PrescriptionCard = ({ prescription, className, onClick }) => {
  const { medication, dosage, frequency, specialistId } = prescription;
  const doctorName = specialistId ? `${specialistId.firstName} ${specialistId.lastName}` : 'Unknown Doctor';
  const doctorImage = specialistId?.profileImage || defaultUser;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${className}`} onClick={onClick}>
      <div className="flex items-center mb-4">
        <img src={doctorImage} alt={doctorName} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <div className="text-lg font-semibold">{doctorName}</div>
          <div className="text-gray-500">{specialistId?.specialistCategory || 'Doctor'}</div>
        </div>
      </div>
      <div className="text-gray-700">
        <p><strong>Medication:</strong> {medication}</p>
        <p><strong>Dosage:</strong> {dosage}</p>
        <p><strong>Frequency:</strong> {frequency}</p>
      </div>
    </div>
  );
};

export default PrescriptionCard;

