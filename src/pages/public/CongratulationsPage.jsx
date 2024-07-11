import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { PATH } from '../../routes/path';

const CongratulationsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fire the confetti animation when the component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const handleGoToDashboard = () => {
    navigate(PATH.dashboard.dashboard);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center z-10">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Congratulations!</h2>
        <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
        <button
          onClick={handleGoToDashboard}
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPage;
