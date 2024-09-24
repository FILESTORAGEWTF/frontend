import axios from 'axios';

const APIService = axios.create();

APIService.interceptors.request.use(
  async (config) => {
    config.baseURL = 'http://localhost:3000';
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export { APIService };
