import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
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
  const {
    currentCall,
    isCameraEnabled,
    isMicEnabled,
  } = useSelector((state) => state.videoCall);
  const [canConnect, setCanConnect] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [localTrack, setLocalTrack] = useState(null);
  const videoPreviewRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      if (isCameraEnabled) {
        const track = await AgoraRTC.createCameraVideoTrack();
        setLocalTrack(track);
        track.play(videoPreviewRef.current);
      } else if (localTrack) {
        localTrack.stop();
        localTrack.close();
        setLocalTrack(null);
      }
    };
    initCamera();
    return () => {
      if (localTrack) {
        localTrack.stop();
        localTrack.close();
      }
    };
  }, [isCameraEnabled, localTrack]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  const toggleCamera = () => dispatch(setCameraEnabled({ camera: !isCameraEnabled }));
  const toggleMic = () => dispatch(setMicEnabled({ mic: !isMicEnabled }));

  const onJoinCall = () => {
    if (user) {
      dispatch(
        initiateCall({ userId: user._id, specialistCategory: currentSpecialistCategory })
      );
      setCanConnect(true);
    }
  };

  useEffect(() => {
    if (currentCall) {
      if (currentCall.status === 'accepted') navigate(`${PATH.chat.default}${currentCall.callId}`);
    }
  }, [currentCall]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Ready for Your Call?</h1>
          <p className="mt-2 opacity-80">Let's set up your devices</p>
        </div>

        <div className="p-6">
          <div
            ref={videoPreviewRef}
            className="w-full aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden shadow-inner"
          >
            {!isCameraEnabled && (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FaVideoSlash size={48} />
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4 mb-8">
            <button
              onClick={toggleCamera}
              className={`flex-1 flex items-center justify-center py-3 rounded-full transition-all duration-300 ${isCameraEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {isCameraEnabled ? (
                <FaVideo size={20} />
              ) : (
                <FaVideoSlash size={20} />
              )}
              <span className="ml-2 font-medium">
                {isCameraEnabled ? "Camera On" : "Camera Off"}
              </span>
            </button>
            <button
              onClick={toggleMic}
              className={`flex-1 flex items-center justify-center py-3 rounded-full transition-all duration-300 ${isMicEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {isMicEnabled ? (
                <FaMicrophone size={20} />
              ) : (
                <FaMicrophoneSlash size={20} />
              )}
              <span className="ml-2 font-medium">
                {isMicEnabled ? "Mic On" : "Mic Off"}
              </span>
            </button>
          </div>

          <button
            onClick={onJoinCall}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Join Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
