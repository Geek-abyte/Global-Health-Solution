import React, { useState, useRef } from 'react';
import { BsRobot, BsX } from 'react-icons/bs';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatClass, setChatClass] = useState('hidden');
  const [isLoading, setIsLoading] = useState(false);
  const chatbotRef = useRef(null);

  const toggleChatBot = () => {
    if(!isOpen){
      setChatClass('') 
      setTimeout(() => setIsOpen(true), 10)
    } else {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: message }]);
      setMessage('');
      setIsLoading(true); // Set loading state to true

      // Simulate a delay and add a dummy response
      setTimeout(() => {
        setMessages([
          ...messages,
          { sender: 'user', text: message },
          { sender: 'bot', text: 'This is a dummy response from the bot.' },
        ]);
        setIsLoading(false); // Set loading state to false after receiving the response
      }, 2000); // Simulating a 2-second delay
    }
  };

  return (
    <div className="fixed bottom-4 right-6 z-20">
      <div
        ref={chatbotRef}
        className={`${chatClass} bg-white rounded-lg shadow-lg w-96 h-[450px] mb-[100px] flex flex-col transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0 translate-x-0 scale-100' : 'translate-y-96 translate-x-44 scale-0'
        }`}
        onTransitionEnd={() => !isOpen && setChatClass('hidden')}
      >
       <div className="flex justify-between items-center bg-blue-500 text-white p-2 rounded-t-lg">
        <h2 className="font-bold">Adam</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg flex items-start ${
              message.sender === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-gray-100 self-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="mr-2">
                <BsRobot size={20} className="text-blue-500" />
              </div>
            )}
            <span>{message.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="self-start bg-gray-100 p-2 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex p-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          className="flex-1 border rounded-lg px-4 py-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form> 
      </div>
      <button
        onClick={toggleChatBot}
        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-[10px] shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <div className='border-2 border-white rounded-full p-2'>{isOpen ? <BsX className='rotate-pop' size={30} /> : <BsRobot className='rotate-pop' size={30} />}</div>
      </button>
    </div>
  );
};


export default ChatBot;
