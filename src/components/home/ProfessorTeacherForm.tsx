import { useProfessorTeacher } from '@/hooks/useDataEnitry'
import {
	professorTeacherSchema,
	type ProfessorTeacherFormData,
} from '@/types/dataEnitry'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import HeadingPanel from './HeadingPanel'
import LabeledInputWithInfo from './LabeledInputWithInfo'

interface ProfessorTeacherFormProps {
	universityId: number
	periodId: number
	onSuccess?: () => void
	universityData: any
}

const ProfessorTeacherForm: React.FC<ProfessorTeacherFormProps> = ({
	universityId,
	periodId,
	onSuccess,
	universityData,
}) => {
	const { mutateAsync, isPending } = useProfessorTeacher()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProfessorTeacherFormData>({
		resolver: zodResolver(professorTeacherSchema as any),
		defaultValues: {
			universityId,
			periodId,
			t1: universityData?.professorTeacherData?.t1 ?? 0,
			t2: universityData?.professorTeacherData?.t2 ?? 0,
			t3: universityData?.professorTeacherData?.t3 ?? 0,
			t4: universityData?.professorTeacherData?.t4 ?? 0,
			t5: universityData?.professorTeacherData?.t5 ?? 0,
			t6: universityData?.professorTeacherData?.t6 ?? 0,
			t7: universityData?.professorTeacherData?.t7 ?? 0,
			t8: universityData?.professorTeacherData?.t8 ?? 0,
			t9: universityData?.professorTeacherData?.t9 ?? 0,
			t10: universityData?.professorTeacherData?.t10 ?? 0,
			tp: universityData?.professorTeacherData?.tp ?? 1,
			tt: universityData?.professorTeacherData?.tt ?? 1,
			tid: universityData?.professorTeacherData?.tid ?? 0,
			hs: universityData?.professorTeacherData?.hs ?? 0,
			sumY: universityData?.professorTeacherData?.sumY ?? 0,
		},
	})

	useEffect(() => {
		if (universityData?.professorTeacherData) {
			reset({
				universityId,
				periodId,
				t1: universityData.professorTeacherData.t1 ?? 0,
				t2: universityData.professorTeacherData.t2 ?? 0,
				t3: universityData.professorTeacherData.t3 ?? 0,
				t4: universityData.professorTeacherData.t4 ?? 0,
				t5: universityData.professorTeacherData.t5 ?? 0,
				t6: universityData.professorTeacherData.t6 ?? 0,
				t7: universityData.professorTeacherData.t7 ?? 0,
				t8: universityData.professorTeacherData.t8 ?? 0,
				t9: universityData.professorTeacherData.t9 ?? 0,
				t10: universityData.professorTeacherData.t10 ?? 0,
				tp: universityData.professorTeacherData.tp ?? 1,
				tt: universityData.professorTeacherData.tt ?? 1,
				tid: universityData.professorTeacherData.tid ?? 0,
				hs: universityData.professorTeacherData.hs ?? 0,
				sumY: universityData.professorTeacherData.sumY ?? 0,
			})
		}
	}, [universityData, reset])

	const onSubmit = async (formData: ProfessorTeacherFormData) => {
		try {
			await mutateAsync(formData)
			toast.success(
				"Professor-o'qituvchilar ma'lumotlari muvaffaqiyatli yuborildi!",
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
				<FaChalkboardTeacher size={20} className='text-[#4778F5]' />
				<h2 className='font-bold text-2xl text-black'>
					Professor-o'qituvchilar
				</h2>
			</div>

			<div className='w-full h-px bg-[#EBEFFA] my-6'></div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col lg:flex-row items-start justify-between gap-16'>
					<HeadingPanel
						title="Professor-o'qituvchilar"
						description="Professor-o'qituvchilarning ilmiy darajalari va malakalari."
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<LabeledInputWithInfo
							label='T1 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi akademiklar soni'
							type='number'
							step='any'
							{...register('t1')}
							error={errors.t1?.message}
						/>
						<LabeledInputWithInfo
							label='T2 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi DSc (fan doktori) ilmiy daraja yoki professor unvoniga ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t2')}
							error={errors.t2?.message}
						/>
						<LabeledInputWithInfo
							label='T3 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi PhD (fan nomzodi) ilmiy daraja yoki dotsent unvoniga ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t3')}
							error={errors.t3?.message}
						/>
						<LabeledInputWithInfo
							label='T4 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-100” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t4')}
							error={errors.t4?.message}
						/>
						<LabeledInputWithInfo
							label='T5 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-300” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t5')}
							error={errors.t5?.message}
						/>
						<LabeledInputWithInfo
							label='T6 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-500” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t6')}
							error={errors.t6?.message}
						/>
						<LabeledInputWithInfo
							label='T7 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-1 000” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t7')}
							error={errors.t7?.message}
						/>
						<LabeledInputWithInfo
							label='T8 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-300” xorijiy oliy taʼlim tashkilotidan olingan magistratura diplomiga ega professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t8')}
							error={errors.t8?.message}
						/>
						<LabeledInputWithInfo
							label='T9 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi Jahon bankining Yuqori daromadli iqtisodiyotga ega rivojlangan mamlakatlar ro‘yxatiga kirgan chet ellik professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t9')}
							error={errors.t9?.message}
						/>
						<LabeledInputWithInfo
							label='T10 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-500” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga ega xorijiy professor-oʻqituvchilar soni'
							type='number'
							step='any'
							{...register('t10')}
							error={errors.t10?.message}
						/>
						<LabeledInputWithInfo
							label='TP – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilar soni'
							type='number'
							step='any'
							{...register('tp', { required: 'TT majburiy maydon' })}
							error={errors.tp?.message}
						/>
						<LabeledInputWithInfo
							label='TT – bakalavriat va magistraturada kunduzgi va kechgi ta’lim shaklida tahsil olayotgan umumiy talabalar soni'
							type='number'
							step='any'
							{...register('tt', { required: 'TT majburiy maydon' })}
							error={errors.tt?.message}
						/>
						<LabeledInputWithInfo
							label='TID – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi ilmiy darajasiz professor-o‘qituvchilar soni'
							type='number'
							step='any'
							{...register('tid')}
							error={errors.tid?.message}
						/>
						<LabeledInputWithInfo
							label='HS – falsafa doktori (PhD) va fan doktori (DSc) ilmiy darajalarini olish bo‘yicha doktorlik dissertatsiyasini himoya qilgan izlanuvchilar soni'
							type='number'
							step='any'
							{...register('hs')}
							error={errors.hs?.message}
						/>
						<LabeledInputWithInfo
							label='∑Y - ilmiy darajaga (PhD yoki DSc) ega bo‘lgan asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilarning yoshlarining yig‘indisi'
							type='number'
							step='any'
							{...register('sumY')}
							error={errors.sumY?.message}
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

export default ProfessorTeacherForm
