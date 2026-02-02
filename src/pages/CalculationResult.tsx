import { useCalculationQuery } from '@/hooks/useCalculations'
import { useNavigate, useParams } from 'react-router-dom'

const CalculationResult = () => {
	const { universityId, periodId } = useParams()
	const navigate = useNavigate()

	const { data, isLoading, isError } = useCalculationQuery(
		Number(universityId),
		Number(periodId),
	)

	if (isLoading)
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-lg'>Yuklanmoqda...</div>
			</div>
		)

	if (isError || !data)
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<div className='text-lg text-red-500 mb-4'>Xatolik yuz berdi</div>
				<button
					onClick={() => navigate(-1)}
					className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
				>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M10 19l-7-7m0 0l7-7m-7 7h18'
						/>
					</svg>
					Orqaga qaytish
				</button>
			</div>
		)

	return (
		<div className='min-h-screen bg-gray-50 p-4 md:p-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header with back button */}
				<div className='flex items-center gap-4 mb-6'>
					<button
						onClick={() => navigate(-1)}
						className='flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors'
						aria-label='Orqaga qaytish'
					>
						<svg
							className='w-5 h-5 text-gray-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
					</button>
					<div>
						<h1 className='text-2xl font-bold text-gray-800'>
							Hisoblash natijalari
						</h1>
						<p className='text-gray-500'>Universitet reyting tahlili</p>
					</div>
				</div>

				<div>
					{/* Main content card */}
					<div>
						<div className='bg-white rounded-2xl shadow-sm p-6'>
							{/* University info */}
							<div className='mb-8'>
								<h2 className='text-xl font-bold text-gray-800 mb-1'>
									{data.universityName}
								</h2>
								<p className='text-gray-600'>{data.periodName}</p>
								<div className='w-20 h-1 bg-blue-500 mt-2 rounded-full'></div>
							</div>

							{/* Indicators grid */}
							<div className='mb-8'>
								<h3 className='text-lg font-semibold text-gray-700 mb-4'>
									Ko'rsatkichlar
								</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
									{Array.from({ length: 17 }).map((_, i) => {
										const indicatorKey =
											`indicator${i + 1}` as keyof typeof data
										const indicatorValue = data[indicatorKey] as
											| number
											| undefined

										return (
											<div
												key={i}
												className='bg-linear-to-br from-gray-50 to-white border border-gray-100 p-4 rounded-xl hover:shadow-sm transition-shadow'
											>
												<div className='flex items-center justify-between mb-2'>
													<span className='text-sm font-medium text-gray-500'>
														Ko'rsatkich {i + 1}
													</span>
													<span className='text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full'>
														#{i + 1}
													</span>
												</div>
												<div className='text-2xl font-bold text-gray-800'>
													{indicatorValue?.toFixed(1) ?? '0.0'}
												</div>
											</div>
										)
									})}
								</div>
							</div>

							{/* Summary cards */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{/* Composite Score */}
								<div className='bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 p-5 rounded-xl'>
									<div className='flex items-center gap-3 mb-3'>
										<div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
												/>
											</svg>
										</div>
										<h4 className='text-lg font-semibold text-gray-800'>
											Kompozit ball
										</h4>
									</div>
									<div className='text-3xl font-bold text-blue-600'>
										{data.compositeScore?.toFixed(2) ?? '—'}
									</div>
									<p className='text-sm text-gray-600 mt-2'>
										Umumiy hisoblangan ball
									</p>
								</div>

								{/* Rank */}
								<div className='bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 p-5 rounded-xl'>
									<div className='flex items-center gap-3 mb-3'>
										<div className='w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
												/>
											</svg>
										</div>
										<h4 className='text-lg font-semibold text-gray-800'>
											O'rin
										</h4>
									</div>
									<div className='text-3xl font-bold text-purple-600'>
										#{data.rank ?? '—'}
									</div>
									<p className='text-sm text-gray-600 mt-2'>
										Umumiy reytingdagi o'rni
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalculationResult
