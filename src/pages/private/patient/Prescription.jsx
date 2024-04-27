import React, { useState } from 'react'
import PrescriptionCard from '../../../components/PrescriptionCard';
import { prescriptions } from '../../../data/cards';
import PrescriptionDetail from './PrescriptionDetail';

const Prescription = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handleCardClick = (prescription) => {
    setSelectedPrescription(prescription);
  };

  return (
    <div className="relative flex">
      <div className="w-1/2 p-4 flex gap-4 flex-col">
        {prescriptions.map((prescription) => (
          <PrescriptionCard
            key={prescription.id}
            {...prescription}
            className={prescription === selectedPrescription && 'bg-primary-2'}
            onClick={() => handleCardClick(prescription)}
          />
        ))}
      </div>
      <div className="w-1/2 p-4">
        {selectedPrescription ? 
          <PrescriptionDetail {...selectedPrescription} className='sticky top-4 min-h-[50%]' /> :
          <div className={`bg-white rounded-lg shadow-md p-4 cursor-pointer flex justify-center items-center`}>
            
          </div>  
        }
      </div>
    </div>
  );
};

export default Prescription