import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { submitFeedback } from '../../../utils/api';

const AppointmentFeedback = () => {
  const { appointmentId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(appointmentId, { rating, comment });
    // Navigate to appointment history or show success message
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2">Comments</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Feedback</button>
      </form>
    </div>
  );
};

export default AppointmentFeedback;