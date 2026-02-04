import InfoCircle from '@/assets/icons/info-circle.svg?react'
import type { ForwardedRef, InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { Input } from '../ui/input'

interface LabeledInputWithInfoProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
}

const LabeledInputWithInfo = forwardRef<
	HTMLInputElement,
	LabeledInputWithInfoProps
>(({ label, error, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<div className='w-full'>
			<div className='flex items-center justify-between mb-1'>
				<p className='font-bold text-[14px] truncate'>{label}</p>
				<InfoCircle style={{ width: '16px', height: '16px' }} />
			</div>

			<Input
				{...props}
				ref={ref}
				className={`h-12.5 rounded-xl bg-[#F4F6FC] ${error ? 'border-red-500' : ''}`}
			/>
			{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
		</div>
	)
})

LabeledInputWithInfo.displayName = 'LabeledInputWithInfo'

export default LabeledInputWithInfo
