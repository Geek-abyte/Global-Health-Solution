import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { initializeAgoraEngine } from '../../../states/videoCallSlice';

const ChatRoom = () => {
  const { callId } = useParams();
  const dispatch = useDispatch();
  const { agoraAppId, agoraToken, agoraChannelName } = useSelector((state) => state.videoCall);
  const [users, setUsers] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    dispatch(initializeAgoraEngine());
  }, [dispatch]);

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
        console.log('Error joining channel:', error);
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4">
        <div className="w-full h-1/2">
          <div id="local-video" className="w-full h-full"></div>
        </div>
        <div className="w-full h-1/2 grid grid-cols-2 gap-2">
          {users.map((user) => (
            <div key={user.uid} className="w-full h-full">
              <div id={`remote-video-${user.uid}`} className="w-full h-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;