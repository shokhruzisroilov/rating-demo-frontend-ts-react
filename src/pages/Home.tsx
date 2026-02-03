import EditIcon from '@/assets/icons/edit-icon.svg?react'
import InfoCircle from '@/assets/icons/info-circle.svg?react'
import GraduateEmploymentForm from '@/components/home/GraduateEmploymentForm'
import InternationalActivityForm from '@/components/home/InternationalActivityForm'
import ProfessorTeacherForm from '@/components/home/ProfessorTeacherForm'
import ScientificActivityForm from '@/components/home/ScientificActivityForm'
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
import { useCalculateMutation } from '@/hooks/useCalculations'
import { useRatingPeriods } from '@/hooks/useRatingPeriods.ts'
import { useEffect, useState } from 'react'
import {
	FaChalkboardTeacher,
	FaFlask,
	FaGlobe,
	FaGraduationCap,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface SelectedPeriod {
	id: number
	name: string
}

const Home = () => {
	const [currentStep, setCurrentStep] = useState(0)
	const [completedSteps, setCompletedSteps] = useState<boolean[]>([
		false,
		false,
		false,
		false,
	])
	const [showWelcomeModal, setShowWelcomeModal] = useState(false)
	const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod | null>(
		null,
	)
	const [isInitialized, setIsInitialized] = useState(false)

	const tabs = [
		{
			value: 'academic',
			title: 'Akademik faoliyat',
			desc: "Professor-o'qituvchilarning malaka va ta'lim sifati darajasi.",
			icon: <FaChalkboardTeacher size={20} />,
		},
		{
			value: 'scientific',
			title: 'Ilmiy faoliyat',
			desc: 'Ilmiy tadqiqotlar va nashrlar samaradorligi.',
			icon: <FaFlask size={20} />,
		},
		{
			value: 'international',
			title: 'Xalqaro faoliyat',
			desc: 'Xalqaro hamkorlik va akademik almashinuv darajasi.',
			icon: <FaGlobe size={20} />,
		},
		{
			value: 'digitalization',
			title: 'Bitiruvchilar sifati va raqamlashtirish',
			desc: "Bitiruvchilar bandligi va raqamli ta'lim rivoji.",
			icon: <FaGraduationCap size={20} />,
		},
	]

	const { data: ratingPeriods, isLoading, isError } = useRatingPeriods()
	const navigate = useNavigate()
	const calculateMutation = useCalculateMutation()

	// get universityId and periodId
	const storedUser = localStorage.getItem('user')
	const user = storedUser ? JSON.parse(storedUser) : null

	const universityId = user?.universityId
	const periodId = selectedPeriod?.id

	useEffect(() => {
		const initializeData = () => {
			const stored = localStorage.getItem('selectedAcademicYear')
			if (stored) {
				try {
					const parsed = JSON.parse(stored)
					setSelectedPeriod(parsed)
				} catch (error) {
					console.error(
						'Failed to parse selectedAcademicYear from localStorage',
						error,
					)
					localStorage.removeItem('selectedAcademicYear')
					setShowWelcomeModal(true)
				}
			} else {
				setShowWelcomeModal(true)
			}
			setIsInitialized(true)
		}

		// Kichik kechikish bilan ishga tushirish
		const timer = setTimeout(initializeData, 50)
		return () => clearTimeout(timer)
	}, [])

	const handleSelectYear = (id: number) => {
		const period = ratingPeriods?.find(p => p.id === id)
		if (!period) return

		setSelectedPeriod({ id: period.id, name: period.name })
		localStorage.setItem(
			'selectedAcademicYear',
			JSON.stringify({ id: period.id, name: period.name }),
		)
		setShowWelcomeModal(false)
	}

	// Form submit bo'lgandan keyin chaqiriladigan funksiya
	const handleStepComplete = () => {
		const newCompletedSteps = [...completedSteps]
		newCompletedSteps[currentStep] = true
		setCompletedSteps(newCompletedSteps)

		// Agar oxirgi step bo'lmasa, keyingi stepga o'tish
		if (currentStep < tabs.length - 1) {
			setCurrentStep(currentStep + 1)
		}
	}

	// Step-ga bosganda
	const handleStepClick = (index: number) => {
		if (index === 0 || completedSteps[index - 1] || completedSteps[index]) {
			setCurrentStep(index)
		}
	}

	// Hisoblash tugmasi
	const handleCalculate = () => {
		if (!universityId || !periodId) return

		calculateMutation.mutate(
			{ universityId, periodId },
			{
				onSuccess: () => {
					navigate(`/calculation/${universityId}/${periodId}`)
				},
			},
		)
	}

	// Barcha steplar tugallanganmi tekshirish
	const allStepsCompleted = completedSteps.every(step => step)

	// Loading holati
	if (!isInitialized) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-[#F4F6FC]'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
					<p className='mt-4 text-gray-600'>Yuklanmoqda...</p>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Select year modal */}
			<Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
				<DialogContent className='sm:max-w-md rounded-4xl'>
					<DialogHeader className='flex flex-col items-center justify-center gap-2'>
						<InfoCircle style={{ width: '64px', height: '64px' }} />
						<DialogTitle className='my-4 font-bold text-[24px]'>
							O'quv davrini tanlang
						</DialogTitle>
					</DialogHeader>

					<Select
						value={selectedPeriod?.id.toString() || ''}
						onValueChange={val => handleSelectYear(Number(val))}
					>
						<SelectTrigger className='w-full bg-[#F4F6FC] rounded-xl py-6'>
							<SelectValue placeholder="O'quv yilini tanlang" />
						</SelectTrigger>

						<SelectContent className='bg-[#F4F6FC]'>
							{isLoading && (
								<SelectItem value='loading' disabled>
									Loading...
								</SelectItem>
							)}
							{isError && (
								<SelectItem value='error' disabled>
									Error loading periods
								</SelectItem>
							)}
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
						className='h-13 rounded-xl bg-[#4076FF] hover:bg-[#3060e0] mt-8'
					>
						Saqlash
					</Button>
				</DialogContent>
			</Dialog>

			<div className='w-full min-h-screen py-5 px-5 md:px-10 bg-[#F4F6FC]'>
				{/* Steps header */}
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5'>
					{tabs.map((tab, index) => {
						const isActive = currentStep === index
						const isCompleted = completedSteps[index]
						const isClickable =
							index === 0 || completedSteps[index - 1] || isCompleted

						return (
							<div
								key={tab.value}
								onClick={() => handleStepClick(index)}
								className={`bg-white border-2 transition rounded-2xl ${
									isActive ? 'border-blue-600' : 'border-transparent'
								} ${
									isClickable
										? 'cursor-pointer hover:shadow-md'
										: 'cursor-not-allowed opacity-50'
								}`}
							>
								<div className='p-6 flex justify-between items-start gap-3'>
									<div className='flex-1'>
										<div className='flex items-center gap-2'>
											{isCompleted && (
												<span className='text-green-500 text-sm font-bold'>
													✓
												</span>
											)}
										</div>
										<h2
											className={`font-bold text-[18px] ${isActive ? 'text-black' : 'text-gray-600'}`}
										>
											{tab.title}
										</h2>
										<p className='text-sm text-[#697696] mt-1.5'>{tab.desc}</p>
									</div>
									<div
										className={`${isActive ? 'text-[#4778F5]' : 'text-[#282F3D]'}`}
									>
										{tab.icon}
									</div>
								</div>
							</div>
						)
					})}
				</div>

				{/* Forms content */}
				<div className='w-full py-2.5'>
					<div className='bg-white p-6 rounded-2xl shadow-md'>
						{universityId && periodId ? (
							<>
								{currentStep === 0 && (
									<ProfessorTeacherForm
										universityId={universityId}
										periodId={periodId}
										onSuccess={handleStepComplete}
									/>
								)}

								{currentStep === 1 && (
									<ScientificActivityForm
										universityId={universityId}
										periodId={periodId}
										onSuccess={handleStepComplete}
									/>
								)}

								{currentStep === 2 && (
									<InternationalActivityForm
										universityId={universityId}
										periodId={periodId}
										onSuccess={handleStepComplete}
									/>
								)}

								{currentStep === 3 && (
									<GraduateEmploymentForm
										universityId={universityId}
										periodId={periodId}
										onSuccess={handleStepComplete}
									/>
								)}
							</>
						) : (
							<div className='text-center py-12'>
								<InfoCircle
									className='mx-auto mb-4'
									style={{ width: '48px', height: '48px', opacity: 0.5 }}
								/>
								<p className='text-gray-500 text-lg'>
									Iltimos, o'quv davrini tanlang
								</p>
								<Button
									onClick={() => setShowWelcomeModal(true)}
									className='mt-4 h-12 rounded-xl bg-[#4076FF] hover:bg-[#3060e0]'
								>
									O'quv davrini tanlash
								</Button>
							</div>
						)}

						{universityId && periodId && (
							<div className='mt-4 flex items-center justify-between'>
								<Button
									variant='outline'
									className='h-13 rounded-xl bg-[#F4F6FC] hover:bg-[#F4F6FC] cursor-pointer flex items-center gap-2'
									onClick={() => setShowWelcomeModal(true)}
								>
									O'quv davri: <strong>{selectedPeriod?.name}</strong>
									<EditIcon style={{ width: '24px', height: '24px' }} />
								</Button>

								{/* Barcha steplar tugallangandan keyin Hisoblash tugmasi ko'rinadi */}
								{allStepsCompleted && (
									<Button
										onClick={handleCalculate}
										disabled={calculateMutation.isPending}
										className='h-13 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
									>
										{calculateMutation.isPending
											? 'Hisoblanmoqda...'
											: 'Hisoblash'}
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
