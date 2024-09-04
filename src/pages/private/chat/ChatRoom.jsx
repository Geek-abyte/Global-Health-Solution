import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setMicEnabled,
  setCameraEnabled,
  endCall,
} from "../../../states/videoCallSlice";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
} from "react-icons/fa";

const CallRoom = () => {
  const {
    currentCall,
    isCameraEnabled,
    isMicEnabled,
  } = useSelector((state) => state.videoCall);
  const dispatch = useDispatch();
  const jitsiContainerRef = useRef(null);
  const navigate = useNavigate();
  const { callId } = useParams();

  useEffect(() => {
    if (!currentCall || !callId) {
      navigate("/");
      return;
    }

    const domain = 'meet.jit.si';
    const options = {
      roomName: callId,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          'e2ee'
        ],
      },
      configOverwrite: {
        prejoinPageEnabled: false,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.executeCommand('displayName', currentCall.userName);
    api.executeCommand('toggleAudio', isMicEnabled);
    api.executeCommand('toggleVideo', isCameraEnabled);

    api.addEventListener('readyToClose', () => {
      handleEndCall();
    });

    return () => {
      api.dispose();
    };
  }, [currentCall, callId, navigate, isMicEnabled, isCameraEnabled]);

  const toggleCamera = () => {
    dispatch(setCameraEnabled({ camera: !isCameraEnabled }));
  };

  const toggleMic = () => {
    dispatch(setMicEnabled({ mic: !isMicEnabled }));
  };

  const handleEndCall = () => {
    dispatch(endCall());
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex flex-1 relative">
        <div ref={jitsiContainerRef} className="absolute inset-0"></div>
      </div>
      <div className="flex justify-center items-center p-4 bg-gray-800">
        <button
          onClick={toggleCamera}
          className="mx-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          {isCameraEnabled ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
        </button>
        <button
          onClick={toggleMic}
          className="mx-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          {isMicEnabled ? (
            <FaMicrophone size={24} />
          ) : (
            <FaMicrophoneSlash size={24} />
          )}
        </button>
        <button
          onClick={handleEndCall}
          className="mx-2 p-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          <FaPhoneSlash size={24} />
        </button>
      </div>
    </div>
  );
};

export default CallRoom;
