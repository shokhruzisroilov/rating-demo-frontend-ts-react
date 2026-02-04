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
	universityData: any
}

const GraduateEmploymentForm: React.FC<GraduateEmploymentFormProps> = ({
	universityId,
	periodId,
	onSuccess,
	universityData,
}) => {
	const { mutateAsync, isPending } = useGraduateEmployment()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<GraduateEmploymentFormData>({
		resolver: zodResolver(graduateEmploymentSchema as any),
		defaultValues: {
			universityId,
			periodId,
			b1: universityData?.graduateEmploymentData?.b1 ?? 0,
			b2: universityData?.graduateEmploymentData?.b2 ?? 0,
			b3: universityData?.graduateEmploymentData?.b3 ?? 0,
			b4: universityData?.graduateEmploymentData?.b4 ?? 0,
			b5: universityData?.graduateEmploymentData?.b5 ?? 0,
			tb: universityData?.graduateEmploymentData?.tb ?? 0,
			yort: universityData?.graduateEmploymentData?.yort ?? 0,
			yref: universityData?.graduateEmploymentData?.yref ?? 0,
		},
	})

	const onSubmit = async (formData: GraduateEmploymentFormData) => {
		try {
			await mutateAsync(formData)
			toast.success(
				"Bitiruvchilar bandligi ma'lumotlari muvaffaqiyatli yuborildi!",
			)
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
							label='B1 – Yakka tartibdagi tadbirkor yoki ta’sischi sifatida faoliyat ko‘rsatayotgan, davlat organi yoki xo‘jalik yurituvchi subyektda ishlayotgan bitiruvchilar soni'
							type='number'
							step='any'
							{...register('b1')}
							error={errors.b1?.message}
						/>
						<LabeledInputWithInfo
							label='B2 – Ta’limning keyingi bosqichi bilan qamrab olingan, ikki yoshgacha bola parvarishi bilan band, 1-2 guruh nogironi, o‘zini o‘zi band qilgan bitiruvchilar soni'
							type='number'
							step='any'
							{...register('b2')}
							error={errors.b2?.message}
						/>
						<LabeledInputWithInfo
							label='B3 – bitirgandan soʻng 3 oy ichida ishga joylashgan bitiruvchilar soni'
							type='number'
							step='any'
							{...register('b3')}
							error={errors.b3?.message}
						/>
						<LabeledInputWithInfo
							label='B4 – bitirgandan soʻng 6 oy ichida ishga joylashgan bitiruvchilar soni'
							type='number'
							step='any'
							{...register('b4')}
							error={errors.b4?.message}
						/>
						<LabeledInputWithInfo
							label='B5 – bitirgandan soʻng 12 oy ichida ishga joylashgan bitiruvchilar soni'
							type='number'
							step='any'
							{...register('b5')}
							error={errors.b5?.message}
						/>
						<LabeledInputWithInfo
							label='ТB – bitiruvchilar soni'
							type='number'
							step='any'
							{...register('tb')}
							error={errors.tb?.message}
						/>
						<LabeledInputWithInfo
							label='Yoʻrt – ishga joylashgan bitiruvchilarning oʻrtacha oylik daromadi (ish haqi)'
							type='number'
							step='any'
							{...register('yort')}
							error={errors.yort?.message}
						/>
						<LabeledInputWithInfo
							label="Yref – Milliy statistika qo'mitasi ma'lumotlariga ko'ra, O‘zbekiston Respublikasida o‘rtacha oylik nominal hisoblangan ish haqi"
							type='number'
							step='any'
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
