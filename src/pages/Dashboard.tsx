'use client'

import { ActivePeriodCard } from '@/components/dashboard/ActivePeriodCard'
import { DataCompletionChart } from '@/components/dashboard/DataCompletionChart'
import { RegionDistributionChart } from '@/components/dashboard/RegionDistributionChart'
import { StatCards } from '@/components/dashboard/StatCards'
import { TopUniversitiesTable } from '@/components/dashboard/TopUniversitiesTable'
import { UniversityTypeChart } from '@/components/dashboard/UniversityTypeChart'
import { CardTitle } from '@/components/ui/card'
import { useDashboard } from '@/hooks/useDashboard'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
	const { data, isLoading, error } = useDashboard()

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='flex flex-col items-center gap-4'>
					<Loader2 className='h-8 w-8 animate-spin' />
					<p className='text-lg'>Dashboard yuklanmoqda...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='text-center'>
					<h2 className='text-xl font-bold text-red-600'>Xatolik yuz berdi</h2>
					<p className='text-gray-600'>
						Dashboard ma'lumotlarini yuklashda xatolik
					</p>
				</div>
			</div>
		)
	}

	if (!data) return null

	return (
		<div className='container mx-auto p-4 space-y-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='text-sm text-muted-foreground'>
					{new Date().toLocaleDateString('uz-UZ')}
				</div>
			</div>

			<StatCards data={data} />

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<UniversityTypeChart data={data.universityTypeDistribution} />
				<RegionDistributionChart data={data.regionDistribution} />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<ActivePeriodCard data={data} />
				<DataCompletionChart data={data} />
				<div className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle>Umumiy Ko'rsatkichlar</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<span>O'rtacha Kompozit Ball:</span>
									<span className='font-bold'>
										{data.averageIndicators.compositeScore_avg.toFixed(1)}
									</span>
								</div>
								<div className='flex justify-between'>
									<span>Faol Universitetlar:</span>
									<span className='font-bold'>
										{data.generalStatistics.activeUniversities}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<TopUniversitiesTable data={data.topUniversities} />
		</div>
	)
}

// Helper Card component for the page
const Card = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => (
	<div className={`rounded-lg border bg-white shadow-sm ${className}`}>
		{children}
	</div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
	<div className='border-b p-4'>
		<h3 className='font-semibold'>{children}</h3>
	</div>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
	<div className='p-4'>{children}</div>
)
