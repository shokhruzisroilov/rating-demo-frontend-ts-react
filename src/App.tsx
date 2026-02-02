import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { Home, Login, NotFound } from './pages'
import CalculationResult from './pages/CalculationResult'

function App() {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					{/* Protected routes */}
					<Route element={<ProtectedRoute />}>
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							<Route
								path='calculation/:universityId/:periodId'
								element={<CalculationResult />}
							/>
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
