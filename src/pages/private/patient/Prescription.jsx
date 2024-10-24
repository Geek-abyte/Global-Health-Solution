import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrescriptionCard from '../../../components/PrescriptionCard';
import PrescriptionDetail from './PrescriptionDetail';
import { PiNotepadThin } from 'react-icons/pi';
import { fetchPrescriptions } from '../../../states/medicalFileSlice';
import { FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

const Prescription = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { medicalFile, loading, error } = useSelector((state) => state.medicalFile);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        try {
          await dispatch(fetchPrescriptions(user._id)).unwrap();
        } catch (err) {
          console.error("Failed to fetch prescriptions:", err);
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount(prevCount => prevCount + 1);
            }, 2000); // Retry after 2 seconds
          }
        }
      }
    };

    fetchData();
  }, [dispatch, user, retryCount]);

  const handleCardClick = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleRetry = () => {
    setRetryCount(0); // Reset retry count
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading prescriptions...</div>;

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <FaExclamationTriangle size={50} className="mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Error Loading Prescriptions</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-primary-6 text-white px-4 py-2 rounded hover:bg-primary-7 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const noPrescriptions = !medicalFile?.prescriptions || medicalFile.prescriptions.length === 0;

  return (
    <div className="relative flex h-screen bg-gray-100">
      {noPrescriptions ? (
        <div className="w-full flex flex-col justify-center items-center">
          <FaClipboardList size={100} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Prescriptions Found</h2>
          <p className="text-gray-500">You don't have any prescriptions at the moment.</p>
        </div>
      ) : (
        <>
          <div className="w-1/2 p-4 flex gap-4 flex-col overflow-y-auto">
            {medicalFile.prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription._id}
                prescription={prescription}
                className={prescription === selectedPrescription ? 'bg-primary-2' : ''}
                onClick={() => handleCardClick(prescription)}
              />
            ))}
          </div>
          <div className="w-1/2 p-4">
            {selectedPrescription ? (
              <PrescriptionDetail prescription={selectedPrescription} className='sticky top-4 min-h-[50%]' />
            ) : (
              <div className={`bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col justify-center items-center min-h-[60%] sticky top-4`}>
                <PiNotepadThin size={100} color='#F0F0F0' className="mb-4" />
                <p className="text-gray-500 text-center">Select a prescription to view details</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Prescription;
