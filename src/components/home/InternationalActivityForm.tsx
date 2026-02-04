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
	universityData: any
}

const InternationalActivityForm: React.FC<InternationalActivityFormProps> = ({
	universityId,
	periodId,
	onSuccess,
	universityData,
}) => {
	const { mutateAsync, isPending } = useInternationalActivity()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<InternationalActivityFormData>({
		resolver: zodResolver(internationalActivitySchema as any),
		defaultValues: {
			universityId,
			periodId,
			x1: universityData?.internationalActivityData?.x1 ?? 0,
			x2: universityData?.internationalActivityData?.x2 ?? 0,
			x3: universityData?.internationalActivityData?.x3 ?? 0,
			x4: universityData?.internationalActivityData?.x4 ?? 0,
			x5: universityData?.internationalActivityData?.x5 ?? 0,
			x6: universityData?.internationalActivityData?.x6 ?? 0,
			x7: universityData?.internationalActivityData?.x7 ?? 0,
			x8: universityData?.internationalActivityData?.x8 ?? 0,
			x9: universityData?.internationalActivityData?.x9 ?? 0,
			x10: universityData?.internationalActivityData?.x10 ?? 0,
			x11: universityData?.internationalActivityData?.x11 ?? 0,
			x12: universityData?.internationalActivityData?.x12 ?? 0,
			x13: universityData?.internationalActivityData?.x13 ?? 0,
			x14: universityData?.internationalActivityData?.x14 ?? 0,
		},
	})

	const onSubmit = async (formData: InternationalActivityFormData) => {
		try {
			await mutateAsync(formData)
			toast.success("Xalqaro faoliyat ma'lumotlari muvaffaqiyatli yuborildi!")
			reset()
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
							label='X1 – Jahon bankining Yuqori daromadli iqtisodiyotga ega rivojlangan mamlakatlar ro‘yxatiga kirgan davlatlar talabalari'
							type='number'
							step='any'
							{...register('x1')}
							error={errors.x1?.message}
						/>
						<LabeledInputWithInfo
							label='X2 – Markaziy Osiyo davlatlari talabalari'
							type='number'
							step='any'
							{...register('x2')}
							error={errors.x2?.message}
						/>
						<LabeledInputWithInfo
							label='X3 – boshqa davlatlar talabalari'
							type='number'
							step='any'
							{...register('x3')}
							error={errors.x3?.message}
						/>
						<LabeledInputWithInfo
							label='X4 – “TOP-100” xorijiy oliy taʼlim tashkiloti bilan almashinuv dasturida (outbound, inbound) oflayn ishtirok etgan talabalari soni'
							type='number'
							step='any'
							{...register('x4')}
							error={errors.x4?.message}
						/>
						<LabeledInputWithInfo
							label='X5 – “TOP-300” xorijiy oliy taʼlim tashkiloti bilan almashinuv dasturida (outbound, inbound) oflayn ishtirok etgan talabalari soni'
							type='number'
							step='any'
							{...register('x5')}
							error={errors.x5?.message}
						/>
						<LabeledInputWithInfo
							label='X6 – “TOP-500” xorijiy oliy taʼlim tashkiloti bilan almashinuv dasturida (outbound, inbound) oflayn ishtirok etgan talabalari soni'
							type='number'
							step='any'
							{...register('x6')}
							error={errors.x6?.message}
						/>
						<LabeledInputWithInfo
							label='X7 – xorijiy oliy taʼlim tashkiloti bilan almashinuv dasturida (outbound, inbound) oflayn ishtirok etgan talabalari soni'
							type='number'
							step='any'
							{...register('x7')}
							error={errors.x7?.message}
						/>
						<LabeledInputWithInfo
							label='X8 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi almashinuv dasturining chiqish (outbound) qismida ishtirok etuvchi professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('x8')}
							error={errors.x8?.message}
						/>
						<LabeledInputWithInfo
							label='X9 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi almashinuv dasturining kirish (inbound) qismida ishtirok etuvchi xorijiy oliy ta’lim tashkilot professor-oʻqituvchisi soni'
							type='number'
							step='any'
							{...register('x9')}
							error={errors.x9?.message}
						/>
						<LabeledInputWithInfo
							label='X10 – “TOP-100” xorijiy oliy taʼlim tashkiloti bilan tashkil etilgan qoʻshma taʼlim dasturlarda tahsil olayotgan talabalari soni'
							type='number'
							step='any'
							{...register('x10')}
							error={errors.x10?.message}
						/>
						<LabeledInputWithInfo
							label='X11 – “TOP-300” xorijiy oliy taʼlim tashkiloti bilan tashkil etilgan qoʻshma taʼlim dasturlarda tahsil olayotgan talabalari soni'
							type='number'
							step='any'
							{...register('x11')}
							error={errors.x11?.message}
						/>
						<LabeledInputWithInfo
							label='X12 – “TOP-500” xorijiy oliy taʼlim tashkiloti bilan tashkil etilgan qoʻshma taʼlim dasturlarda tahsil olayotgan talabalari soni'
							type='number'
							step='any'
							{...register('x12')}
							error={errors.x12?.message}
						/>
						<LabeledInputWithInfo
							label='X13 – “TOP-1000” xorijiy oliy taʼlim tashkiloti bilan tashkil etilgan qoʻshma taʼlim dasturlarda tahsil olayotgan talabalari soni'
							type='number'
							step='any'
							{...register('x13')}
							error={errors.x13?.message}
						/>
						<LabeledInputWithInfo
							label='X14 – “TOP-1000” ro‘yxatiga kirmaydigan xorijiy oliy taʼlim tashkiloti bilan tashkil etilgan qoʻshma taʼlim dasturlarda tahsil olayotgan talabalari soni'
							type='number'
							step='any'
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
