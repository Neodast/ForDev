import axios from 'axios';
import AuthService from '../services/AuthService';

export const API_URL = 'http://localhost:3000';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.code === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
  },
);

export default api;
