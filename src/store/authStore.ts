import { loginApi, logoutApi, refreshTokenApi } from '@/services/authServices'
import type { User } from '@/types/auth'
import { create } from 'zustand'

interface AuthState {
	user: User | null
	accessToken: string | null
	refreshToken: string | null
	expiresIn: number | null
	loading: boolean
	error: string | null

	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	refreshTokenFunc: () => Promise<string | null>
	loadFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	accessToken: null,
	refreshToken: null,
	expiresIn: null,
	loading: false,
	error: null,

	login: async (email: string, password: string) => {
		set({ loading: true, error: null })
		try {
			const res = await loginApi(email, password)
			const { accessToken, refreshToken, expiresIn, user } = res.data
			set({ accessToken, refreshToken, expiresIn, user, loading: false })
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('user', JSON.stringify(user))
		} catch (err: any) {
			const message = err.response?.data?.message || err.message
			set({ error: message, loading: false })
			throw new Error(message)
		}
	},

	logout: async () => {
		const token = get().accessToken
		if (token) {
			try {
				await logoutApi()
			} catch (err) {
				console.error(err)
			}
		}
		set({ user: null, accessToken: null, refreshToken: null, expiresIn: null })
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		localStorage.removeItem('user')
	},

	refreshTokenFunc: async () => {
		const token = get().refreshToken || localStorage.getItem('refreshToken')
		if (!token) return null
		try {
			const res = await refreshTokenApi(token)
			const {
				accessToken,
				refreshToken: newRefreshToken,
				expiresIn,
				user,
			} = res.data
			set({ accessToken, refreshToken: newRefreshToken, expiresIn, user })
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', newRefreshToken)
			return accessToken
		} catch (err) {
			get().logout()
			return null
		}
	},

	loadFromStorage: () => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')
		const user = localStorage.getItem('user')
		if (accessToken && refreshToken && user) {
			set({ accessToken, refreshToken, user: JSON.parse(user) })
		}
	},
}))
