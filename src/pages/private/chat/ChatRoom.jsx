import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { initializeAgoraEngine, endCall } from '../../../states/videoCallSlice';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import startCallTimer from '../../../utils/callTimer';

const ChatRoom = () => {
  const navigate = useNavigate();
  const { callId } = useParams();
  const dispatch = useDispatch();
  const { currentCall } = useSelector((state) => state.videoCall);
  const { agoraAppId, agoraToken, agoraChannelName } = useSelector((state) => state.videoCall);
  const [users, setUsers] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const clientRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    dispatch(initializeAgoraEngine(currentCall.channelName));
  }, [dispatch, callId, currentCall]);

  useEffect(() => {
    if (!agoraAppId || !agoraToken || !agoraChannelName) return;

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    clientRef.current = client;

    const init = async () => {
      client.on('user-published', handleUserPublished);
      client.on('user-unpublished', handleUserUnpublished);

      try {
        await client.join(agoraAppId, agoraChannelName, agoraToken, null);
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const videoTrack = await AgoraRTC.createCameraVideoTrack();

        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);

        await client.publish([audioTrack, videoTrack]);
        videoTrack.play('local-video');
      } catch (error) {
        console.error('Error joining channel:', error);
      }
    };

    init();

    // Start the call timer
    if (currentCall && currentCall.duration) {
      setTimeLeft(currentCall.duration);
      const clearTimer = startCallTimer(
        currentCall.duration,
        () => {
          dispatch(endCall(currentCall.callId));
          navigate('/dashboard'); // or wherever you want to redirect after the call
        },
        (newTimeLeft) => setTimeLeft(newTimeLeft)
      );

      return () => {
        clearTimer(); // Clear the timer when component unmounts
      };
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.leave();
        clientRef.current.removeAllListeners();
      }
      if (localAudioTrack) localAudioTrack.close();
      if (localVideoTrack) localVideoTrack.close();
    };
  }, [agoraAppId, agoraToken, agoraChannelName, currentCall, dispatch, navigate]);

  const handleUserPublished = async (user, mediaType) => {
    await clientRef.current.subscribe(user, mediaType);
    if (mediaType === 'video') {
      setUsers((prevUsers) => {
        if (prevUsers.find((u) => u.uid === user.uid)) {
          return prevUsers.map((u) => u.uid === user.uid ? { ...u, videoTrack: user.videoTrack } : u);
        }
        return [...prevUsers, { ...user, videoTrack: user.videoTrack }];
      });
    }
    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  const handleUserUnpublished = (user, mediaType) => {
    if (mediaType === 'audio') {
      if (user.audioTrack) user.audioTrack.stop();
    }
    if (mediaType === 'video') {
      setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
    }
  };

  const toggleAudio = () => {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!isAudioMuted);
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!isVideoMuted);
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const endCall = () => {
    if (window.confirm('Are you sure you want to end the call?')) {
      if (clientRef.current) {
        clientRef.current.leave();
      }
      // Navigate to the main menu or end call screen
      navigate('/dashboard'); // Adjust this path as needed
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      if (user.videoTrack) {
        user.videoTrack.play(`remote-video-${user.uid}`);
      }
    });
  }, [users]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 p-2 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 h-full">
          <div className="relative aspect-video">
            <div id="local-video" className="absolute inset-0 rounded-lg overflow-hidden bg-gray-800"></div>
            <div className="absolute bottom-2 left-2 text-white bg-gray-800 px-2 py-1 rounded text-sm">You</div>
          </div>
          {users.map((user) => (
            <div key={user.uid} className="relative aspect-video">
              <div id={`remote-video-${user.uid}`} className="absolute inset-0 rounded-lg overflow-hidden bg-gray-800"></div>
              <div className="absolute bottom-2 left-2 text-white bg-gray-800 px-2 py-1 rounded text-sm">Remote User</div>
            </div>
          ))}
        </div>
        {/* Updated timer display */}
        {timeLeft !== null && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full">
            Time left: {formatTime(timeLeft)}
          </div>
        )}
      </div>
      <div className="bg-gray-800 p-2 sm:p-4">
        <div className="flex justify-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-2 sm:p-4 rounded-full ${isAudioMuted ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isAudioMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-2 sm:p-4 rounded-full ${isVideoMuted ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isVideoMuted ? <FaVideoSlash size={20} /> : <FaVideo size={20} />}
          </button>
          <button
            onClick={endCall}
            className="p-2 sm:p-4 rounded-full bg-red-500"
          >
            <FaPhoneSlash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;