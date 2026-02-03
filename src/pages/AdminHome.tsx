import EditIcon from '@/assets/icons/edit-icon.svg?react'
import InfoCircle from '@/assets/icons/info-circle.svg?react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useRatingPeriods } from '@/hooks/useRatingPeriods.ts'
import { useCalculateRatings } from '@/hooks/useRatings'
import { useEffect, useState } from 'react'

interface SelectedPeriod {
	id: number
	name: string
}

type SortDirection = 'asc' | 'desc'

const AdminHome = () => {
	const [showWelcomeModal, setShowWelcomeModal] = useState(false)
	const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod | null>(
		null,
	)

	// ====== Davrlar ======
	const {
		data: ratingPeriods,
		isLoading: periodsLoading,
		isError: periodsError,
	} = useRatingPeriods()

	const periodId = selectedPeriod?.id

	// ====== Calculate ======
	const {
		mutate: calculateRatings,
		data: ratings,
		isPending: ratingsLoading,
		error: ratingsError,
	} = useCalculateRatings()

	// ====== Sorting ======
	const [sortKey, setSortKey] = useState<string | null>(null)
	const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

	const handleSort = (key: string) => {
		if (['rank', 'universityName', 'compositeScore'].includes(key)) {
			if (sortKey === key) {
				setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
			} else {
				setSortKey(key)
				setSortDirection('asc')
			}
			return
		}

		// Display name orqali backend keyni topish
		const reverseMap = Object.fromEntries(
			Object.entries(indicatorsMap).map(([k, v]) => [v, k]),
		)
		const actualKey = reverseMap[key] || key

		if (sortKey === actualKey) {
			setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
		} else {
			setSortKey(actualKey)
			setSortDirection('asc')
		}
	}

	// ====== localStorage ======
	useEffect(() => {
		const stored = localStorage.getItem('selectedAcademicYear')
		if (stored) {
			try {
				setSelectedPeriod(JSON.parse(stored))
			} catch {
				localStorage.removeItem('selectedAcademicYear')
				setShowWelcomeModal(true)
			}
		} else {
			setShowWelcomeModal(true)
		}
	}, [])

	// ====== Select year ======
	const handleSelectYear = (id: number) => {
		const period = ratingPeriods?.find(p => p.id === id)
		if (!period) return

		const selected = { id: period.id, name: period.name }
		setSelectedPeriod(selected)
		localStorage.setItem('selectedAcademicYear', JSON.stringify(selected))
		setShowWelcomeModal(false)
	}

	// ====== Calculate ======
	const handleCalculate = () => {
		if (!periodId) return
		calculateRatings(periodId)
	}

	// ====== Loading / Error ======
	if (periodsLoading) return <p>Davrlar yuklanmoqda...</p>
	if (periodsError) return <p>Davrlarni yuklashda xatolik</p>

	// ====== Static indicators mapping ======
	const indicatorsMap: Record<string, string> = {
		indicator1_weighted:
			'Ilmiy daraja (unvon)ga ega professor-oʻqituvchilar ulushi',
		indicator2_weighted:
			'Ilmiy darajaga ega bo‘lgan professor-o‘qituvchilar o‘rtacha yoshi*',
		indicator3_weighted:
			'Xorijiy oliy taʼlim tashkilotlarida olingan ilmiy daraja va magistratura diplomlariga ega professor-oʻqituvchilar ulushi',
		indicator4_weighted:
			'Taʼlim va ilmiy jarayonlarga jalb qilingan xorijiy professor-oʻqituvchilar ulushi',
		indicator5_weighted:
			'Professor-oʻqituvchilar sonining talabalar soniga nisbati',
		indicator6_weighted:
			'Scopus maʼlumotlar bazasining indekslanuvchi jurnallarida nashr etilgan maqolalar',
		indicator7_weighted:
			'Xalqaro maʼlumotlar bazalarida iqtiboslik koʻrsatkichi',
		indicator8_weighted:
			'Professor-oʻqituvchilarning “Xirsh” indeksi (h-index)',
		indicator9_weighted:
			'Ixtiro, foydali model, sanoat namunalari va seleksiya yutuqlari uchun patentlar ulushi',
		indicator10_weighted: 'Scopus maʼlumotlar bazasida qayd etilgan patentlar',
		indicator10_1_weighted:
			'Oliy ta’lim tashkilotining spin-off korxonalari faoliyati',
		indicator10_2_weighted:
			'Ilm-fan va innovatsiyani rivojlantirishga yo‘naltirilgan mablag‘lar',
		indicator11_weighted: 'Jalb etilgan mablagʻlar',
		indicator12_weighted:
			'Oliy ta’limdan keyingi ta’lim boʻyicha kadrlar tayyorlash samaradorligi',
		indicator13_weighted:
			'Xorijiy davlat fuqarosi hisoblangan talabalar ulushi',
		indicator14_weighted: 'Talabalarning xalqaro akademik mobilligi',
		indicator15_weighted:
			'Professor-oʻqituvchilarning xalqaro akademik mobilligi',
		indicator16_weighted:
			'Xorijiy oliy ta’lim tashkilotlar bilan tashkil etilgan qoʻshma taʼlim dasturlari samaradorligi',
		indicator17_weighted: 'Bitiruvchilarning bandlik holati',
		indicator18_weighted: 'Bitiruvchilarning ishga joylashish muddati',
	}

	// ====== Sorted ratings ======
	const sortedRatings = [...(ratings ?? [])].sort((a, b) => {
		if (!sortKey) return 0

		let aValue: any
		let bValue: any

		if (sortKey === 'rank') {
			aValue = a.rank
			bValue = b.rank
		} else if (sortKey === 'universityName') {
			aValue = a.universityName
			bValue = b.universityName
		} else if (sortKey === 'compositeScore') {
			aValue = a.compositeScore
			bValue = b.compositeScore
		} else {
			aValue = a.weightedScores[sortKey]
			bValue = b.weightedScores[sortKey]
		}

		if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
		if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
		return 0
	})

	// ====== Sort Icon ======
	const SortIcon = ({ active }: { active: boolean }) => (
		<span className='ml-1 text-xs'>
			{!active ? '⇅' : sortDirection === 'asc' ? '↑' : '↓'}
		</span>
	)

	return (
		<div className='p-5'>
			{/* ====== Select Period Modal ====== */}
			<Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
				<DialogContent className='sm:max-w-md rounded-4xl'>
					<DialogHeader className='flex flex-col items-center gap-2'>
						<InfoCircle width={64} height={64} />
						<DialogTitle className='my-4 text-[24px] font-bold'>
							O‘quv davrini tanlang
						</DialogTitle>
					</DialogHeader>

					<Select
						value={selectedPeriod?.id?.toString() ?? ''}
						onValueChange={val => handleSelectYear(Number(val))}
					>
						<SelectTrigger className='w-full bg-[#F4F6FC] rounded-xl py-6'>
							<SelectValue placeholder='O‘quv yilini tanlang' />
						</SelectTrigger>

						<SelectContent className='bg-[#F4F6FC]'>
							{ratingPeriods?.map(period => (
								<SelectItem key={period.id} value={period.id.toString()}>
									{period.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Button
						onClick={() =>
							selectedPeriod && handleSelectYear(selectedPeriod.id)
						}
						disabled={!selectedPeriod}
						className='mt-8 h-13 rounded-xl bg-[#4076FF]'
					>
						Saqlash
					</Button>
				</DialogContent>
			</Dialog>

			{/* ====== Header ====== */}
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Universitetlar reytinglari</h1>

				<div className='flex items-center gap-3'>
					{periodId && (
						<Button
							variant='outline'
							className='h-13 rounded-xl bg-[#F4F6FC]'
							onClick={() => setShowWelcomeModal(true)}
						>
							O‘quv davri:
							<strong className='ml-1'>{selectedPeriod?.name}</strong>
							<EditIcon className='ml-2 h-5 w-5' />
						</Button>
					)}

					<Button
						onClick={handleCalculate}
						disabled={!periodId || ratingsLoading}
						className='h-13 rounded-xl bg-[#4076FF] hover:bg-[#4076FF] cursor-pointer'
					>
						{ratingsLoading ? 'Hisoblanmoqda...' : 'Hisoblash'}
					</Button>
				</div>
			</div>

			{/* ====== Error ====== */}
			{ratingsError && (
				<p className='mb-4 text-red-500'>
					Xatolik: {(ratingsError as Error).message}
				</p>
			)}

			{/* ====== TABLE ====== */}
			{ratings && ratings.length > 0 && (
				<div className='overflow-x-auto rounded-2xl border bg-white shadow-sm'>
					<table className='w-full border-collapse text-sm'>
						<thead className='bg-[#F4F6FC]'>
							<tr>
								<th
									className='border px-3 py-2 text-center cursor-pointer select-none whitespace-nowrap min-w-20'
									onClick={() => handleSort('rank')}
								>
									T/r <SortIcon active={sortKey === 'rank'} />
								</th>

								<th
									className='border px-3 py-2 text-left cursor-pointer select-none whitespace-nowrap min-w-[320px]'
									onClick={() => handleSort('universityName')}
								>
									Oliy ta'lim tashkilotining nomi{' '}
									<SortIcon active={sortKey === 'universityName'} />
								</th>

								{Object.entries(indicatorsMap).map(
									([backendKey, displayName]) => (
										<th
											key={backendKey}
											className='border px-3 py-2 text-center cursor-pointer select-none whitespace-nowrap min-w-75'
											onClick={() => handleSort(displayName)}
										>
											<div className='flex items-center justify-center gap-1'>
												<span className='text-sm leading-tight'>
													{displayName}
												</span>
												<SortIcon active={sortKey === backendKey} />
											</div>
										</th>
									),
								)}

								<th
									className='border px-3 py-2 text-center cursor-pointer select-none whitespace-nowrap min-w-37.5'
									onClick={() => handleSort('compositeScore')}
								>
									Umumiy ball <SortIcon active={sortKey === 'compositeScore'} />
								</th>
							</tr>
						</thead>

						<tbody>
							{sortedRatings.map(item => (
								<tr key={item.universityId} className='hover:bg-gray-50'>
									<td className='border px-3 py-2 text-center font-medium'>
										{item.rank}
									</td>

									<td className='border px-3 py-2 font-semibold'>
										{item.universityName}
									</td>

									{Object.keys(indicatorsMap).map(key => (
										<td key={key} className='border px-3 py-2 text-center'>
											{item.weightedScores[key]}
										</td>
									))}

									<td className='border px-3 py-2 text-center font-bold text-blue-600'>
										{item.compositeScore}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default AdminHome
