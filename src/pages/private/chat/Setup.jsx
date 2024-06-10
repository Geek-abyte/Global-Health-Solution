import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { PATH } from "../../../routes/path";

const SetupPage = () => {
  const navigate = useNavigate();
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [localTrack, setLocalTrack] = useState(null);
  const videoPreviewRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      if (isCameraEnabled) {
        const track = await AgoraRTC.createCameraVideoTrack();
        setLocalTrack(track);
        track.play(videoPreviewRef.current);
      } else {
        if (localTrack) {
          localTrack.stop();
          localTrack.close();
          setLocalTrack(null);
        }
      }
    };
    initCamera();
  }, [isCameraEnabled]);

  useEffect(() => {
    return () => {
      if (localTrack) {
        localTrack.stop();
        localTrack.close();
      }
    };
  }, [localTrack]);

  const toggleCamera = () => {
    setIsCameraEnabled(!isCameraEnabled);
  };

  const toggleMic = () => {
    setIsMicEnabled(!isMicEnabled);
  };

  const onJoinCall = () => {
    navigate(`${PATH.chat.default}d24`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-2xl mb-6 font-bold text-white">
          Setup Your Devices
        </h1>
        <div
          ref={videoPreviewRef}
          className="w-full aspect-video bg-gray-700 mb-6 rounded-lg"
        ></div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleCamera}
            className={`flex items-center px-4 py-2 rounded-full transition-colors duration-300 ${
              isCameraEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            {isCameraEnabled ? (
              <FaVideo size={20} />
            ) : (
              <FaVideoSlash size={20} />
            )}
            <span className="ml-2">
              {isCameraEnabled ? "Disable Camera" : "Enable Camera"}
            </span>
          </button>
          <button
            onClick={toggleMic}
            className={`flex items-center px-4 py-2 rounded-full transition-colors duration-300 ${
              isMicEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            {isMicEnabled ? (
              <FaMicrophone size={20} />
            ) : (
              <FaMicrophoneSlash size={20} />
            )}
            <span className="ml-2">
              {isMicEnabled ? "Disable Mic" : "Enable Mic"}
            </span>
          </button>
        </div>
        <button
          onClick={onJoinCall}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Join Call
        </button>
      </div>
    </div>
  );
};

export default SetupPage;
