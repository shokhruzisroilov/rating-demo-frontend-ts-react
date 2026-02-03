import { useProfessorTeacher } from '@/hooks/useDataEnitry'
import {
	professorTeacherSchema,
	type ProfessorTeacherFormData,
} from '@/types/dataEnitry'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
}

const ProfessorTeacherForm: React.FC<ProfessorTeacherFormProps> = ({
	universityId,
	periodId,
	onSuccess,
}) => {
	const { mutateAsync, isPending } = useProfessorTeacher()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfessorTeacherFormData>({
		resolver: zodResolver(professorTeacherSchema as any),
		defaultValues: {
			universityId,
			periodId,
			t1: 0,
			t2: 0,
			t3: 0,
			t4: 0,
			t5: 0,
			t6: 0,
			t7: 0,
			t8: 0,
			t9: 0,
			t10: 0,
			tp: 1,
			tt: 1,
			tid: 0,
			hs: 0,
			sumY: 0,
		},
	})

	const onSubmit = async (formData: ProfessorTeacherFormData) => {
		try {
			await mutateAsync(formData)
			toast.success(
				"Professor-o'qituvchilar ma'lumotlari muvaffaqiyatli yuborildi!",
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
							{...register('t1')}
							error={errors.t1?.message}
						/>
						<LabeledInputWithInfo
							label='T2 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi DSc (fan doktori) ilmiy daraja yoki professor unvoniga ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t2')}
							error={errors.t2?.message}
						/>
						<LabeledInputWithInfo
							label='T3 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi PhD (fan nomzodi) ilmiy daraja yoki dotsent unvoniga ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t3')}
							error={errors.t3?.message}
						/>
						<LabeledInputWithInfo
							label='T4 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-100” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t4')}
							error={errors.t4?.message}
						/>
						<LabeledInputWithInfo
							label='T5 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-300” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t5')}
							error={errors.t5?.message}
						/>
						<LabeledInputWithInfo
							label='T6 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-500” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t6')}
							error={errors.t6?.message}
						/>
						<LabeledInputWithInfo
							label='T7 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-1 000” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga (unvon) ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t7')}
							error={errors.t7?.message}
						/>
						<LabeledInputWithInfo
							label='T8 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-300” xorijiy oliy taʼlim tashkilotidan olingan magistratura diplomiga ega professor-oʻqituvchilar soni'
							type='number'
							{...register('t8')}
							error={errors.t8?.message}
						/>
						<LabeledInputWithInfo
							label='T9 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi Jahon bankining Yuqori daromadli iqtisodiyotga ega rivojlangan mamlakatlar ro‘yxatiga kirgan chet ellik professor-oʻqituvchilar soni'
							type='number'
							{...register('t9')}
							error={errors.t9?.message}
						/>
						<LabeledInputWithInfo
							label='T10 – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi “TOP-500” xorijiy oliy taʼlim tashkilotidan olingan ilmiy darajaga ega xorijiy professor-oʻqituvchilar soni'
							type='number'
							{...register('t10')}
							error={errors.t10?.message}
						/>
						<LabeledInputWithInfo
							label='TP – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilar soni'
							type='number'
							{...register('tp', { required: 'TT majburiy maydon' })}
							error={errors.tp?.message}
						/>
						<LabeledInputWithInfo
							label='TT – bakalavriat va magistraturada kunduzgi va kechgi ta’lim shaklida tahsil olayotgan umumiy talabalar soni'
							type='number'
							{...register('tt', { required: 'TT majburiy maydon' })}
							error={errors.tt?.message}
						/>
						<LabeledInputWithInfo
							label='TID – asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi ilmiy darajasiz professor-o‘qituvchilar soni'
							type='number'
							{...register('tid')}
							error={errors.tid?.message}
						/>
						<LabeledInputWithInfo
							label='HS – falsafa doktori (PhD) va fan doktori (DSc) ilmiy darajalarini olish bo‘yicha doktorlik dissertatsiyasini himoya qilgan izlanuvchilar soni'
							type='number'
							{...register('hs')}
							error={errors.hs?.message}
						/>
						<LabeledInputWithInfo
							label='∑Y - ilmiy darajaga (PhD yoki DSc) ega bo‘lgan asosiy shtat va ichki oʻrindosh sifatida mehnat faoliyatini olib boruvchi professor-o‘qituvchilarning yoshlarining yig‘indisi'
							type='number'
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
