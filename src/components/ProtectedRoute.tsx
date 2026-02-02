import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const { accessToken, loadFromStorage } = useAuthStore()

	useEffect(() => {
		loadFromStorage()
	}, [])

	if (!accessToken) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoute
