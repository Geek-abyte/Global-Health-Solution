// src/components/IncomingCallNotification.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acceptCall, rejectCall } from '../states/videoCallSlice';
import { hideModal } from '../states/popUpSlice';
import { useNavigate } from 'react-router-dom';

const IncomingCallNotification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incomingCall = useSelector(state => state.videoCall.incomingCall);

  if (!incomingCall) return null;

  const handleAccept = () => {
    dispatch(acceptCall(incomingCall.callId))
      .then(() => {
        dispatch(hideModal());
        navigate('/call-room');
      });
  };

  const handleReject = () => {
    dispatch(rejectCall(incomingCall.callId))
      .then(() => {
        dispatch(hideModal());
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Incoming Call</h2>
        <p className="mb-4">You have an incoming call from a patient</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={handleReject}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reject
          </button>
          <button 
            onClick={handleAccept}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallNotification;