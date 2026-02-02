import type { AuthResponse } from '@/types/auth'
import api from './api'

export const loginApi = (email: string, password: string) =>
	api.post<AuthResponse>('/auth/login', { email, password })

export const logoutApi = () => api.post('/auth/logout')

export const refreshTokenApi = (refreshToken: string) =>
	api.post<AuthResponse>('/auth/refresh', null, {
		headers: { Authorization: `Bearer ${refreshToken}` },
	})
