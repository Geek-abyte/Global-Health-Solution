import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../services/socket';
import { setIncomingCall } from '../features/videoCall/videoCallSlice';

export function useVideoCallSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleIncomingCall(call) {
      dispatch(setIncomingCall(call));
    }

    socket.on('incomingCall', handleIncomingCall);

    return () => {
      socket.off('incomingCall', handleIncomingCall);
    };
  }, [dispatch]);
}