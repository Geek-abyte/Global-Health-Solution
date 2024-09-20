import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { initializeAgoraEngine } from '../../../states/videoCallSlice';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';

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

    return () => {
      if (clientRef.current) {
        clientRef.current.leave();
        clientRef.current.removeAllListeners();
      }
      if (localAudioTrack) localAudioTrack.close();
      if (localVideoTrack) localVideoTrack.close();
    };
  }, [agoraAppId, agoraToken, agoraChannelName]);

  const handleUserPublished = async (user, mediaType) => {
    await clientRef.current.subscribe(user, mediaType);
    if (mediaType === 'video') {
      setUsers((prevUsers) => {
        if (prevUsers.find((u) => u.uid === user.uid)) {
          return prevUsers;
        }
        return [...prevUsers, user];
      });
      user.videoTrack.play(`remote-video-${user.uid}`);
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

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="relative">
            <div id="local-video" className="w-full h-full rounded-lg overflow-hidden bg-gray-800"></div>
            <div className="absolute bottom-4 left-4 text-white bg-gray-800 px-2 py-1 rounded">You</div>
          </div>
          {users.map((user) => (
            <div key={user.uid} className="relative">
              <div id={`remote-video-${user.uid}`} className="w-full h-full rounded-lg overflow-hidden bg-gray-800"></div>
              <div className="absolute bottom-4 left-4 text-white bg-gray-800 px-2 py-1 rounded">Remote User</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${isAudioMuted ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isAudioMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${isVideoMuted ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isVideoMuted ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
          </button>
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500"
          >
            <FaPhoneSlash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;