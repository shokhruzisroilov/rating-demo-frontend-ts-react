import InfoCircle from '@/assets/icons/info-circle.svg?react'
import type { ChangeEvent, FC } from 'react'
import { Input } from '../ui/input'

interface LabeledInputWithInfoProps {
	label: string
	type?: React.HTMLInputTypeAttribute
	value?: string | number
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

const LabeledInputWithInfo: FC<LabeledInputWithInfoProps> = ({
	label,
	type,
	value,
	onChange,
	placeholder,
}) => {
	return (
		<div className='w-full'>
			<div className='flex items-center justify-between mb-1'>
				<p className='font-bold text-[14px] truncate'>{label}</p>
				<InfoCircle className='w-4 h-4 cursor-pointer' />
			</div>

			<Input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
				className='h-12.5 rounded-xl bg-[#F4F6FC]'
			/>
		</div>
	)
}

export default LabeledInputWithInfo
