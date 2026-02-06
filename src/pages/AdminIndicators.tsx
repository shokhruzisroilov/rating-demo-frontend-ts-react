import LabeledInputWithInfo from '@/components/home/LabeledInputWithInfo'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	useAdminIndicators,
	useSaveAdminIndicators,
	useUniversities,
} from '@/hooks/useAdminIndicators'
import type { University } from '@/services/adminIndicators'
import { AlertCircle, CheckCircle, Loader2, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AdminIndicators: React.FC = () => {
	// LocalStorage dan periodId ni olish
	const [periodId] = useState<number>(() => {
		const saved = localStorage.getItem('selectedAcademicYear')
		if (saved) {
			try {
				const parsed = JSON.parse(saved)
				return parsed.id || 2 // Default 2 (2025- kalendar y)
			} catch (e) {
				return 2
			}
		}
		return 2
	})

	const [selectedUniversityId, setSelectedUniversityId] = useState<
		number | null
	>(null)
	const [selectedUniversityName, setSelectedUniversityName] =
		useState<string>('')
	const [indicators, setIndicators] = useState({
		indicator19: 0.1,
		indicator20: 0.1,
		indicator21: 0.1,
		indicator22: 0.1,
		indicator23: 0.1,
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	// Universitetlar ro'yxatini olish
	const { data: universitiesData, isLoading: universitiesLoading } =
		useUniversities()

	// Tanlangan universitet uchun indikatorlarni olish
	const {
		data: existingIndicators,
		isLoading: indicatorsLoading,
		error: indicatorsError,
	} = useAdminIndicators(selectedUniversityId, periodId)

	// Saqlash mutation
	const {
		mutate: saveIndicators,
		isPending: isSaving,
		isSuccess: isSaved,
		error: saveError,
		reset: resetSave,
	} = useSaveAdminIndicators()

	// Universitetlar ro'yxatini olish
	const universities: University[] = universitiesData?.content || []

	// Qidiruv natijalari
	const filteredUniversities = universities.filter(university =>
		university.name.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	// Universitet tanlash
	const handleUniversitySelect = (university: University) => {
		setSelectedUniversityId(university.id)
		setSelectedUniversityName(`${university.name} (${university.code})`)
		setIsModalOpen(false)
		setSearchTerm('')
		// Yangi universitet tanlanganda save statusini reset qilish
		resetSave()
	}

	// Input maydonlarini o'zgartirish
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		// Qiymatni raqamga o'tkazish
		let numValue = parseFloat(value)

		// Agar qiymat bo'sh bo'lsa yoki raqam emas bo'lsa, 0 qilish
		if (isNaN(numValue)) {
			numValue = 0
		}

		// Manfiy qiymatlarni oldini olish
		numValue = Math.max(numValue, 0)

		setIndicators(prev => ({
			...prev,
			[name]: numValue,
		}))
	}

	// Formani yuborish
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!selectedUniversityId || !periodId) {
			alert('Iltimos, universitetni tanlang')
			return
		}

		saveIndicators({
			universityId: selectedUniversityId,
			periodId,
			...indicators,
		})
	}

	// Mavjud indikatorlar yuklanganda formani to'ldirish
	useEffect(() => {
		if (existingIndicators) {
			setIndicators({
				indicator19: existingIndicators.indicator19 ?? 0.1,
				indicator20: existingIndicators.indicator20 ?? 0.1,
				indicator21: existingIndicators.indicator21 ?? 0.1,
				indicator22: existingIndicators.indicator22 ?? 0.1,
				indicator23: existingIndicators.indicator23 ?? 0.1,
			})
		}
	}, [existingIndicators])

	// Modal yopilganda search termni tozalash
	useEffect(() => {
		if (!isModalOpen) {
			setSearchTerm('')
		}
	}, [isModalOpen])

	return (
		<div className='container mx-auto p-6'>
			<Card className='w-full max-w-6xl mx-auto'>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Universitet tanlash modal */}
						<div className='space-y-2 w-full'>
							<Label htmlFor='university'>Universitetni Tanlang</Label>
							<div className='w-full'>
								<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
									<DialogTrigger asChild>
										<Button
											variant='outline'
											className='w-full justify-start h-12 text-left font-normal'
											type='button'
										>
											{selectedUniversityName || 'Universitetni tanlang...'}
										</Button>
									</DialogTrigger>
									<DialogContent className='max-w-3xl max-h-[80vh] overflow-hidden flex flex-col'>
										<DialogHeader>
											<DialogTitle>Universitetni tanlang</DialogTitle>
										</DialogHeader>

										{/* Qidiruv maydoni */}
										<div className='relative'>
											<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
											<Input
												placeholder='Universitet nomi boʻyicha qidiring...'
												value={searchTerm}
												onChange={e => setSearchTerm(e.target.value)}
												className='pl-10'
											/>
										</div>

										{/* Universitetlar roʻyxati */}
										<div className='flex-1 overflow-y-auto mt-4'>
											{universitiesLoading ? (
												<div className='flex items-center justify-center p-8'>
													<Loader2 className='h-6 w-6 animate-spin' />
													<span className='ml-2'>Yuklanmoqda...</span>
												</div>
											) : (
												<div className='space-y-2'>
													{filteredUniversities.length === 0 ? (
														<p className='text-center text-gray-500 p-4'>
															Universitet topilmadi
														</p>
													) : (
														filteredUniversities.map(university => (
															<div
																key={university.id}
																className='p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
																onClick={() =>
																	handleUniversitySelect(university)
																}
															>
																<div className='font-medium'>
																	{university.name}
																</div>
																<div className='text-sm text-gray-500'>
																	Kod: {university.code}
																</div>
															</div>
														))
													)}
												</div>
											)}
										</div>
									</DialogContent>
								</Dialog>
							</div>
						</div>

						{/* Indikatorlar formasi */}
						{selectedUniversityId && (
							<div className='space-y-6 w-full'>
								<div className='bg-blue-50 p-4 rounded-lg'>
									<h3 className='text-lg font-semibold text-blue-800'>
										Tanlangan universitet: {selectedUniversityName}
									</h3>
								</div>

								{indicatorsLoading ? (
									<div className='flex items-center justify-center p-8 w-full'>
										<Loader2 className='h-8 w-8 animate-spin' />
										<span className='ml-2'>Indikatorlar yuklanmoqda...</span>
									</div>
								) : indicatorsError ? (
									<Alert variant='destructive' className='w-full'>
										<AlertCircle className='h-4 w-4' />
										<AlertDescription>
											Indikatorlarni yuklashda xatolik:{' '}
											{indicatorsError.message}
										</AlertDescription>
									</Alert>
								) : (
									<div className='grid grid-cols-1 md:grid-cols-2  gap-6 w-full'>
										{[
											{
												id: 'indicator19',
												label:
													'Ijtimoiy muhit va talabalarga yaratilgan shart-sharoitlar ( max 3)',
											},
											{
												id: 'indicator20',
												label: 'Talabalarning taʼlim sifatidan qoniqish darajasi ( max 3)',
											},
											{
												id: 'indicator21',
												label:
													'Professor-oʻqituvchilar uchun yaratilgan sharoitlar ( max 3)',
											},
											{
												id: 'indicator22',
												label:
													'Ish beruvchilar oʻrtasidagi bitiruvchilar nufuzi ( max 5)',
											},
											{
												id: 'indicator23',
												label:
													'Oliy taʼlim tashkilotlarida taʼlim va boshqaruv faoliyatini raqamlashtirish ( max 5)',
											},
										].map(indicator => (
											<LabeledInputWithInfo
												key={indicator.id}
												label={indicator.label}
												name={indicator.id}
												type='number'
												step='0.01'
												min='0'
												value={
													indicators[indicator.id as keyof typeof indicators]
												}
												onChange={handleInputChange}
												required
											/>
										))}
									</div>
								)}
							</div>
						)}

						{/* Xabar ko'rsatish */}
						{isSaved && (
							<Alert className='bg-green-50 border-green-200 w-full'>
								<CheckCircle className='h-4 w-4 text-green-600' />
								<AlertDescription className='text-green-700'>
									Indikatorlar muvaffaqiyatli saqlandi!
								</AlertDescription>
							</Alert>
						)}

						{saveError && (
							<Alert variant='destructive' className='w-full'>
								<AlertCircle className='h-4 w-4' />
								<AlertDescription>
									Saqlashda xatolik: {saveError.message}
								</AlertDescription>
							</Alert>
						)}

						{/* Submit tugmasi */}
						{selectedUniversityId && (
							<div className='flex justify-end w-full pt-4 border-t'>
								<Button
									type='submit'
									disabled={
										!selectedUniversityId || isSaving || indicatorsLoading
									}
									className='w-full md:w-auto px-8 py-2 h-12'
								>
									{isSaving ? (
										<>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Saqlanmoqda...
										</>
									) : (
										'Indikatorlarni Saqlash'
									)}
								</Button>
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default AdminIndicators
