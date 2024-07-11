// src/components/CallRoom.js
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { endCall } from '../../../states/videoCallSlice';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axiosInstance from '../../../utils/axiosConfig'; 

function CallRoom() {
  const dispatch = useDispatch();
  const currentCall = useSelector(state => state.videoCall.currentCall);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);

  useEffect(() => {
    if (!currentCall) return;

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    async function setupCall() {
      try {
        // Fetch Agora token from your backend
        const { data } = await axiosInstance.post('/video-calls/token', {
          channelName: currentCall.channelName
        });

        // Join the Agora channel
        await client.join(process.env.REACT_APP_AGORA_APP_ID, currentCall.channelName, data.token);

        // Create and publish local audio and video tracks
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.publish([localAudioTrack, localVideoTrack]);

        setLocalVideoTrack(localVideoTrack);

        // Listen for remote user joining
        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setRemoteVideoTrack(user.videoTrack);
          }
        });
      } catch (error) {
        console.error('Error setting up call:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }

    setupCall();

    return () => {
      client.leave();
      localVideoTrack?.close();
    };
  }, [currentCall]);

  const handleEndCall = () => {
    dispatch(endCall(currentCall.callId));
  };

  if (!currentCall) return null;

  return (
    <div className="call-room">
      <div className="local-video">
        {localVideoTrack && <LocalVideoView track={localVideoTrack} />}
      </div>
      <div className="remote-video">
        {remoteVideoTrack && <RemoteVideoView track={remoteVideoTrack} />}
      </div>
      <button onClick={handleEndCall}>End Call</button>
    </div>
  );
}

function LocalVideoView({ track }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      track.play(ref.current);
    }
  }, [track]);

  return <div ref={ref} className="video-container"></div>;
}

function RemoteVideoView({ track }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      track.play(ref.current);
    }
  }, [track]);

  return <div ref={ref} className="video-container"></div>;
}

export default CallRoom;