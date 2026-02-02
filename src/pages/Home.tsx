import EditIcon from '@/assets/icons/edit-icon.svg?react'
import InfoCircle from '@/assets/icons/info-circle.svg?react'
import HeadingPanel from '@/components/home/HeadingPanel'
import LabeledInputWithInfo from '@/components/home/LabeledInputWithInfo'
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
import { useEffect, useState } from 'react'
import {
	FaChalkboardTeacher,
	FaFlask,
	FaGlobe,
	FaGraduationCap,
} from 'react-icons/fa'

const Home = () => {
	const [activeTab, setActiveTab] = useState('academic')
	const [showWelcomeModal, setShowWelcomeModal] = useState(false)
	const [selectedYear, setSelectedYear] = useState('')

	useEffect(() => {
		const academicYear = localStorage.getItem('selectedAcademicYear')

		if (!academicYear) {
			setShowWelcomeModal(true)
		}
	}, [])

	const handleSelectYear = () => {
		if (!selectedYear) return

		localStorage.setItem('selectedAcademicYear', selectedYear)
		setShowWelcomeModal(false)
	}

	const tabs = [
		{
			value: 'academic',
			title: 'Akademik faoliyat',
			desc: 'Professor-o‘qituvchilarning malaka va ta’lim sifati darajasi.',
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
			desc: 'Bitiruvchilar bandligi va raqamli ta’lim rivoji.',
			icon: <FaGraduationCap size={20} />,
		},
	]

	return (
		<>
			{/* Select year modal */}
			<Dialog open={showWelcomeModal}>
				<DialogContent className='sm:max-w-md rounded-4xl'>
					<DialogHeader className='flex flex-col items-center justify-center gap-2'>
						<InfoCircle style={{ width: '64px', height: '64px' }} />
						<DialogTitle className='my-4 font-bold text-[24px]'>
							O‘quv davrini tanlang
						</DialogTitle>
					</DialogHeader>

					<Select value={selectedYear} onValueChange={setSelectedYear}>
						<SelectTrigger className='w-full bg-[#F4F6FC] rounded-xl py-6'>
							<SelectValue placeholder='2025 - 2026' />
						</SelectTrigger>

						<SelectContent className='bg-[#F4F6FC]'>
							<SelectItem value='2022-2023'>2022 – 2023</SelectItem>
							<SelectItem value='2023-2024'>2023 – 2024</SelectItem>
							<SelectItem value='2024-2025'>2024 – 2025</SelectItem>
							<SelectItem value='2025-2026'>2025 – 2026</SelectItem>
							<SelectItem value='2026-2027'>2026 – 2027</SelectItem>
						</SelectContent>
					</Select>

					<Button
						onClick={handleSelectYear}
						disabled={!selectedYear}
						className='h-13 rounded-xl bg-[#4076FF] hover:bg-[#3060e0] mt-8'
					>
						Saqlash
					</Button>
				</DialogContent>
			</Dialog>

			<div className='w-full min-h-screen py-5 px-5 md:px-10 bg-[#F4F6FC]'>
				{/* Tabs header */}
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 cursor-pointer'>
					{tabs.map(tab => (
						<div
							key={tab.value}
							onClick={() => setActiveTab(tab.value)}
							className={`bg-white border-2 transition rounded-2xl
							${
								activeTab === tab.value
									? 'border-blue-600'
									: 'border-transparent text-gray-600 hover:text-black'
							}`}
						>
							<div className='p-6 flex justify-between items-start gap-3'>
								<div>
									<h2 className='font-bold text-[18px]'>{tab.title}</h2>
									<p className='text-sm text-[#697696] mt-1.5'>{tab.desc}</p>
								</div>
								<div
									className={`${activeTab === tab.value ? 'text-[#4778F5]' : 'text-[#282F3D'}`}
								>
									{tab.icon}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Tabs content */}
				<div className='w-full py-2.5'>
					{activeTab === 'academic' && (
						<div className='bg-white p-6 rounded-2xl'>
							<div className='flex items-center gap-2.5'>
								<FaChalkboardTeacher size={20} className='text-[#4778F5]' />
								<h2 className='font-bold text-2xl text-black'>
									Akadеmik faoliyat
								</h2>
							</div>

							<div className='w-full h-px bg-[#EBEFFA] my-7'></div>

							<div className='flex flex-col lg:flex-row items-start justify-between gap-16'>
								<HeadingPanel
									title='Ilmiy darajali professor-o‘qituvchilar ulushi'
									description='Professor-o‘qituvchilarning ilmiy daraja va unvonlarga ega
									bo‘lish darajasini ko‘rsatadi.'
								/>
								<div className='grid grid-cols-1 md:grid-cols-2 flex-1 gap-6'>
									<LabeledInputWithInfo
										label='Asosiy shtat va ichki o‘rindosh akademiklar soni'
										type='number'
									/>
									<LabeledInputWithInfo
										label='DSc yoki professor unvoniga ega o‘qituvchilar soni'
										type='number'
									/>
									<LabeledInputWithInfo
										label='PhD yoki dotsent unvoniga ega o‘qituvchilar soni'
										type='number'
									/>
									<LabeledInputWithInfo
										label='Umumiy professor-o‘qituvchilar soni'
										type='number'
									/>
									<LabeledInputWithInfo
										label='Asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilar soni'
										type='number'
									/>
								</div>
							</div>

							<div className='w-full h-px bg-[#EBEFFA] my-7'></div>

							<div className='flex flex-col md:flex-row justify-end gap-7 mt-7'>
								<Button
									variant='outline'
									className='h-13 rounded-xl bg-[#F4F6FC] hover:bg-[#F4F6FC] cursor-pointer flex items-center gap-2'
								>
									O‘quv davri: <strong>2025- 2026</strong>{' '}
									<EditIcon style={{ width: '24px', height: '24px' }} />
								</Button>

								<Button className='h-13 rounded-xl bg-[#4076FF] hover:bg-[#4076FF] cursor-pointer'>
									Saqlash va Keyingi shaklga o`tish
								</Button>
							</div>
						</div>
					)}

					{activeTab === 'scientific' && (
						<div className='rounded-lg border p-5'>
							<h3 className='text-lg font-semibold mb-1'>Analytics</h3>
							<p className='text-sm text-gray-500 mb-4'>
								Track performance and user engagement metrics.
							</p>
							<p className='text-sm text-gray-600'>
								Page views are up 25% compared to last month.
							</p>
						</div>
					)}

					{activeTab === 'international' && (
						<div className='rounded-lg border p-5'>
							<h3 className='text-lg font-semibold mb-1'>Reports</h3>
							<p className='text-sm text-gray-500 mb-4'>
								Generate and download your detailed reports.
							</p>
							<p className='text-sm text-gray-600'>
								You have 5 reports ready and available to export.
							</p>
						</div>
					)}

					{activeTab === 'digitalization' && (
						<div className='rounded-lg border p-5'>
							<h3 className='text-lg font-semibold mb-1'>Settings</h3>
							<p className='text-sm text-gray-500 mb-4'>
								Manage your account preferences and options.
							</p>
							<p className='text-sm text-gray-600'>
								Configure notifications, security, and themes.
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
