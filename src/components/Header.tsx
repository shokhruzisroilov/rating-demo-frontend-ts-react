import UserImage from '@/assets/icons/avatar.svg'
import BellIcon from '@/assets/icons/bell-icon.svg?react'
import MenuIcon from '@/assets/icons/menu-icon.svg?react'
import MoonIcon from '@/assets/icons/moon-icon.svg?react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/authStore'
import { LogOutIcon, MailIcon, ShieldCheckIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from './common/LanguageSwitcher'
import { Button } from './ui/button'

const Header = () => {
	const navigate = useNavigate()
	const logout = useAuthStore(state => state.logout)
	const user = useAuthStore(state => state.user)

	const handleLogout = async () => {
		await logout()
		navigate('/login', { replace: true })
	}
	return (
		<header className='flex items-center justify-between px-6 py-3 bg-[#FFFFFF]'>
			{/* left items */}
			<div className='flex gap-4'>
				<MenuIcon className='w-6 h-6 cursor-pointer' />
				<h1 className='font-semibold text-base text-[#282F3D]'>Bosh sahifa</h1>
			</div>

			{/* Right items */}
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						className='border border-[#E2E6F5] rounded-[10px] w-9.5 h-9.5 cursor-pointer'
					>
						<MoonIcon className='w-4.5 h-4.5' />
					</Button>
					<Button
						variant='outline'
						className='border border-[#E2E6F5] rounded-[10px] w-9.5 h-9.5 cursor-pointer'
					>
						<BellIcon className='w-4.5 h-4.5' />
					</Button>
					<div className='max-md:hidden'>
						<LanguageSwitcher />
					</div>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<Avatar>
								<AvatarImage src={UserImage} alt='shadcn' />
								<AvatarFallback>LR</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<UserIcon />
								Ism: {user && user.fullName}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MailIcon />
								Email: {user && user.email}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ShieldCheckIcon />
								Role: {user && user.role}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOutIcon />
							Chiqish
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default Header
