import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptCall, rejectCall } from "../states/videoCallSlice";
import { hideModal, showToast } from "../states/popUpSlice";
import { useNavigate } from "react-router-dom";
import { PATH } from "../routes/path";
import { motion } from "framer-motion";
import { FaPhone, FaPhoneSlash, FaUser } from "react-icons/fa";

const IncomingCallNotification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incomingCall = useSelector((state) => state.videoCall.incomingCall);
  const currentCall = useSelector((state) => state.videoCall.currentCall);

  useEffect(() => {
    const audio = new Audio("/path/to/notification-sound.mp3");
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (currentCall && currentCall.status === "accepted") {
      console.log("Navigating to call setup page");
      navigate(`${PATH.chat.setup}/${currentCall.callId}`);
    }
  }, [currentCall, navigate]);


  if (!incomingCall) return null;

  const handleAccept = () => {
    console.log("Accepting call");
    dispatch(acceptCall({ callId: incomingCall.callId }))
      .unwrap()
      .then(() => {
        console.log("Call accepted successfully");
        dispatch(hideModal());
      })
      .catch((error) => {
        console.error("Failed to accept call:", error);
        dispatch(showToast({ message: "Failed to accept call", status: "error" }));
      });
  };

  const handleReject = () => {
    dispatch(rejectCall(incomingCall.callId)).then(() => {
      dispatch(hideModal());
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 right-4 bg-white rounded-lg shadow-2xl overflow-hidden max-w-sm"
    >
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Incoming Call</h2>
        <p className="text-sm opacity-80">Someone is trying to reach you</p>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-6">
          {incomingCall.callerImage ? (
            <>
              {console.log(incomingCall.callerImage)}
              < img
                src={incomingCall.callerImage}
                alt={incomingCall.callerName}
                className="w-20 h-20 rounded-full mr-4 object-cover border-4 border-indigo-200"
              />
            </>
          ) : (
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <FaUser className="text-indigo-500 text-3xl" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{incomingCall.callerName}</h3>
            <p className="text-indigo-600 font-medium">{incomingCall.callerSpecialty}</p>
          </div>
        </div>
        <div className="flex justify-between space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReject}
            className="flex-1 flex items-center justify-center py-3 bg-red-500 text-white rounded-lg font-semibold transition-colors hover:bg-red-600"
          >
            <FaPhoneSlash className="mr-2" />
            Decline
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAccept}
            className="flex-1 flex items-center justify-center py-3 bg-green-500 text-white rounded-lg font-semibold transition-colors hover:bg-green-600"
          >
            <FaPhone className="mr-2" />
            Accept
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default IncomingCallNotification;
