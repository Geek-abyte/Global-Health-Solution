import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate } from "react-router-dom";
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

const APP_ID = import.meta.env.VITE_AGORA_API_ID;

const CallRoom = () => {
  const {
    currentCall: callData,
    isCameraEnabled,
    isMicEnabled,
  } = useSelector((state) => state.videoCall);
  const dispatch = useDispatch();
  const client = useRef(null);
  const [localTrack, setLocalTrack] = useState(null);
  const [remoteTrack, setRemoteTrack] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!callData) {
      navigate("/");
      return;
    }

    client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    joinChannel();

    return () => {
      leaveChannel();
    };
  }, [callData, navigate]);

  const joinChannel = async () => {
    await client.current.join(
      APP_ID,
      callData.channelName,
      // callData.token,
      null
    );

    const [audioTrack, videoTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTrack(videoTrack);

    videoTrack.play("local-video");
    await client.current.publish([audioTrack, videoTrack]);

    client.current.on("user-published", handleUserPublished);
    client.current.on("user-unpublished", handleUserUnpublished);
  };

  const leaveChannel = async () => {
    localTrack && localTrack.close();
    remoteTrack && remoteTrack.close();
    await client.current.leave();
  };

  const handleUserPublished = async (user, mediaType) => {
    await client.current.subscribe(user, mediaType);

    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack;
      setRemoteTrack(remoteVideoTrack);
      remoteVideoTrack.play("remote-video");
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserUnpublished = (user) => {
    if (user.videoTrack) {
      user.videoTrack.stop();
    }
    setRemoteTrack(null);
  };

  const toggleCamera = () => {
    if (localTrack) {
      if (isCameraEnabled) {
        localTrack.stop();
      } else {
        localTrack.play("local-video");
      }
      localTrack.setEnabled(!isCameraEnabled);
      dispatch(setCameraEnabled({ camera: !isCameraEnabled }));
    }
  };

  const toggleMic = () => {
    if (client.current && client.current.localTracks[0]) {
      const audioTrack = client.current.localTracks[0];
      audioTrack.setEnabled(!isMicEnabled);
      dispatch(setMicEnabled({ mic: !isMicEnabled }));
    }
  };

  const handleEndCall = () => {
    leaveChannel();
    dispatch(endCall());
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
    {console.log('token: ', callData)}
      {console.log("mic:", isMicEnabled)}
      {console.log("mic:", isMicEnabled)}
      <div className="flex flex-1 relative">
        <div className="absolute inset-0">
          <div id="remote-video" className="w-full h-full bg-black"></div>
        </div>
        <div className="absolute top-4 right-4 w-1/4 h-1/4 rounded-lg overflow-hidden">
          <div id="local-video" className="w-full h-full bg-gray-700"></div>
        </div>
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
