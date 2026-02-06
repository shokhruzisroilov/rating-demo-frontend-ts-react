import EditIcon from '@/assets/icons/edit-icon.svg?react'
import InfoCircle from '@/assets/icons/info-circle.svg?react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
	useDownloadT1Document,
	useFetchT1PendingItems,
	useUpdateT1Status,
} from '@/hooks/useDataEnitry'
import { useRatingPeriods } from '@/hooks/useRatingPeriods.ts'
import type { T1PendingItem } from '@/types/dataEnitry'
import {
	CheckCircle,
	Clock,
	Download,
	FileText,
	Loader2,
	XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface SelectedPeriod {
	id: number
	name: string
}

const AdminT1Pending = () => {
	const [showWelcomeModal, setShowWelcomeModal] = useState(false)
	const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod | null>(null)
	const [reviewItem, setReviewItem] = useState<T1PendingItem | null>(null)
	const [rejectionReason, setRejectionReason] = useState('')

	const { data: ratingPeriods, isLoading: periodsLoading } = useRatingPeriods()
	const periodId = selectedPeriod?.id

	const { data: pendingItems, isLoading: itemsLoading } = useFetchT1PendingItems(periodId ?? 0)
	const updateStatusMutation = useUpdateT1Status()
	const downloadMutation = useDownloadT1Document()

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

	const handleSelectYear = (id: number) => {
		const period = ratingPeriods?.find(p => p.id === id)
		if (!period) return
		const selected = { id: period.id, name: period.name }
		setSelectedPeriod(selected)
		localStorage.setItem('selectedAcademicYear', JSON.stringify(selected))
		setShowWelcomeModal(false)
	}

	const handleDownload = async (docId: number, fileName: string) => {
		try {
			const blob = await downloadMutation.mutateAsync(docId)
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = fileName
			document.body.appendChild(a)
			a.click()
			window.URL.revokeObjectURL(url)
			document.body.removeChild(a)
		} catch {
			toast.error('Yuklab olishda xatolik')
		}
	}

	const handleApprove = async (item: T1PendingItem) => {
		try {
			await updateStatusMutation.mutateAsync({
				universityId: item.universityId,
				periodId: item.periodId,
				data: { status: 'APPROVED' },
			})
			toast.success('Tasdiqlandi!')
		} catch {
			toast.error('Xatolik yuz berdi')
		}
	}

	const handleReject = async () => {
		if (!reviewItem || !rejectionReason.trim()) {
			toast.error('Rad etish sababini kiriting')
			return
		}
		try {
			await updateStatusMutation.mutateAsync({
				universityId: reviewItem.universityId,
				periodId: reviewItem.periodId,
				data: { status: 'REJECTED', rejectionReason },
			})
			toast.success('Rad etildi!')
			setReviewItem(null)
			setRejectionReason('')
		} catch {
			toast.error('Xatolik yuz berdi')
		}
	}

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
	}

	if (periodsLoading) return <p>Yuklanmoqda...</p>

	const activePeriods = ratingPeriods?.filter(p => p.status === 'ACTIVE') ?? []

	return (
		<div className='w-full'>
			<Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
				<DialogContent className='sm:max-w-md rounded-4xl'>
					<DialogHeader className='flex flex-col items-center gap-2'>
						<InfoCircle width={64} height={64} />
						<DialogTitle className='my-4 text-[24px] font-bold'>
							O'quv davrini tanlang
						</DialogTitle>
					</DialogHeader>
					<Select
						value={selectedPeriod?.id?.toString() ?? ''}
						onValueChange={val => handleSelectYear(Number(val))}
					>
						<SelectTrigger className='w-full bg-[#F4F6FC] rounded-xl py-6'>
							<SelectValue placeholder="O'quv yilini tanlang" />
						</SelectTrigger>
						<SelectContent className='bg-[#F4F6FC]'>
							{activePeriods.map(period => (
								<SelectItem key={period.id} value={period.id.toString()}>
									{period.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						onClick={() => selectedPeriod && handleSelectYear(selectedPeriod.id)}
						disabled={!selectedPeriod}
						className='mt-8 h-13 rounded-xl bg-[#4076FF]'
					>
						Saqlash
					</Button>
				</DialogContent>
			</Dialog>

			<Dialog open={!!reviewItem} onOpenChange={() => setReviewItem(null)}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>T1 ma'lumotini rad etish</DialogTitle>
					</DialogHeader>
					<div className='py-4'>
						<p className='text-sm text-gray-600 mb-2'>
							Universitet: {reviewItem?.universityName}
						</p>
						<p className='text-sm text-gray-600 mb-4'>T1 qiymati: {reviewItem?.t1}</p>
						<Textarea
							placeholder='Rad etish sababini kiriting...'
							value={rejectionReason}
							onChange={e => setRejectionReason(e.target.value)}
							rows={4}
						/>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Bekor qilish</Button>
						</DialogClose>
						<Button
							variant='destructive'
							onClick={handleReject}
							disabled={updateStatusMutation.isPending}
						>
							{updateStatusMutation.isPending ? 'Yuborilmoqda...' : 'Rad etish'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>T1 Tasdiqlash</h1>
				<div className='flex items-center gap-3'>
					{periodId && (
						<Button
							variant='outline'
							className='h-13 rounded-xl bg-[#F4F6FC]'
							onClick={() => setShowWelcomeModal(true)}
						>
							O'quv davri:
							<strong className='ml-1'>{selectedPeriod?.name}</strong>
							<EditIcon className='ml-2 h-5 w-5' />
						</Button>
					)}
				</div>
			</div>

			{itemsLoading ? (
				<div className='flex items-center justify-center py-12'>
					<Loader2 className='h-8 w-8 animate-spin' />
				</div>
			) : !pendingItems?.length ? (
				<div className='text-center py-12'>
					<Clock className='mx-auto h-12 w-12 text-gray-400 mb-4' />
					<p className='text-gray-500'>Kutilayotgan ma'lumotlar yo'q</p>
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Universitet</TableHead>
							<TableHead className='text-center'>T1 qiymati</TableHead>
							<TableHead>Hujjatlar</TableHead>
							<TableHead className='text-center'>Harakatlar</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pendingItems.map(item => (
							<TableRow key={item.id}>
								<TableCell>
									<div>
										<p className='font-medium'>{item.universityName}</p>
										<p className='text-sm text-gray-500'>{item.periodName}</p>
									</div>
								</TableCell>
								<TableCell className='text-center font-semibold'>
									{item.t1}
								</TableCell>
								<TableCell>
									{item.t1Documents?.length > 0 ? (
										<div className='space-y-1'>
											{item.t1Documents.map(doc => (
												<div key={doc.id} className='flex items-center gap-2 text-sm'>
													<FileText size={14} className='text-blue-500' />
													<span className='truncate max-w-[200px]'>{doc.originalFileName}</span>
													<span className='text-gray-400'>({formatFileSize(doc.fileSize)})</span>
													<Button
														variant='ghost'
														size='sm'
														className='h-6 w-6 p-0'
														onClick={() => handleDownload(doc.id, doc.originalFileName)}
													>
														<Download size={12} />
													</Button>
												</div>
											))}
										</div>
									) : (
										<span className='text-gray-400 text-sm'>Hujjat yo'q</span>
									)}
								</TableCell>
								<TableCell>
									<div className='flex items-center justify-center gap-2'>
										<Button
											size='sm'
											variant='outline'
											className='text-green-600 border-green-600 hover:bg-green-50'
											onClick={() => handleApprove(item)}
											disabled={updateStatusMutation.isPending}
										>
											<CheckCircle size={16} className='mr-1' />
											Tasdiqlash
										</Button>
										<Button
											size='sm'
											variant='outline'
											className='text-red-600 border-red-600 hover:bg-red-50'
											onClick={() => setReviewItem(item)}
										>
											<XCircle size={16} className='mr-1' />
											Rad etish
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	)
}

export default AdminT1Pending
