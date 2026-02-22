import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { useState } from 'react'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	useColleges,
	useCreateCollege,
	useDeleteCollege,
	useUpdateCollege,
} from '@/hooks/useColleges'
import type { University } from '@/types/universities'
import { Edit, Eye, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type UniversityForm = Partial<University>

const emptyForm: UniversityForm = {
	name: '',
	region: '',
	type: 'STATE',
	active: true,
}

const AdminColleges = () => {
	const navigate = useNavigate()
	// states
	const [page, setPage] = useState(0)
	const size = 10
	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<UniversityForm>(emptyForm)

	// queries
	const { data: colleges } = useColleges(page, size)
	const { mutateAsync: createMutateAsync } = useCreateCollege()
	const { mutateAsync: updateMutateAsync } = useUpdateCollege()
	const { mutateAsync: deleteMutateAsync } = useDeleteCollege()

	// pagenation
	const totalPages = colleges?.totalPages ?? 0
	const handlePrev = () => {
		if (page > 0) setPage(page - 1)
	}
	const handleNext = () => {
		if (page < totalPages - 1) setPage(page + 1)
	}
	const handlePageClick = (pageNum: number) => {
		setPage(pageNum)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (form.id) {
			await updateMutateAsync({
				id: form.id!,
				name: form.name!,
				region: form.region!,
				type: form.type!,
				code: form.code!,
				active: form.active!,
			})
		} else {
			await createMutateAsync({
				name: form.name!,
				region: form.region!,
				type: form.type!,
				code: form.code!,
				active: form.active!,
			})
		}

		setOpen(false)
		setForm(emptyForm)
	}

	return (
		<div>
			<div className='flex items-center justify-between py-4 px-4'>
				<h1 className='font-bold text-2xl'>Kasbiy ta'lim tashkilotlar</h1>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							variant='outline'
							onClick={() => {
								setForm(emptyForm)
								setOpen(true)
							}}
						>
							Qo'shish
						</Button>
					</DialogTrigger>

					<DialogContent className='sm:max-w-sm'>
						<form onSubmit={handleSubmit}>
							<DialogHeader>
								<DialogTitle>
									{form.id
										? 'Universitetni tahrirlash'
										: 'Universitet qo‘shish'}
								</DialogTitle>
							</DialogHeader>

							<FieldGroup className='py-5'>
								<Field>
									<Label>Kode</Label>
									<Input
										value={form.code}
										onChange={e => setForm({ ...form, code: e.target.value })}
										required
									/>
								</Field>
								<Field>
									<Label>Nomi</Label>
									<Input
										value={form.name}
										onChange={e => setForm({ ...form, name: e.target.value })}
										required
									/>
								</Field>

								<Field>
									<Label>Hudud</Label>
									<Input
										value={form.region}
										onChange={e => setForm({ ...form, region: e.target.value })}
										required
									/>
								</Field>

								<Field>
									<Label>Tur</Label>
									<select
										className='w-full border rounded-md p-2'
										value={form.type}
										onChange={e =>
											setForm({ ...form, type: e.target.value as any })
										}
									>
										<option value='STATE'>Davlat</option>
										<option value='PRIVATE'>Xususiy</option>
									</select>
								</Field>

								<Field className='flex items-center gap-2'>
									<div className='flex items-center gap-2 p-2 rounded'>
										<Label htmlFor='active'>Faol</Label>
										<input
											type='checkbox'
											checked={form.active}
											onChange={e =>
												setForm({ ...form, active: e.target.checked })
											}
										/>
									</div>
								</Field>
							</FieldGroup>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant='outline'>Cancel</Button>
								</DialogClose>
								<Button type='submit'>
									{form.id ? 'Saqlash' : 'Qo‘shish'}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Kod</TableHead>
						<TableHead>Nomi</TableHead>
						<TableHead>Hudud</TableHead>
						<TableHead>Tur</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Harakatlar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{colleges &&
						Array.isArray(colleges) &&
						colleges.map(university => (
							<TableRow key={university.id}>
								<TableCell>{university.id}</TableCell>
								<TableCell>{university.code}</TableCell>
								<TableCell>{university.name}</TableCell>
								<TableCell>{university.region}</TableCell>
								<TableCell>
									{(university.type === 'PRIVATE' && 'Xususiy') ||
										(university.type === 'STATE' && 'Davlat')}
								</TableCell>
								<TableCell>
									{university.active ? 'Faol' : 'Faol emas'}
								</TableCell>
								<TableCell>
									<Button
										size='sm'
										variant='outline'
										onClick={() => navigate(`/colleges/${university.id}`)}
										className='cursor-pointer'
									>
										<Eye />
									</Button>
									<Button
										size='sm'
										variant='outline'
										onClick={() => {
											setForm(university)
											setOpen(true)
										}}
										className='cursor-pointer'
									>
										<Edit />
									</Button>
									<Button
										size='sm'
										variant='outline'
										onClick={() => deleteMutateAsync(university.id)}
										className='cursor-pointer'
									>
										<Trash />
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={8} className='text-right'>
							Jami kollejlar: {(colleges && colleges.totalElements) ?? 0}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>

			{/* Shadcn UI Pagination */}
			<div className='flex justify-end items-center space-x-2 mt-4'>
				<Button
					size='sm'
					variant='outline'
					onClick={handlePrev}
					disabled={page === 0}
				>
					« Oldingi
				</Button>

				{Array.from({ length: totalPages }, (_, idx) => (
					<Button
						key={idx}
						size='sm'
						variant={page === idx ? 'default' : 'outline'}
						onClick={() => handlePageClick(idx)}
					>
						{idx + 1}
					</Button>
				))}

				<Button
					size='sm'
					variant='outline'
					onClick={handleNext}
					disabled={page >= totalPages - 1}
				>
					Keyingi »
				</Button>
			</div>
		</div>
	)
}

export default AdminColleges
