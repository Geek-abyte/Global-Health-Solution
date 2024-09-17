import React, { useState, useEffect, useRef } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaExclamationTriangle
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { initiateCall, setMicEnabled, setCameraEnabled } from "../../../states/videoCallSlice";
import { fetchUserProfile } from "../../../states/user/authSlice";
import { PATH } from "../../../routes/path";

const SetupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSpecialistCategory } = useSelector((state) => state.videoCall);
  const { currentCall, isCameraEnabled, isMicEnabled } = useSelector((state) => state.videoCall);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const videoPreviewRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (currentCall && currentCall.status === 'accepted') {
      navigate(`${PATH.chat.default}${currentCall.callId}`);
    }
  }, [currentCall, navigate]);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
        }
        setMediaError(null);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setMediaError("Unable to access camera or microphone. Please check your device settings.");
      }
    };

    initializeMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => track.enabled = isCameraEnabled);
      localStream.getAudioTracks().forEach(track => track.enabled = isMicEnabled);
    }
  }, [isCameraEnabled, isMicEnabled, localStream]);

  const toggleCamera = () => dispatch(setCameraEnabled({ camera: !isCameraEnabled }));
  const toggleMic = () => dispatch(setMicEnabled({ mic: !isMicEnabled }));

  const onJoinCall = () => {
    if (user && currentCall) {
      navigate(`${PATH.chat.default}${currentCall.callId}`);
    } else {
      console.error('User or currentCall not available');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-indigo-800 mb-4">Ready for Your Call?</h1>
            <p className="text-gray-600 mb-8">Let's make sure your devices are set up correctly.</p>

            {mediaError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p className="font-bold">Error</p>
                <p>{mediaError}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Camera</span>
                <button
                  onClick={toggleCamera}
                  className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isCameraEnabled ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                  {isCameraEnabled ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Microphone</span>
                <button
                  onClick={toggleMic}
                  className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isMicEnabled ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                  {isMicEnabled ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={onJoinCall}
              className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              disabled={mediaError}
            >
              Join Call
            </button>
          </div>

          <div className="md:w-1/2 bg-gray-900 p-8 flex items-center justify-center">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner relative">
              {mediaError ? (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800">
                  <FaExclamationTriangle size={48} className="text-yellow-500 mr-4" />
                  <span>Camera unavailable</span>
                </div>
              ) : (
                <>
                  <video
                    ref={videoPreviewRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isCameraEnabled && localStream && (
                    <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800 bg-opacity-75">
                      <FaVideoSlash size={48} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
