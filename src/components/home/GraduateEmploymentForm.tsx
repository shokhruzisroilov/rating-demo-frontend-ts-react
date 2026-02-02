import { useGraduateEmployment } from '@/hooks/useDataEnitry'
import {
	graduateEmploymentSchema,
	type GraduateEmploymentFormData,
} from '@/types/dataEnitry'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaBriefcase } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import HeadingPanel from './HeadingPanel'
import LabeledInputWithInfo from './LabeledInputWithInfo'

interface GraduateEmploymentFormProps {
	universityId: number
	periodId: number
	onSuccess: () => void
}

const GraduateEmploymentForm: React.FC<GraduateEmploymentFormProps> = ({
	universityId,
	periodId,
	onSuccess,
}) => {
	const { mutateAsync, isPending } = useGraduateEmployment()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<GraduateEmploymentFormData>({
		resolver: zodResolver(graduateEmploymentSchema as any),
		defaultValues: {
			universityId,
			periodId,
			b3: 0,
			b4: 0,
			b5: 0,
			tb: 0,
			yort: 0,
			yref: 0,
		},
	})

	const onSubmit = async (formData: GraduateEmploymentFormData) => {
		try {
			await mutateAsync(formData)
			toast.success(
				"Bitiruvchilar bandligi ma'lumotlari muvaffaqiyatli yuborildi!",
			)
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
				<FaBriefcase size={20} className='text-[#4778F5]' />
				<h2 className='font-bold text-2xl text-black'>
					Bitiruvchilar bandligi
				</h2>
			</div>

			<div className='w-full h-px bg-[#EBEFFA] my-6'></div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col lg:flex-row items-start justify-between gap-16'>
					<HeadingPanel
						title='Bitiruvchilar bandligi'
						description='Bitiruvchilarning ish bilan bandlik darajasi va korxonalar bilan hamkorlik.'
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<LabeledInputWithInfo
							label='B3 – Iqtisodiyotning real sektorida, davlat organlarida va jamoat tashkilotlarida band boʻlgan bitiruvchilar ulushi (%)'
							type='number'
							{...register('b3')}
							error={errors.b3?.message}
						/>
						<LabeledInputWithInfo
							label='B4 – Bitiruvchilarning taʼlim yoʻnalishi boʻyicha band boʻlgan bitiruvchilar ulushi (%)'
							type='number'
							{...register('b4')}
							error={errors.b4?.message}
						/>
						<LabeledInputWithInfo
							label='B5 – Davlat organlarida hamda oʻz oʻrnida band boʻlgan bitiruvchilar ulushi (%)'
							type='number'
							{...register('b5')}
							error={errors.b5?.message}
						/>
						<LabeledInputWithInfo
							label='TB – Oʻz kasb-hunariga ega boʻlgan korxona va tashkilotlar bilan shartnomalar soni'
							type='number'
							{...register('tb')}
							error={errors.tb?.message}
						/>
						<LabeledInputWithInfo
							label='Yort – Malakaviy amaliyot oʻtashga tashrif buyurishlar soni'
							type='number'
							{...register('yort')}
							error={errors.yort?.message}
						/>
						<LabeledInputWithInfo
							label='Yref – Tashrif buyurishga ishonchli hujjatlar soni'
							type='number'
							{...register('yref')}
							error={errors.yref?.message}
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

export default GraduateEmploymentForm
