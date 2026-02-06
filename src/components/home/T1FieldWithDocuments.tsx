import InfoCircle from '@/assets/icons/info-circle.svg?react'
import {
	useDeleteT1Document,
	useDownloadT1Document,
	useUploadT1Document,
} from '@/hooks/useDataEnitry'
import type { T1Document, T1Status } from '@/types/dataEnitry'
import {
	AlertCircle,
	CheckCircle,
	Clock,
	Download,
	FileText,
	Trash2,
	Upload,
} from 'lucide-react'
import type { ForwardedRef, InputHTMLAttributes } from 'react'
import { forwardRef, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface T1FieldWithDocumentsProps
	extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	universityId: number
	periodId: number
	documents?: T1Document[]
	status?: T1Status | null
	rejectionReason?: string | null
}

const T1FieldWithDocuments = forwardRef<
	HTMLInputElement,
	T1FieldWithDocumentsProps
>(
	(
		{
			label,
			error,
			universityId,
			periodId,
			documents = [],
			status,
			rejectionReason,
			...props
		},
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		const [infoOpen, setInfoOpen] = useState(false)
		const [rejectionOpen, setRejectionOpen] = useState(false)
		const fileInputRef = useRef<HTMLInputElement>(null)

		const uploadMutation = useUploadT1Document(universityId, periodId)
		const deleteMutation = useDeleteT1Document(universityId, periodId)
		const downloadMutation = useDownloadT1Document()

		const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files
			if (!files?.length) return

			for (const file of Array.from(files)) {
				try {
					await uploadMutation.mutateAsync(file)
					toast.success(`${file.name} muvaffaqiyatli yuklandi`)
				} catch {
					toast.error(`${file.name} yuklashda xatolik`)
				}
			}
			if (fileInputRef.current) fileInputRef.current.value = ''
		}

		const handleDelete = async (docId: number, fileName: string) => {
			try {
				await deleteMutation.mutateAsync(docId)
				toast.success(`${fileName} o'chirildi`)
			} catch {
				toast.error("O'chirishda xatolik")
			}
		}

		const handleDownload = async (doc: T1Document) => {
			try {
				const blob = await downloadMutation.mutateAsync(doc.id)
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = doc.originalFileName
				document.body.appendChild(a)
				a.click()
				window.URL.revokeObjectURL(url)
				document.body.removeChild(a)
			} catch {
				toast.error('Yuklab olishda xatolik')
			}
		}

		const formatFileSize = (bytes: number) => {
			if (bytes < 1024) return `${bytes} B`
			if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
			return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
		}

		const getStatusBadge = () => {
			if (!status) return null
			const config = {
				PENDING: {
					icon: Clock,
					text: 'Kutilmoqda',
					className: 'bg-yellow-100 text-yellow-700',
				},
				APPROVED: {
					icon: CheckCircle,
					text: 'Tasdiqlangan',
					className: 'bg-green-100 text-green-700',
				},
				REJECTED: {
					icon: AlertCircle,
					text: 'Rad etilgan',
					className: 'bg-red-100 text-red-700',
				},
			}
			const { icon: Icon, text, className } = config[status]
			return (
				<span
					className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
				>
					<Icon size={12} />
					{text}
				</span>
			)
		}

		return (
			<div className='w-full'>
				<div className='flex items-center justify-between gap-2 mb-1'>
					<div className='flex items-center gap-2 min-w-0'>
						<p className='font-bold text-[14px] truncate'>{label}</p>
						{getStatusBadge()}
					</div>
					<div className='flex items-center gap-1 shrink-0'>
						{status === 'REJECTED' && rejectionReason && (
							<Popover open={rejectionOpen} onOpenChange={setRejectionOpen}>
								<PopoverTrigger asChild>
									<button
										type='button'
										onMouseEnter={() => setRejectionOpen(true)}
										onMouseLeave={() => setRejectionOpen(false)}
										className='cursor-help text-red-500'
									>
										<AlertCircle size={16} />
									</button>
								</PopoverTrigger>
								<PopoverContent
									className='max-w-xs text-sm bg-red-50 border-red-200'
									onMouseEnter={() => setRejectionOpen(true)}
									onMouseLeave={() => setRejectionOpen(false)}
								>
									<p className='font-medium text-red-700'>Rad etilish sababi:</p>
									<p className='text-red-600 mt-1'>{rejectionReason}</p>
								</PopoverContent>
							</Popover>
						)}
						<Popover open={infoOpen} onOpenChange={setInfoOpen}>
							<PopoverTrigger asChild>
								<button
									type='button'
									onMouseEnter={() => setInfoOpen(true)}
									onMouseLeave={() => setInfoOpen(false)}
									className='cursor-help'
								>
									<InfoCircle style={{ width: '16px', height: '16px' }} />
								</button>
							</PopoverTrigger>
							<PopoverContent
								className='max-w-xs text-sm'
								onMouseEnter={() => setInfoOpen(true)}
								onMouseLeave={() => setInfoOpen(false)}
							>
								{label}
							</PopoverContent>
						</Popover>
					</div>
				</div>

				<Input
					{...props}
					ref={ref}
					className={`h-12.5 rounded-xl bg-[#F4F6FC] ${error ? 'border-red-500' : ''}`}
				/>
				{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

				{/* File upload section */}
				<div className='mt-3 p-3 bg-[#F4F6FC] rounded-xl'>
					<div className='flex items-center justify-between mb-2'>
						<p className='text-sm font-medium text-gray-700'>
							Dalil hujjatlar ({documents.length})
						</p>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => fileInputRef.current?.click()}
							disabled={uploadMutation.isPending}
							className='h-8 text-xs'
						>
							<Upload size={14} className='mr-1' />
							{uploadMutation.isPending ? 'Yuklanmoqda...' : 'Fayl yuklash'}
						</Button>
						<input
							ref={fileInputRef}
							type='file'
							multiple
							onChange={handleFileSelect}
							className='hidden'
						/>
					</div>

					{documents.length > 0 && (
						<div className='space-y-2'>
							{documents.map(doc => (
								<div
									key={doc.id}
									className='flex items-center justify-between p-2 bg-white rounded-lg border'
								>
									<div className='flex items-center gap-2 min-w-0'>
										<FileText size={16} className='text-blue-500 shrink-0' />
										<div className='min-w-0'>
											<p className='text-sm font-medium truncate'>
												{doc.originalFileName}
											</p>
											<p className='text-xs text-gray-500'>
												{formatFileSize(doc.fileSize)} •{' '}
												{new Date(doc.uploadedAt).toLocaleDateString('uz-UZ')}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-1 shrink-0'>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => handleDownload(doc)}
											disabled={downloadMutation.isPending}
											className='h-7 w-7 p-0'
										>
											<Download size={14} />
										</Button>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											onClick={() => handleDelete(doc.id, doc.originalFileName)}
											disabled={deleteMutation.isPending}
											className='h-7 w-7 p-0 text-red-500 hover:text-red-700'
										>
											<Trash2 size={14} />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}

					{documents.length === 0 && (
						<p className='text-xs text-gray-500 text-center py-2'>
							Hujjatlar yuklanmagan
						</p>
					)}
				</div>
			</div>
		)
	},
)

T1FieldWithDocuments.displayName = 'T1FieldWithDocuments'

export default T1FieldWithDocuments
