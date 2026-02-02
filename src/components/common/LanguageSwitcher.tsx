import UzFlag from '@/assets/flags/uz.png'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import { useState } from 'react'
import { Button } from '../ui/button'

const languages = [{ value: 'uz', label: 'O‘zbekcha', flag: UzFlag }]

const LanguageSwitcher = () => {
	const [lang] = useState(languages[0])
	return (
		<Button
			variant='outline'
			className='h-10.5 rounded-[10px] p-3 cursor-pointer border border-[#E2E6F5]'
		>
			<img src={lang.flag} alt={lang.label} className='w-5 h-5 rounded-full' />
			<span>{lang.label}</span>
			<img src={ChevronDown} alt='chevron-down' />
		</Button>
	)
}

export default LanguageSwitcher
