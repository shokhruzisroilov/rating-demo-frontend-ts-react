import { useInternationalActivity } from '@/hooks/useDataEnitry'
import {
	internationalActivitySchema,
	type InternationalActivityFormData,
} from '@/types/dataEnitry'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaGlobe } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import HeadingPanel from './HeadingPanel'
import LabeledInputWithInfo from './LabeledInputWithInfo'

interface InternationalActivityFormProps {
	universityId: number
	periodId: number
	onSuccess: () => void
}

const InternationalActivityForm: React.FC<InternationalActivityFormProps> = ({
	universityId,
	periodId,
	onSuccess,
}) => {
	const { mutateAsync, isPending } = useInternationalActivity()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InternationalActivityFormData>({
		resolver: zodResolver(internationalActivitySchema as any),
		defaultValues: {
			universityId,
			periodId,
			x1: 0,
			x2: 0,
			x3: 0,
			x4: 0,
			x5: 0,
			x6: 0,
			x7: 0,
			x8: 0,
			x9: 0,
			x10: 0,
			x11: 0,
			x12: 0,
			x13: 0,
			x14: 0,
		},
	})

	const onSubmit = async (formData: InternationalActivityFormData) => {
		try {
			await mutateAsync(formData)
			toast.success("Xalqaro faoliyat ma'lumotlari muvaffaqiyatli yuborildi!")
			if (onSuccess) {
				onSuccess()
			}
		} catch (error: any) {
			toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi!")
		}
	}

	return (
		<div>
			<div className='flex items-center gap-2.5 mb-4'>
				<FaGlobe size={20} className='text-[#4778F5]' />
				<h2 className='font-bold text-2xl text-black'>Xalqaro faoliyat</h2>
			</div>

			<div className='w-full h-px bg-[#EBEFFA] my-6'></div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col lg:flex-row items-start justify-between gap-16'>
					<HeadingPanel
						title='Xalqaro faoliyat'
						description='Xalqaro hamkorlik va akademik aloqalar koʻrsatkichlari.'
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<LabeledInputWithInfo
							label='X1 – xalqaro ekspertlarning OTMni boshqa OTMlar orasida oʻrni (Reitingdagi oʻrni)'
							type='number'
							{...register('x1')}
							error={errors.x1?.message}
						/>
						<LabeledInputWithInfo
							label='X2 – Chet el oliy taʼlim muassasalari bilan hamkorlik shartnomalari soni'
							type='number'
							{...register('x2')}
							error={errors.x2?.message}
						/>
						<LabeledInputWithInfo
							label='X3 – Ikki tomonlama oʻqituvchi va talaba almashinuv dasturlari boʻyicha oʻquv yili davomida almashilgan professor-oʻqituvchilar soni'
							type='number'
							{...register('x3')}
							error={errors.x3?.message}
						/>
						<LabeledInputWithInfo
							label='X4 – Ikki tomonlama oʻqituvchi va talaba almashinuv dasturlari boʻyicha oʻquv yili davomida almashilgan talabalar soni'
							type='number'
							{...register('x4')}
							error={errors.x4?.message}
						/>
						<LabeledInputWithInfo
							label='X5 – Chet ellik professor-oʻqituvchilar soni'
							type='number'
							{...register('x5')}
							error={errors.x5?.message}
						/>
						<LabeledInputWithInfo
							label='X6 – Chet ellik talabalar soni'
							type='number'
							{...register('x6')}
							error={errors.x6?.message}
						/>
						<LabeledInputWithInfo
							label='X7 – Xalqaro akademik dasturlar (CISCO, MICROSOFT, SIEMENS, TESLA, IBM) soni'
							type='number'
							{...register('x7')}
							error={errors.x7?.message}
						/>
						<LabeledInputWithInfo
							label='X8 – Xalqaro sertifikatlashtirish dasturlari boʻyicha sertifikat olgan professor-oʻqituvchilar soni'
							type='number'
							{...register('x8')}
							error={errors.x8?.message}
						/>
						<LabeledInputWithInfo
							label='X9 – Xalqaro sertifikatlashtirish dasturlari boʻyicha sertifikat olgan talabalar soni'
							type='number'
							{...register('x9')}
							error={errors.x9?.message}
						/>
						<LabeledInputWithInfo
							label='X10 – Xalqaro hamkorlik asosida oʻtkazilgan ilmiy anjumanlar, seminarlar soni'
							type='number'
							{...register('x10')}
							error={errors.x10?.message}
						/>
						<LabeledInputWithInfo
							label='X11 – Xalqaro hamkorlik asosida chop etilgan ilmiy jurnallar soni'
							type='number'
							{...register('x11')}
							error={errors.x11?.message}
						/>
						<LabeledInputWithInfo
							label='X12 – Xalqaro grantlar va loyihalar boʻyicha olingan mablagʻ (AQSh dollarida)'
							type='number'
							{...register('x12')}
							error={errors.x12?.message}
						/>
						<LabeledInputWithInfo
							label='X13 – Xalqaro tashkilotlarning OTMga qoʻshgan hissasi (AQSh dollarida)'
							type='number'
							{...register('x13')}
							error={errors.x13?.message}
						/>
						<LabeledInputWithInfo
							label='X14 – Chet ellik ekspertlar ishtirokida oʻtkazilgan malaka oshirish kurslari soni'
							type='number'
							{...register('x14')}
							error={errors.x14?.message}
						/>
					</div>
				</div>

				<div className='flex justify-end gap-4 mt-6'>
					<Button
						type='submit'
						className='bg-[#4076FF] hover:bg-[#335ECC] text-white rounded-xl h-13'
						disabled={isPending}
					>
						{isPending
							? 'Yuborilmoqda...'
							: 'Saqlash va Keyingi shaklga o‘tish'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default InternationalActivityForm
