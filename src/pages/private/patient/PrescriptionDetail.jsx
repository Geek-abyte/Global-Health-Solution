import React from 'react';

const PrescriptionDetail = ({ doctorName, doctorImage, prescription, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center mb-4">
        <img src={doctorImage} alt={doctorName} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <div className="text-lg font-semibold">{doctorName}</div>
          <div className="text-gray-500">Doctor</div>
        </div>
      </div>
      <div className="text-gray-700">{prescription}</div>
    </div>
  );
};

export default PrescriptionDetail;
