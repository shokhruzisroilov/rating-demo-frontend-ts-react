import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, XCircle } from 'lucide-react'

interface ActivePeriodCardProps {
	data: any
}

export function ActivePeriodCard({ data }: ActivePeriodCardProps) {

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Calendar className='h-5 w-5' />
					Faol Reyting Davri
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<h3 className='font-semibold text-lg'>{data.activePeriod.name}</h3>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div className='space-y-1'>
						<div className='flex items-center gap-2 text-sm'>
							<CheckCircle className='h-4 w-4 text-green-500' />
							<span>Ma'lumot kiritgan:</span>
						</div>
						<div className='text-2xl font-bold'>
							{data.activePeriod.universitiesWithData}
						</div>
					</div>

					<div className='space-y-1'>
						<div className='flex items-center gap-2 text-sm'>
							<XCircle className='h-4 w-4 text-red-500' />
							<span>Ma'lumot kiritmagan:</span>
						</div>
						<div className='text-2xl font-bold'>
							{data.activePeriod.universitiesWithoutData}
						</div>
					</div>
				</div>

				<div className='space-y-2'>
					<div className='flex justify-between'>
						<span className='text-sm font-medium'>To'ldirilganlik</span>
						<span className='text-sm font-bold'>
							{data.activePeriod.dataCompletionPercentage.toFixed(1)}%
						</span>
					</div>
					<div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
						<div
							className='h-full bg-green-500 rounded-full'
							style={{
								width: `${data.activePeriod.dataCompletionPercentage}%`,
							}}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
