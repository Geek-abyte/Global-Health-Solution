import React from 'react';
import { defaultUser } from '../../../assets';

const PrescriptionDetail = ({ prescription, className }) => {
  const { medication, dosage, frequency, startDate, endDate, specialistId } = prescription;
  const doctorName = specialistId ? `${specialistId.firstName} ${specialistId.lastName}` : 'Unknown Doctor';
  const doctorImage = specialistId?.profileImage || defaultUser;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
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
        <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
