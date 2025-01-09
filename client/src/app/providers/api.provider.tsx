import React, { useEffect } from 'react';
import { api } from '../../shared/api';
import { authService } from '@/shared/api/services/auth.service';

export function ApiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken',
      )}`;
      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await authService.refresh();
            localStorage.setItem('accessToken', response.tokens.accessToken);
            return api(originalRequest);
          } catch (err) {
            console.error('Token refresh failed:', err);
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  }, []);

  return children;
}
