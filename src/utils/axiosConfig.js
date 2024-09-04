// src/utils/axios.js
import axios from "axios";
import { getToken } from "./helperFunctions";

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
