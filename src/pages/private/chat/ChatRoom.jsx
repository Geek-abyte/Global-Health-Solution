import React, { useState } from 'react';
import { FaVideo, FaMicrophone, FaThLarge, FaCommentDots, FaPhone, FaTimes } from 'react-icons/fa';
import './Chatroom.css';

const Chatroom = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [layout, setLayout] = useState('side-by-side');
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const changeLayout = () => setLayout(layout === 'side-by-side' ? 'host-minimized' : 'side-by-side');
  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <div id="videos" className={`flex-grow flex ${layout === 'side-by-side' ? 'flex-col lg:flex-row' : 'flex-col'} bg-gray-800`}>
        <video className={`video-player ${layout === 'host-minimized' ? 'w-1/4 h-1/4' : 'flex-1'}`} id="user-1" autoPlay playsInline></video>
        <video className="video-player flex-1" id="user-2" autoPlay playsInline></video>
      </div>

      <div id="controls" className="flex justify-center p-4 bg-gray-900 text-white">
        <div className="control-container mx-2 cursor-pointer" onClick={toggleCamera} title="Toggle Camera">
          <FaVideo className={`h-8 w-8 ${!isCameraOn ? 'text-red-500' : 'text-white'}`} />
        </div>
        <div className="control-container mx-2 cursor-pointer" onClick={toggleMic} title="Toggle Microphone">
          <FaMicrophone className={`h-8 w-8 ${!isMicOn ? 'text-red-500' : 'text-white'}`} />
        </div>
        <div className="control-container mx-2 cursor-pointer" onClick={changeLayout} title="Change Layout">
          <FaThLarge className="h-8 w-8 text-white" />
        </div>
        <div className="control-container mx-2 cursor-pointer" onClick={toggleChat} title="Toggle Chat">
          <FaCommentDots className="h-8 w-8 text-white" />
        </div>
        <a href="lobby.html" className="control-container mx-2 cursor-pointer" title="Leave">
          <FaPhone className="h-8 w-8 text-white" />
        </a>
      </div>

      {isChatVisible && (
        <div id="chat-section" className="fixed bottom-0 right-0 w-full lg:w-1/3 h-1/2 lg:h-full bg-gray-900 text-white shadow-lg flex flex-col">
          <div className="p-4 bg-gray-700 font-semibold flex justify-between items-center">
            Chat
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>
          <div id="chat-messages" className="p-4 flex-grow overflow-y-auto bg-gray-800">
            <div className="message my-2 p-2 bg-blue-600 rounded-lg text-white">Hello</div>
            <div className="message my-2 p-2 bg-green-600 rounded-lg text-white self-end">Hi there!</div>
          </div>
          <div className="p-4 bg-gray-700 flex">
            <input type="text" id="chat-input" className="flex-grow p-2 border border-gray-600 rounded-l-lg bg-gray-800 text-white" placeholder="Type a message..." />
            <button className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatroom;
