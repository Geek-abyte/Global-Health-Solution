import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateCall } from '../states/videoCallSlice';

function InitiateCallButton({ specialistId, specialistName, specialistCategory }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.auth.user._id);

  const handleInitiateCall = () => {
    dispatch(initiateCall({
      userId: currentUserId,
      specialistId,
      specialistCategory
    }));
  };

  return <button onClick={handleInitiateCall}>Call {specialistName}</button>;
}

export default InitiateCallButton;