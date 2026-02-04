import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminSideBar from './AdminSideBar'
import Header from './Header'

const Layout = () => {
	const user = useAuthStore(state => state.user)

	return (
		<div>
			<Header />
			<main className='w-full flex items-start'>
				{user?.role === 'ADMIN' && <AdminSideBar />}
				<div className='w-[88vw] p-4'>
					<Outlet />
				</div>
			</main>
		</div>
	)
}

export default Layout
