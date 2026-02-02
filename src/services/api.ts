import { useAuthStore } from '@/store/authStore'
import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL,
})

// Request interceptor
api.interceptors.request.use(config => {
	const token = useAuthStore.getState().accessToken
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

// Response interceptor
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const newToken = await useAuthStore.getState().refreshTokenFunc()
			if (newToken) {
				originalRequest.headers.Authorization = `Bearer ${newToken}`
				return axios(originalRequest)
			}
		}
		return Promise.reject(error)
	},
)

export default api
