import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from '../utils/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../states/popUpSlice';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';
import { loginUser } from '../states/user/authSlice';

const apiUrl = import.meta.env.VITE_API_URL;

const OTPModal = ({ isOpen, email, userInfo }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      } else {
        setIsResendDisabled(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (!value && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text').slice(0, 6).split('');
    setOtp(pastedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/users/verify-otp`, {
        email,
        otp: otpValue,
      });
      setMessage(response.data.message);
      setError('');
      setIsResendDisabled(true);
      setResendTimer(60);
      dispatch(hideModal());
      dispatch(loginUser(userInfo))
      navigate(PATH.general.congratulations);
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
      setMessage('');
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(`${apiUrl}/api/users/resend-otp`, { email });
      setMessage('OTP has been resent to your email');
      setError('');
      setIsResendDisabled(true);
      setResendTimer(60);
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
      setMessage('');
    }
  };

  const handleClose = () => {
    dispatch(hideModal({ content: "OTP verification" }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
          <button onClick={handleClose}>
            <FaTimes className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <p className="m-auto flex justify-center pb-4 text-gray-3">Please verify OTP sent to your email</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleOTPChange(e, index)}
                onPaste={handlePaste}
                maxLength={1}
                data-index={index}
                className="mt-1 w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ))}
          </div>
          {message && (
            <p className="text-green-500 font-semibold mb-4">{message}</p>
          )}
          {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-4 bg-primary-7 text-white font-semibold rounded-md hover:bg-primary-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Resend OTP ({isResendDisabled ? resendTimer : 'Resend'})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;
