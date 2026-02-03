import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const { accessToken, loadFromStorage } = useAuthStore()
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		const localToken = localStorage.getItem('accessToken')

		if (localToken) {
			loadFromStorage()
		}

		// Kichik kechikish
		const timer = setTimeout(() => {
			setIsChecking(false)
		}, 100)

		return () => clearTimeout(timer)
	}, [loadFromStorage])

	if (isChecking) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		)
	}

	const localToken = localStorage.getItem('accessToken')
	if (!accessToken && !localToken) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoute
