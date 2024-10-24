import React, { useState, useRef, useEffect } from "react";
import { BsRobot, BsX } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaPaperPlane } from "react-icons/fa";
import axiosInstance from "../../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { openChatBot, resetChatbotAttention } from "../../states/popUpSlice";
import { useNavigate } from "react-router";
import { PATH } from "../../routes/path";

const apiUrl = import.meta.env.VITE_API_URL;
const exampleMessages = [
  { text: "Hi there!", sender: "bot" },
  {
    text: "Describe your symptoms, and I'll try to determine the likely illness. You can also contact a consultant if needed.",
    sender: "bot",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ChatBotOpen, chatbotAttentionTriggered } = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [chatClass, setChatClass] = useState("hidden");
  const [messages, setMessages] = useState(exampleMessages);
  const [userInput, setUserInput] = useState("");
  const chatbotRef = useRef(null);
  const messageAreaRef = useRef(null);
  const navigate = useNavigate();
  const [isAttentionEffect, setIsAttentionEffect] = useState(false);
  const [showConsultantButton, setShowConsultantButton] = useState(false);

  const tabs = ["home", "chat"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggleChatBot = () => {
    if (!isOpen) {
      setChatClass("");
      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    } else {
      setIsOpen(false);
      dispatch(openChatBot(false));
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tabs[tab]);
  };

  const addMessage = (text, sender, showConsultantOption = false) => {
    const newMessage = { text, sender, showConsultantOption };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 300);
  };

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/chatbot/predict_disease", {
        question: message,
      });
      setLoading(false);
      addMessage(response.data.response, "bot");
      addMessage(
        "Is there anything else you'd like to ask, or would you like to contact a consultant?",
        "bot",
        true
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      addMessage("There was a problem with the result, please try again", "bot");
      addMessage("Or would you like to contact a consultant?", "bot", true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      addMessage(userInput, "user");
      sendMessage(userInput);
      setUserInput("");
    }
  };

  useEffect(() => {
    messageAreaRef.current?.scrollTo(0, messageAreaRef.current?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (ChatBotOpen && !isOpen) {
      toggleChatBot();
    }
  }, [ChatBotOpen]);

  useEffect(() => {
    if (chatbotAttentionTriggered) {
      setIsAttentionEffect(true);
      toggleChatBot();
      setTimeout(() => {
        setIsAttentionEffect(false);
        dispatch(resetChatbotAttention());
      }, 3000);
    }
  }, [chatbotAttentionTriggered, dispatch]);

  return (
    <div className="fixed font-roboto-condensed bottom-2 md:bottom-4 right-2 md:right-6 z-20">
      <div
        ref={chatbotRef}
        className={`${chatClass} overflow-hidden rounded-2xl shadow-2xl w-[95vw] sm:w-96 h-[80vh] max-h-[450px] mb-[70px] md:mb-[100px] flex flex-col transition-all duration-300 transform ${isOpen
          ? "translate-y-0 translate-x-0 scale-100 opacity-100"
          : "translate-y-96 translate-x-44 scale-0 opacity-0"
          } ${isAttentionEffect ? "animate-gentle-bounce" : ""}`}
        onTransitionEnd={() => !isOpen && setChatClass("hidden")}
      >
        {isAuthenticated ? (
          <>
            {selectedTab === tabs[0] && (
              <div className="flex flex-col bg-gradient-to-br from-primary-7 via-primary-5 to-primary-3 custom-scrollbar overflow-auto scroll-2 p-6 h-full">
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="relative w-24 h-16 mb-4 flex items-center justify-center">
                    {/* Stacked icons with overlap */}
                    <div className="flex -space-x-2">
                      <div className="bg-white rounded-full shadow-lg flex items-center justify-center p-2 z-30">
                        <RiCustomerService2Fill color="#3B82F6" size={30} />
                      </div>
                      <div className="bg-white rounded-full shadow-lg flex items-center justify-center p-2 z-20">
                        <RiCustomerService2Fill color="#3B82F6" size={30} />
                      </div>
                      <div className="bg-white rounded-full shadow-lg flex items-center justify-center p-2 z-10">
                        <RiCustomerService2Fill color="#3B82F6" size={30} />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-white text-center">AI Health Assistant</h1>
                  <p className="text-lg text-primary-1 mt-2 text-center">How can we help you today?</p>
                </div>

                <div className="space-y-4 flex flex-col items-center">
                  <button
                    className="w-full bg-white text-primary-7 rounded-lg text-lg font-semibold cursor-pointer shadow-lg p-4 transition-all duration-300 hover:bg-primary-1 hover:text-primary-9 flex items-center justify-between"
                    onClick={() => handleTabChange(1)}
                  >
                    <span>Describe your symptoms</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    className="w-full bg-white text-primary-7 rounded-lg text-lg font-semibold cursor-pointer shadow-lg p-4 transition-all duration-300 hover:bg-primary-1 hover:text-primary-9 flex items-center justify-between"
                    onClick={() => navigate(PATH.dashboard.consultant)}
                  >
                    <span>Contact a consultant</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-white text-sm">
                    Our AI-powered assistant is here to help you identify potential health issues. For professional medical advice, please consult a healthcare provider.
                  </p>
                </div>
              </div>
            )}
            {selectedTab === tabs[1] && (
              <div className="flex flex-col h-full bg-gray-50">
                <div className="relative bg-primary-7 p-3 flex justify-center items-center text-white font-bold text-lg">
                  <IoMdArrowBack
                    color={"white"}
                    size={25}
                    className="absolute top-3 left-3 cursor-pointer hover:text-primary-1 transition-colors duration-300"
                    onClick={() => handleTabChange(0)}
                  />
                  AI Health Assistant
                </div>
                <div
                  id="message-area"
                  ref={messageAreaRef}
                  className="flex-1 overflow-auto custom-scrollbar p-4"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"
                        } message-enter message-enter-active`}
                    >
                      <div
                        className={`inline-block max-w-[75%] ${message.sender === "user"
                          ? "bg-primary-7 text-white"
                          : "bg-white text-gray-800"
                          } rounded-2xl p-3 shadow-md`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.showConsultantOption && (
                          <button
                            onClick={() => navigate(PATH.dashboard.consultant)}
                            className="mt-2 bg-secondary-1 text-white px-3 py-1 rounded-full text-xs hover:bg-secondary-2 transition-colors duration-300"
                          >
                            Contact a Consultant
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-center items-center h-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-7"></div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="bg-white p-4 flex items-center">
                  <input
                    type="text"
                    placeholder="Describe your symptoms..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primary-7"
                  />
                  <button
                    type="submit"
                    className="bg-primary-7 text-white p-2 rounded-full hover:bg-primary-8 transition-colors duration-300"
                  >
                    <FaPaperPlane size={20} />
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-primary-7 via-primary-5 to-primary-3 p-6 text-white">
            <RiCustomerService2Fill className="text-6xl mb-6" />
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-center mb-6 text-primary-1">
              Please log in or sign up to use the AI chat feature.
            </p>
            <div className="flex flex-col space-y-3 w-full max-w-xs">
              <button
                onClick={() => navigate(PATH.general.loginCrossroad)}
                className="w-full bg-white text-primary-7 px-6 py-2 rounded-full hover:bg-primary-1 transition-colors duration-300"
              >
                Log In
              </button>
              <button
                onClick={() => navigate(PATH.general.signUp)}
                className="w-full bg-transparent text-white px-6 py-2 rounded-full border-2 border-white hover:bg-white hover:text-primary-7 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={toggleChatBot}
        className={`absolute bottom-0 right-0 bg-primary-7 text-white rounded-full p-3 shadow-lg hover:bg-primary-8 transition-all duration-300 ${isAttentionEffect ? "animate-pulse" : ""
          }`}
      >
        {isOpen ? (
          <BsX className="rotate-pop" size={30} />
        ) : (
          <BsRobot className="rotate-pop" size={30} />
        )}
      </button>
    </div>
  );
};

export default ChatBot;
