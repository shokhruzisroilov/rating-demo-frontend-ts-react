import InstagramIcon from '@/assets/icons/instagram-icon.svg?react'
import LinkdeninIcon from '@/assets/icons/linkedin-icon.svg?react'
import TelegramIcon from '@/assets/icons/telegram-icon.svg?react'

const Login = () => {
	return (
		<div className='h-screen flex p-5'>
			{/* login left banner */}
			<div className='w-3/5 h-full bg-linear-to-b from-[#2F83F9] to-[#0B4EA8] rounded-4xl flex justify-between items-end p-12'>
				<p className='text-white font-me'>
					© 2025 Barcha huquqlar himoyalangan.
				</p>
				<ul className='flex items-center gap-2'>
					<li className='p-2 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer'>
						<InstagramIcon className='w-6 h-6 text-white' />
					</li>
					<li className='p-2 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer'>
						<TelegramIcon className='w-6 h-6 text-white' />
					</li>
					<li className='p-2 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer'>
						<LinkdeninIcon className='w-6 h-6 text-white' />
					</li>
				</ul>
			</div>

			{/* login form */}
			<div className='w-2/5 h-full'></div>
		</div>
	)
}

export default Login
