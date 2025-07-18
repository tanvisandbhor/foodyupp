// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // or your deployed URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
