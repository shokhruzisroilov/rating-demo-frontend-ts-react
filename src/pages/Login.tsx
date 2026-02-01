import UzFlag from '@/assets/flags/uz.png'
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg?react'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import Eye from '@/assets/icons/eye.svg?react'
import InstagramIcon from '@/assets/icons/instagram-icon.svg?react'
import LinkdeninIcon from '@/assets/icons/linkedin-icon.svg?react'
import LoginIcon from '@/assets/icons/login-icon.svg?react'
import PasswordIcon from '@/assets/icons/password-icon.svg?react'
import TelegramIcon from '@/assets/icons/telegram-icon.svg?react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const languages = [{ value: 'uz', label: 'O‘zbekcha', flag: UzFlag }]

const Login = () => {
	const [lang] = useState(languages[0])

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
			<div className='w-full md:w-1/2 h-full p-6 flex flex-col justify-start'>
				{/* language button */}
				<div className='flex justify-end'>
					<Button
						variant='outline'
						className='h-[42px] rounded-[10px] p-3 cursor-pointer border border-[#E2E6F5]'
					>
						<img
							src={lang.flag}
							alt={lang.label}
							className='w-5 h-5 rounded-full'
						/>
						<span>{lang.label}</span>
						<img src={ChevronDown} alt='chevron-down' />
					</Button>
				</div>

				{/* login inputs */}
				<div className='w-full flex justify-center md:px-10 mt-20'>
					<form className='w-full md:w-[500px]'>
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
									className='w-full h-[60px] pl-12 border border-[#E2E6F5] rounded-2xl placeholder:text-base placeholder:text-[#697696]'
								/>
								<LoginIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400' />
							</div>

							<div className='relative'>
								<Input
									placeholder='Password'
									className='w-full h-[60px] pl-12 border border-[#E2E6F5] rounded-2xl placeholder:text-base placeholder:text-[#697696]'
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
							<span className='text-base font-[600]'>Davom etish</span>
							<ArrowNarrowRight className='w-6 h-6 transition-transform duration-300 ease-out group-hover:translate-x-2' />
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
