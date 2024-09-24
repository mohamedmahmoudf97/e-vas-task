import axios from 'axios';
import { BACKEND_API_BASE_URL } from './configs';

const axiosInstance = axios.create({
  baseURL: BACKEND_API_BASE_URL, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);  
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error); 
  }
);

export default axiosInstance;
