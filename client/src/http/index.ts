import axios from 'axios';
import AuthService from './services/authService';

export const API_URL = 'http://localhost:3000';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._retry
		) {
			originalRequest._retry = true
			try {
				const response = await AuthService.refresh()

				localStorage.setItem('accessToken', response.data.accessToken)
				return api.request(originalRequest)
			} catch (error) {
				console.log(error)
				try {
					if (localStorage.getItem('accessToken')) {
						await AuthService.logout()

						localStorage.removeItem('accessToken')
					}
				} catch (error) {
					console.log(error)
				} finally {
					location.href = `${String(
						process.env.NEXT_PUBLIC_CLIENT_URL,
					)}/account/login`
				}
			}
		}

		throw error
	},
)

export default api;
