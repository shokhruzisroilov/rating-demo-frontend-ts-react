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
	universityData: any
}

const ScientificActivityForm: React.FC<ScientificActivityFormProps> = ({
	universityId,
	periodId,
	onSuccess,
	universityData,
}) => {
	const { mutateAsync, isPending } = useDataEntry()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ScientificActivityFormData>({
		resolver: zodResolver(scientificActivitySchema as any),
		defaultValues: {
			universityId,
			periodId,
			a1: universityData?.scientificActivityData?.a1 ?? 0,
			a2: universityData?.scientificActivityData?.a2 ?? 0,
			a3: universityData?.scientificActivityData?.a3 ?? 0,
			a4: universityData?.scientificActivityData?.a4 ?? 0,
			a5: universityData?.scientificActivityData?.a5 ?? 0,
			a6: universityData?.scientificActivityData?.a6 ?? 0,
			a7: universityData?.scientificActivityData?.a7 ?? 0,
			a8: universityData?.scientificActivityData?.a8 ?? 0,
			a9: universityData?.scientificActivityData?.a9 ?? 0,
			a10: universityData?.scientificActivityData?.a10 ?? 0,
			a11: universityData?.scientificActivityData?.a11 ?? 0,
			a11_1: universityData?.scientificActivityData?.a11_1 ?? 0,
			a11_2: universityData?.scientificActivityData?.a11_2 ?? 0,
			a12: universityData?.scientificActivityData?.a12 ?? 0,
			a13: universityData?.scientificActivityData?.a13 ?? 0,
			a14: universityData?.scientificActivityData?.a14 ?? 0,
			medHi: universityData?.scientificActivityData?.medHi ?? 0,
			hasHindexesEmployees:
				universityData?.scientificActivityData?.hasHindexesEmployees ?? 0,
		},
	})

	const onSubmit = async (formData: ScientificActivityFormData) => {
		try {
			await mutateAsync(formData)
			toast.success("Ilmiy faoliyat ma'lumotlari muffaqiyatli yuborildi!")
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
							label='А1 – iqtiboslik soni bo‘yicha eng nufuzli (Top 1% most cited papers) jurnallarda qayd etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a1')}
							error={errors.a1?.message}
						/>
						<LabeledInputWithInfo
							label='А2 – iqtiboslik soni bo‘yicha eng nufuzli (Top 10% most cited papers) jurnallarda qayd etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a2')}
							error={errors.a2?.message}
						/>
						<LabeledInputWithInfo
							label='А3 – Q1 kvartilda qayd etilgan jurnallarda chop etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a3')}
							error={errors.a3?.message}
						/>
						<LabeledInputWithInfo
							label='А4 – Q2 kvartilda qayd etilgan jurnallarda chop etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a4')}
							error={errors.a4?.message}
						/>
						<LabeledInputWithInfo
							label='А5 – Q3 kvartilda qayd etilgan jurnallarda chop etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a5')}
							error={errors.a5?.message}
						/>
						<LabeledInputWithInfo
							label='А6 – Q4 kvartilda qayd etilgan jurnallarda chop etilgan maqolalar soni'
							type='number'
							step='any'
							{...register('a6')}
							error={errors.a6?.message}
						/>
						<LabeledInputWithInfo
							label='A7 – Web of Science maʼlumotlar bazasida oliy taʼlim tashkiloti affiliatsiya manzili boʻyicha aniqlangan iqtiboslar soni'
							type='number'
							step='any'
							{...register('a7')}
							error={errors.a7?.message}
						/>
						<LabeledInputWithInfo
							label='A8 – Scopus maʼlumotlar bazasida oliy taʼlim tashkiloti affiliatsiya manzili boʻyicha aniqlangan iqtiboslar soni'
							type='number'
							step='any'
							{...register('a8')}
							error={errors.a8?.message}
						/>
						<LabeledInputWithInfo
							label='A9 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilar tomonidan ixtiro, foydali model, sanoat namunalari va seleksiya yutuqlari uchun olingan patentlar soni'
							type='number'
							step='any'
							{...register('a9')}
							error={errors.a9?.message}
						/>
						<LabeledInputWithInfo
							label='A10 – litsenzion shartnomaga ega intellektual mulk obyektlar soni'
							type='number'
							step='any'
							{...register('a10')}
							error={errors.a10?.message}
						/>
						<LabeledInputWithInfo
							label='А11 – Scopus maʼlumotlar bazasida oliy taʼlim tashkiloti affiliatsiyasi  boʻyicha ko‘rsatilgan patentlar soni'
							type='number'
							step='any'
							{...register('a11')}
							error={errors.a11?.message}
						/>
						<LabeledInputWithInfo
							label='А11_1 - Ilm-fan va innovatsiyani rivojlantirishga yo‘naltirilgan mablag‘lar'
							type='number'
							step='any'
							{...register('a11_1')}
							error={errors.a11_1?.message}
						/>
						<LabeledInputWithInfo
							label="А11_2 - Taqdim etilgan Spin-off korxonalarning yillik daromadi (mln.so'm)"
							type='number'
							step='any'
							{...register('a11_2')}
							error={errors.a11_2?.message}
						/>
						<LabeledInputWithInfo
							label='A12 – xorijiy va xalqaro tashkilotlardan tushgan mablagʻlar'
							type='number'
							step='any'
							{...register('a12')}
							error={errors.a12?.message}
						/>
						<LabeledInputWithInfo
							label='A13 – davlat ilmiy loyihalari doirasidagi tadqiqotlardan tushgan mablagʻlar'
							type='number'
							step='any'
							{...register('a13')}
							error={errors.a13?.message}
						/>
						<LabeledInputWithInfo
							label='A14 – xo‘jalik yurituvchi subyektlar buyurtmalari asosida olingan mablagʻlar'
							type='number'
							step='any'
							{...register('a14')}
							error={errors.a14?.message}
						/>
						<LabeledInputWithInfo
							label='Hi – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilarning Scopus maʼlumotlar bazasida qayd etilgan individual “Xirsh” indeksi (h-index)'
							type='number'
							step='any'
							{...register('hasHindexesEmployees')}
							error={errors.hasHindexesEmployees?.message}
						/>
						<LabeledInputWithInfo
							label='Med (Hi) – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilarning Scopus maʼlumotlar bazasida qayd etilgan individual “Xirsh” indeksi (h-index)ning medianasi'
							type='number'
							step='any'
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
