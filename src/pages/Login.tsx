import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg?react'
import Eye from '@/assets/icons/eye.svg?react'
import InstagramIcon from '@/assets/icons/instagram-icon.svg?react'
import LinkdeninIcon from '@/assets/icons/linkedin-icon.svg?react'
import LoginIcon from '@/assets/icons/login-icon.svg?react'
import PasswordIcon from '@/assets/icons/password-icon.svg?react'
import TelegramIcon from '@/assets/icons/telegram-icon.svg?react'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {
	return (
		<div className='h-screen flex p-5'>
			{/* login left banner */}
			<div className='max-md:hidden w-1/2 h-full bg-linear-to-b from-[#2F83F9] to-[#0B4EA8] rounded-4xl flex justify-between items-end p-12'>
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
			<div className='w-full md:w-1/2 h-full p-6 flex flex-col justify-center relative'>
				{/* language button */}
				<div className='absolute top-6 right-6'>
					<LanguageSwitcher />
				</div>

				{/* login inputs */}
				<div className='w-full flex justify-center md:px-10 mt-20'>
					<form className='w-full md:w-125'>
						<h1 className='font-bold text-[28px] text-[#282F3D]'>
							Tizimga kirish
						</h1>
						<p className='font-normal text-base text-[#697696] mt-2'>
							Kabinetga kirish oynasi
						</p>
						<div className='space-y-4 py-8'>
							<div className='relative'>
								<Input
									placeholder='Login'
									className='w-full h-15 pl-12 border border-[#E2E6F5] rounded-2xl placeholder:text-base placeholder:text-[#697696]'
								/>
								<LoginIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400' />
							</div>

							<div className='relative'>
								<Input
									placeholder='Password'
									className='w-full h-15 pl-12 border border-[#E2E6F5] rounded-2xl placeholder:text-base placeholder:text-[#697696]'
									type='password'
								/>

								<PasswordIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400' />

								<Eye className='absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 cursor-pointer' />
							</div>
						</div>

						<Button
							type='submit'
							className='w-full h-16 rounded-2xl bg-[#3286FB] hover:bg-[#3286FB] cursor-pointer shadow-[0px_1px_4px_0px_#25282D0D] flex gap-2 group'
						>
							<span className='text-base font-semibold'>Davom etish</span>
							<ArrowNarrowRight className='w-6 h-6 transition-transform duration-300 ease-out group-hover:translate-x-2' />
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
