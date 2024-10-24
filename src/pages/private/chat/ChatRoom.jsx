import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { initializeAgoraEngine, endCall } from '../../../states/videoCallSlice';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaFileAlt, FaComments, FaExpand, FaCompress, FaClock } from 'react-icons/fa';
import MedicalFile from '../../../components/MedicalFile';
import { fetchPrescriptions } from '../../../states/medicalFileSlice';

const ChatRoom = () => {
  const navigate = useNavigate();
  const { callId } = useParams();
  const dispatch = useDispatch();
  const { currentCall } = useSelector((state) => state.videoCall);
  const { agoraAppId, agoraToken, agoraChannelName } = useSelector((state) => state.videoCall);
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const clientRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const [fullScreenUser, setFullScreenUser] = useState(null);
  const location = useLocation();
  const previousPath = location.state?.from || '/dashboard';

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
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            dispatch(endCall(currentCall.callId));
            navigate('/dashboard');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timerInterval);
        if (clientRef.current) {
          clientRef.current.leave();
          clientRef.current.removeAllListeners();
        }
        if (localAudioTrack) localAudioTrack.close();
        if (localVideoTrack) localVideoTrack.close();
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
          return prevUsers.map((u) => u.uid === user.uid ? { ...u, videoTrack: user.videoTrack, name: user.name || 'Remote User' } : u);
        }
        return [...prevUsers, { ...user, videoTrack: user.videoTrack, name: user.name || 'Remote User' }];
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

      // Determine the redirect path based on user role
      let redirectPath;
      if (user.role === 'patient') {
        // Redirect to the patient specialist page
        redirectPath = `/user/specialist`;
      } else if (user.role === 'specialist') {
        // Redirect to the doctor's dashboard
        redirectPath = '/doctor/dashboard';
      } else {
        // Fallback to the previous path or dashboard
        redirectPath = previousPath;
      }

      // Navigate to the determined path
      navigate(redirectPath);
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
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleFullScreenMode = (user = null) => {
    setIsFullScreenMode(!isFullScreenMode);
    setFullScreenUser(user);
  };

  useEffect(() => {
    // Fetch prescriptions for the patient
    if (user.role === 'patient' && currentCall && currentCall.userId) {
      dispatch(fetchPrescriptions(currentCall.userId));
    }
  }, [dispatch, callId, currentCall, user.role]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className={`flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen && user.role === 'specialist' ? 'w-3/4' : 'w-full'}`}>
        <div className="flex-1 p-4 relative">
          {/* Timer overlay */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gray-800 bg-opacity-75 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <FaClock className="text-primary-6" />
              <span className="font-semibold">
                {timeLeft !== null ? formatTime(timeLeft) : 'Connecting...'}
              </span>
            </div>
          </div>
          {isFullScreenMode ? (
            <>
              <div className="absolute inset-0 bg-gray-800 rounded-lg overflow-hidden">
                <div id={fullScreenUser ? `remote-video-${fullScreenUser.uid}` : 'local-video'} className="absolute inset-0"></div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {fullScreenUser ? fullScreenUser.name : 'You'}
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => toggleFullScreenMode()}>
                <div id={fullScreenUser ? 'local-video' : `remote-video-${users[0]?.uid}`} className="absolute inset-0"></div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {fullScreenUser ? 'You' : users[0]?.name || 'Remote User'}
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => toggleFullScreenMode()}>
                <div id="local-video" className="absolute inset-0"></div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">You</div>
              </div>
              {users.map((user) => (
                <div key={user.uid} className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => toggleFullScreenMode(user)}>
                  <div id={`remote-video-${user.uid}`} className="absolute inset-0"></div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">{user.name || 'Remote User'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 flex justify-center space-x-4">
          <ControlButton onClick={toggleAudio} isActive={!isAudioMuted} activeIcon={<FaMicrophone />} inactiveIcon={<FaMicrophoneSlash />} />
          <ControlButton onClick={toggleVideo} isActive={!isVideoMuted} activeIcon={<FaVideo />} inactiveIcon={<FaVideoSlash />} />
          <ControlButton onClick={endCall} isActive={false} activeIcon={<FaPhoneSlash />} inactiveIcon={<FaPhoneSlash />} bgColor="bg-red-500" />
          <ControlButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isActive={isSidebarOpen} activeIcon={<FaFileAlt />} inactiveIcon={<FaFileAlt />} />
          <ControlButton onClick={() => toggleFullScreenMode()} isActive={isFullScreenMode} activeIcon={<FaExpand />} inactiveIcon={<FaCompress />} />
        </div>
      </div>
      {user.role === 'specialist' && (
        <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-1/4' : 'w-0'} bg-white shadow-lg overflow-hidden`}>
          <div className="h-full overflow-y-auto p-4">
            <MedicalFile patientId={currentCall.userId} />
          </div>
        </div>
      )}
      {user.role === 'patient' && (
        <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-1/4' : 'w-0'} bg-white shadow-lg overflow-hidden`}>
          <div className="h-full overflow-y-auto p-4">
            <h2 className="text-xl font-bold mb-4">Your Prescriptions</h2>
            {medicalFile?.prescriptions?.map((prescription, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                <p className="font-semibold">{prescription.medication}</p>
                <p>Dosage: {prescription.dosage}</p>
                <p>Frequency: {prescription.frequency}</p>
                <p>Start Date: {new Date(prescription.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(prescription.endDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const ControlButton = ({ onClick, isActive, activeIcon, inactiveIcon, bgColor = 'bg-gray-200' }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full ${isActive ? 'bg-primary-6 text-white' : `${bgColor} text-gray-700`} hover:opacity-80 transition-colors`}
  >
    {isActive ? activeIcon : inactiveIcon}
  </button>
);


export default ChatRoom;
