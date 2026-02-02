import { useDataEntry } from '@/hooks/useDataEnitry'
import {
	scientificActivitySchema,
	type ScientificActivityFormData,
} from '@/types/dataEnitry'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import HeadingPanel from './HeadingPanel'
import LabeledInputWithInfo from './LabeledInputWithInfo'

interface ScientificActivityFormProps {
	universityId: number
	periodId: number
	onSuccess: () => void
}

const ScientificActivityForm: React.FC<ScientificActivityFormProps> = ({
	universityId,
	periodId,
	onSuccess,
}) => {
	const { mutateAsync, isPending } = useDataEntry()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ScientificActivityFormData>({
		resolver: zodResolver(scientificActivitySchema as any),
		defaultValues: {
			universityId,
			periodId,
			a1: 0,
			a2: 0,
			a3: 0,
			a4: 0,
			a5: 0,
			a6: 0,
			a7: 0,
			a8: 0,
			a9: 0,
			a10: 0,
			a11: 0,
			a12: 0,
			a13: 0,
			a14: 0,
			medHi: 0,
			hasHindexesEmployees: 0,
		},
	})

	const onSubmit = async (formData: ScientificActivityFormData) => {
		try {
			await mutateAsync(formData)
			toast.success("Ilmiy faoliyat ma'lumotlari muffaqiyatli yuborildi!")
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
				<FaChalkboardTeacher size={20} className='text-[#4778F5]' />
				<h2 className='font-bold text-2xl text-black'>Ilmiy faoliyat</h2>
			</div>

			<div className='w-full h-px bg-[#EBEFFA] my-6'></div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col lg:flex-row items-start justify-between gap-16'>
					<HeadingPanel
						title='Ilmiy faoliyat'
						description='Ilmiy tadqiqotlar va nashrlar samaradorligi.'
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<LabeledInputWithInfo
							label='A1 – iqtiboslik bo‘yicha eng nufuzli (Top 1%) jurnallardagi maqolalar soni'
							type='number'
							{...register('a1')}
							error={errors.a1?.message}
						/>
						<LabeledInputWithInfo
							label='A2 – iqtiboslik bo‘yicha eng nufuzli (Top 10%) jurnallardagi maqolalar soni'
							type='number'
							{...register('a2')}
							error={errors.a2?.message}
						/>
						<LabeledInputWithInfo
							label='A3 – Q1 kvartildagi jurnallarda chop etilgan maqolalar soni'
							type='number'
							{...register('a3')}
							error={errors.a3?.message}
						/>
						<LabeledInputWithInfo
							label='A4 – Q2 kvartildagi jurnallarda chop etilgan maqolalar soni'
							type='number'
							{...register('a4')}
							error={errors.a4?.message}
						/>
						<LabeledInputWithInfo
							label='A5 – Q3 kvartildagi jurnallarda chop etilgan maqolalar soni'
							type='number'
							{...register('a5')}
							error={errors.a5?.message}
						/>
						<LabeledInputWithInfo
							label='A6 – Q4 kvartildagi jurnallarda chop etilgan maqolalar soni'
							type='number'
							{...register('a6')}
							error={errors.a6?.message}
						/>
						<LabeledInputWithInfo
							label='A7 – Web of Science bo‘yicha OTM affiliatsiyasidan kelib chiqqan iqtiboslar soni'
							type='number'
							{...register('a7')}
							error={errors.a7?.message}
						/>
						<LabeledInputWithInfo
							label='A8 – Scopus bo‘yicha OTM affiliatsiyasidan kelib chiqqan iqtiboslar soni'
							type='number'
							{...register('a8')}
							error={errors.a8?.message}
						/>
						<LabeledInputWithInfo
							label='A9 – professor-o‘qituvchilar tomonidan olingan patentlar soni'
							type='number'
							{...register('a9')}
							error={errors.a9?.message}
						/>
						<LabeledInputWithInfo
							label='A10 – litsenzion shartnomaga ega intellektual mulk obyektlar soni'
							type='number'
							{...register('a10')}
							error={errors.a10?.message}
						/>
						<LabeledInputWithInfo
							label='A11 – Scopus maʼlumotlar bazasida OTM affiliatsiyasi bo‘yicha qayd etilgan patentlar soni'
							type='number'
							{...register('a11')}
							error={errors.a11?.message}
						/>
						<LabeledInputWithInfo
							label='A12 – xorijiy va xalqaro tashkilotlardan tushgan ilmiy mablag‘ (so‘m)'
							type='number'
							{...register('a12')}
							error={errors.a12?.message}
						/>
						<LabeledInputWithInfo
							label='A13 – davlat ilmiy loyihalaridan tushgan ilmiy mablag‘ (so‘m)'
							type='number'
							{...register('a13')}
							error={errors.a13?.message}
						/>
						<LabeledInputWithInfo
							label='A14 – xo‘jalik yurituvchi subyektlar buyurtmalari asosida olingan mablag‘ (so‘m)'
							type='number'
							{...register('a14')}
							error={errors.a14?.message}
						/>
						<LabeledInputWithInfo
							label='Hi – professor-o‘qituvchilarning Scopus bo‘yicha individual h-index ko‘rsatkichi'
							type='number'
							{...register('hasHindexesEmployees')}
							error={errors.hasHindexesEmployees?.message}
						/>
						<LabeledInputWithInfo
							label='Med(Hi) – professor-o‘qituvchilarning Scopus bo‘yicha h-index medianasi'
							type='number'
							{...register('medHi')}
							error={errors.medHi?.message}
						/>
					</div>
				</div>

				<div className='flex justify-end gap-4 mt-6'>
					<Button
						type='submit'
						className='bg-[#4076FF] hover:bg-[#335ECC] text-white rounded-xl h-13'
						disabled={isPending}
					>
						{isPending ? 'Submitting...' : 'Saqlash va Keyingi shaklga o‘tish'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ScientificActivityForm
