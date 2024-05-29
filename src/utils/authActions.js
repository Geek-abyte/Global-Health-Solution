import axiosInstance from './axiosConfig'; // Import the configured Axios instance

// Register user
export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

// Verify OTP
export const verifyOTP = async (otpData) => {
  const response = await axiosInstance.post('/users/verify-otp', otpData);
  return response.data;
};

// Resend OTP
export const resendOTP = async (email) => {
  const response = await axiosInstance.post('/users/resend-otp', { email });
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axiosInstance.post('/users/login', userData);
  return response.data;
};

// Request password reset
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/users/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post(`/users/reset-password/${token}`, { password });
  return response.data;
};
