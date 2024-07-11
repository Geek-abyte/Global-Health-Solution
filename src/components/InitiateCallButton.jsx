// src/components/InitiateCallButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateCall } from '../features/videoCall/videoCallSlice';

function InitiateCallButton({ specialistId, specialistName }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.user.id); // Assuming you have an auth slice

  const handleInitiateCall = () => {
    dispatch(initiateCall({ 
      userId: currentUserId, 
      specialistId, 
      specialistCategory: 'example_category'
    }));
  };

  return <button onClick={handleInitiateCall}>Call {specialistName}</button>;
}

export default InitiateCallButton;