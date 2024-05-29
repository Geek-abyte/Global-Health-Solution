// src/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-endpoint.com/api', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
