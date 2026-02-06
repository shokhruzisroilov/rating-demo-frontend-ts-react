import InfoCircle from '@/assets/icons/info-circle.svg?react'
import type { ForwardedRef, InputHTMLAttributes } from 'react'
import { forwardRef, useState } from 'react'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface LabeledInputWithInfoProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
}

const LabeledInputWithInfo = forwardRef<HTMLInputElement, LabeledInputWithInfoProps>(
	({ label, error, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
		const [open, setOpen] = useState(false)

		return (
			<div className='w-full'>
				<div className='flex items-center justify-between gap-2 mb-1'>
					<p className='font-bold text-[14px] truncate'>{label}</p>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<button
								type='button'
								onMouseEnter={() => setOpen(true)}
								onMouseLeave={() => setOpen(false)}
								className='shrink-0 cursor-help'
							>
								<InfoCircle style={{ width: '16px', height: '16px' }} />
							</button>
						</PopoverTrigger>
						<PopoverContent
							className='max-w-xs text-sm'
							onMouseEnter={() => setOpen(true)}
							onMouseLeave={() => setOpen(false)}
						>
							{label}
						</PopoverContent>
					</Popover>
				</div>

				<Input
					{...props}
					ref={ref}
					className={`h-12.5 rounded-xl bg-[#F4F6FC] ${error ? 'border-red-500' : ''}`}
				/>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
			</div>
		)
	}
)

LabeledInputWithInfo.displayName = 'LabeledInputWithInfo'

export default LabeledInputWithInfo
