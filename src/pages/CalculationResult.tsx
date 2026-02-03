import { useCalculationQuery } from '@/hooks/useCalculations'
import { useNavigate, useParams } from 'react-router-dom'

const CalculationResult = () => {
	const { universityId, periodId } = useParams()
	const navigate = useNavigate()

	const INDICATORS = [
		{
			key: 'indicator1',
			title: 'Ilmiy daraja (unvon)ga ega professor-o‘qituvchilar ulushi (%)',
		},
		{
			key: 'indicator2',
			title: 'Ilmiy darajaga ega professor-o‘qituvchilarning o‘rtacha yoshi',
		},
		{
			key: 'indicator3',
			title: 'Xorijiy OTMlarda olingan ilmiy darajaga ega P-O ulushi (%)',
		},
		{
			key: 'indicator4',
			title: 'Ta’lim va ilmiy jarayonga jalb qilingan xorijiy P-O ulushi (%)',
		},
		{
			key: 'indicator5',
			title: 'Professor-o‘qituvchilar sonining talabalar soniga nisbati',
		},
		{ key: 'indicator6', title: 'Scopus jurnallarida nashr etilgan maqolalar' },
		{
			key: 'indicator7',
			title: 'Xalqaro ma’lumotlar bazalarida iqtiboslik ko‘rsatkichi',
		},
		{
			key: 'indicator8',
			title: 'Professor-o‘qituvchilarning h-index medianasi',
		},
		{ key: 'indicator9', title: 'Patentlar ulushi' },
		{ key: 'indicator10', title: 'Scopus’da qayd etilgan patentlar' },
		{
			key: 'indicator10_1',
			title: 'Oliy ta’lim tashkilotining spin-off korxonalari faoliyati',
		},
		{
			key: 'indicator10_2',
			title:
				'Ilm-fan va innovatsiyani rivojlantirishga yo‘naltirilgan mablag‘lar',
		},
		{ key: 'indicator11', title: 'Jalb etilgan mablag‘lar' },
		{
			key: 'indicator12',
			title: 'Oliy ta’limdan keyingi ta’lim samaradorligi',
		},
		{
			key: 'indicator13',
			title: 'Xorijiy davlat fuqarosi bo‘lgan talabalar ulushi (%)',
		},
		{
			key: 'indicator14',
			title: 'Talabalarning xalqaro akademik mobilligi (%)',
		},
		{
			key: 'indicator15',
			title: 'Professor-o‘qituvchilarning xalqaro akademik mobilligi (%)',
		},
		{
			key: 'indicator16',
			title: 'Xorijiy OTMlar bilan qo‘shma ta’lim dasturlari samaradorligi (%)',
		},
		{
			key: 'indicator17',
			title: 'Bitiruvchilarning ishga joylashish samaradorligi (%)',
		},
		{ key: 'indicator18', title: 'Bitiruvchilarning ishga joylashish muddati' },
	]

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
					Orqaga qaytish
				</button>
			</div>
		)

	return (
		<div className='min-h-screen bg-gray-50 p-4 md:p-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<div className='flex items-center gap-4 mb-6'>
					<button
						onClick={() => navigate(-1)}
						className='flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors'
						aria-label='Orqaga qaytish'
					>
						&lt; {/* simplified back arrow */}
					</button>
					<div>
						<h1 className='text-2xl font-bold text-gray-800'>
							Hisoblash natijalari
						</h1>
						<p className='text-gray-500'>Universitet reyting tahlili</p>
					</div>
				</div>

				<div className='bg-white rounded-2xl shadow-sm p-6'>
					{/* University info */}
					<div className='mb-8'>
						<h2 className='text-xl font-bold text-gray-800 mb-1'>
							{data.universityName}
						</h2>
						<p className='text-gray-600'>{data.periodName}</p>
						<div className='w-20 h-1 bg-blue-500 mt-2 rounded-full'></div>
					</div>

					{/* Indicators */}
					<div className='mb-8'>
						<h3 className='text-lg font-semibold text-gray-700 mb-4'>
							Ko'rsatkichlar
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
							{INDICATORS.map(indicator => (
								<div
									key={indicator.key}
									className='bg-gray-50 border border-gray-100 p-4 rounded-xl hover:shadow-sm transition-shadow'
								>
									<div className='flex items-start justify-between mb-2 gap-2'>
										<span className='text-sm font-medium text-gray-600'>
											{indicator.title}
										</span>
										<span className='text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full'>
											#{indicator.key}
										</span>
									</div>
									<div className='text-2xl font-bold text-gray-800'>
										{data[indicator.key as keyof typeof data] as number}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CalculationResult
