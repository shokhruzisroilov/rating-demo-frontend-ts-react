import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { Home, Login, NotFound } from './pages'
import AdminHome from './pages/AdminHome'
import CalculationResult from './pages/CalculationResult'
import { useAuthStore } from './store/authStore'

function App() {
	const queryClient = new QueryClient()
	const { loadFromStorage } = useAuthStore()
	const user = useAuthStore(state => state.user)

	useEffect(() => {
		loadFromStorage()
	}, [loadFromStorage])

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					{/* Protected routes */}
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Layout />}>
							{user && user.role === 'UNIVERSITY_ADMIN' && (
								<>
									<Route index element={<Home />} />
									<Route
										path='calculation/:universityId/:periodId'
										element={<CalculationResult />}
									/>
								</>
							)}
							{user && user.role === 'ADMIN' && (
								<>
									<Route index element={<AdminHome />} />
								</>
							)}
						</Route>
					</Route>

					{/* Public routes */}
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>

				<ToastContainer position='top-right' autoClose={3000} />
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
