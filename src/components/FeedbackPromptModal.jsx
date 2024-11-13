import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaStar } from 'react-icons/fa';
import { PATH } from '../routes/path';

const FeedbackPromptModal = ({ isOpen, onClose, callId }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGiveFeedback = () => {
    navigate(PATH.general.feedback);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">How was your call?</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="text-center mb-6">
          <FaStar className="text-yellow-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">
            Your feedback helps us improve our service. Would you like to rate your experience?
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleGiveFeedback}
            className="w-full bg-primary-6 text-white py-2 px-4 rounded-lg hover:bg-primary-7 transition-colors"
          >
            Give Feedback
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPromptModal; 