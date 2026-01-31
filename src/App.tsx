import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { Home, Login, NotFound } from './pages'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
