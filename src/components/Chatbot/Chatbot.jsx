import React, { useState, useRef, useEffect } from 'react';
import { BsRobot, BsX } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { toSnakeCase } from '../../helperFunctions';
import axios from 'axios';
import { symptoms } from '../../data/symptoms';
import axiosInstance from '../../utils/axiosConfig';

const apiUrl = import.meta.env.VITE_API_URL;
const exampleMessages = [
  { text: 'Hi there!', sender: 'bot' },
  { text: 'Input your symptoms to determine the likely illness or consult a specialist', sender: 'bot' },
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [isAddingTags, setIsAddingTags] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [chatClass, setChatClass] = useState('hidden');
  const [messages, setMessages] = useState(exampleMessages); // New state for messages
  const chatbotRef = useRef(null);
  const messageAreaRef = useRef(null); // Ref for the message area

  // tab options
  const tabs = ["home", "symptoms", "faq"];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const toggleChatBot = () => {
    if (!isOpen) {
      setChatClass('')
      setTimeout(() => setIsOpen(true), 10)
    } else {
      setIsOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter suggestions based on input value
    const filteredSuggestions = symptoms.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleAddingTags = () => {
    addMessage(
      'please input at least 5 symptoms',
      'bot'
    )
    setIsAddingTags(true)
  }

  const handleSelectSuggestion = (suggestion) => {
    addTag(suggestion)
    setSearchTerm('')
    setSuggestions([]);
  };

  const addTag = (newTag) => {
    if (!tags.includes(newTag)) setTags(prevTags => [...prevTags, newTag]);
  };

  const removeTag = (index) => {
    setTags(prevTags => {
      const newTags = [...prevTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tabs[tab])
  }

  const handleSeePrediction = (arr) => {
    let payload = arr
    setTags([])
    setIsAddingTags(false)
    addMessage(
      `What is the possible cause of this symptoms? \n ${payload.join(',\n')}`,
      'user'
    )

    sendTags(payload)
  }

  // Function to add a message to the chat
  const addMessage = (text, sender) => {
    const newMessage = { text, sender };
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }, 300); // Delay for 300ms to allow the transition to play
  };
  
  const sendTags = async (message) => {
    let packet = message.map((tag) => toSnakeCase(tag));
  
    setLoading(true);
    try {
      const response = await axiosInstance.post('/chatbot/predict_disease', { symptoms: packet });
      setLoading(false);
      addMessage(response.data);
      addMessage('Try a different set of symptoms, or would you like to consult a specialist?');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      addMessage('There was a problem with the result, please try again');
      addMessage('Or would you like to consult a specialist?');
    }
  };

  useEffect(() => {
    setShowButton(false);

    setTimeout(() => {
      setShowButton(true)
    }, 1000);
  }, [messages])

  useEffect(() => {
    // Scroll to the bottom of the message area when messages change
    messageAreaRef.current?.scrollTo(0, messageAreaRef.current?.scrollHeight);
  }, [messages, tags]);

  return (
    <div className="fixed font-roboto-condensed bottom-2 md:bottom-4 right-2 md:right-6 z-20">
      <div
        ref={chatbotRef}
        className={`${chatClass} overflow-hidden  rounded-lg shadow-lg w-[95vw] sm:w-96 h-[400px] md:h-[450px] mb-[70px] md:mb-[100px] flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0 translate-x-0 scale-100' : 'translate-y-96 translate-x-44 scale-0'
          }`}
        onTransitionEnd={() => !isOpen && setChatClass('hidden')}
      >
        {(selectedTab === tabs[0]) &&
          <div className='flex flex-col bg-gradient-to-b from-primary-7 via-primary-5 to-white custom-scrollbar overflow-auto scroll-2 p-6 pl-10 h-full'>
            <div className="flex flex-row justify-center m-4">
              <div class="flex justify-center items-center ml-6 w-10 h-10 bg-blue-500 rounded-full border-2 border-white relative"><RiCustomerService2Fill color='white' size={20} /></div>
              <div class="flex justify-center items-center w-10 h-10 bg-blue-500 rounded-full border-2 border-white relative transform -translate-x-2"><RiCustomerService2Fill color='white' size={20} /></div>
              <div class="flex justify-center items-center w-10 h-10 bg-blue-500 rounded-full border-2 border-white relative transform -translate-x-4"><RiCustomerService2Fill color='white' size={20} /></div>
            </div>
            <div className='font-extrabold text-[32px] mt-4 md:mt-12'>
              <p className='text-secondary-1'>Hello There!</p>
              <p className='text-white'>How can we help?</p>
            </div>
            <div className='mt-8 flex flex-col gap-5'>
              <div className='bg-white rounded-lg text-[20px] cursor-pointer shadow-lg p-4 ' onClick={() => handleTabChange(1)}>
                Tell us your symptoms
              </div>
              <div className='bg-white rounded-lg text-[20px] cursor-pointer shadow-lg p-4 'onClick={() => sendTags(tags)}>
                Frequently asked questions
              </div>
            </div>
          </div>
        }
        {(selectedTab === tabs[1]) &&
          // tab handler
          <div className='flex flex-col h-full'>
            <div className='relative bg-primary-9 p-2 flex justify-center text-white font-bold'>
              <IoMdArrowBack color={"white"} size={25} className='absolute top-2 left-2' onClick={() => handleTabChange(0)} />symptoms
            </div>
            <div id='message-area' ref={messageAreaRef} className='bg-white flex-1 overflow-auto custom-scrollbar'>
              {/* Render messages */}
              <div className="flex-1 p-6 rounded-lg">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'} message-enter message-enter-active`}>
                    <div className={`bg-${message.sender === 'user' ? 'blue-500 text-white' : 'secondary-8'} rounded-lg p-2 shadow-md inline-block max-w-[70%]`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                 {loading && (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-7"></div>
                    </div>
                  )}
                {isAddingTags === false && !loading &&
                  <div className="flex space-x-4 mt-10">
                    <button 
                      className={`border rounded-xl p-2 transition-transform duration-500 ease-out transform hover:scale-110 bg-gradient-to-r from-purple-500 to-indigo-500 text-white ${showButton ? 'scale-100 opacity-100 inline-block' : 'scale-0 opacity-0 none'}`}
                      onClick={() => handleAddingTags()}
                      >Input Symptoms</button>
                    <button className={`border rounded-xl p-2 duration-500 ease-out transition-transform transform hover:scale-110 bg-gradient-to-r from-pink-500 to-red-500 text-white ${showButton ? 'scale-100 opacity-100 inline-block' : 'scale-0 opacity-0 none'}`}>Consult a Specialist</button>
                  </div>
                }
                {tags.length > 0 &&
                  <div className='mt-6'>
                    <ul className="flex flex-wrap flex-row-reverse">
                      {tags.map((tag, index) => (
                        <li key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1">
                          <span>{tag}</span>
                          <IoCloseCircleOutline onClick={() => removeTag(index)} className="ml-2 outline-none focus:outline-none" color='red' />
                        </li>
                      ))}
                    </ul>
                    <div className='flex justify-center mt-4'>
                      <button className={`border rounded-xl p-2 bg-primary-4 text-white transition-all duration-500 ease-in-out transform hover:scale-110 ${tags.length > 4 ? 'scale-100 opacity-100 inline-block' : 'scale-0 opacity-0 none'}`}
                      onClick={() => handleSeePrediction(tags)}  
                    >See Prediction</button>
                    </div>
                  </div>
                }
              </div>
            </div>
            {isAddingTags &&
              <div>
                {suggestions.length > 0 && (
                  <div className="bg-gray-100 border-gray-200 max-h-[200px] overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                <div className={`bg-white p-4 flex justify-center ${isOpen ? 'translate-y-0 translate-x-0' : 'translate-y-12'}`}>
                  <input
                    type="text"
                    placeholder="search for syptoms..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="flex-1 border rounded-lg px-4 py-2 mr-2"
                  />
                </div>
              </div>
            }
          </div>
        }
      </div>
      <button
        onClick={toggleChatBot}
        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-[5px] md:p-[10px] shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <div className='border-2 border-white rounded-full p-2'>{isOpen ? <BsX className='rotate-pop' size={25} /> : <BsRobot className='rotate-pop' size={25} />}</div>
      </button>
    </div>
  );
};

export default ChatBot;
