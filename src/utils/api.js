// utils/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

export default axiosInstance;
