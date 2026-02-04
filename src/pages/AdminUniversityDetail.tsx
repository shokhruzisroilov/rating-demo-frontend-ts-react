import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	useCreateUserByUniversity,
	useDeleteUserByUniversity,
	useUpdateUserByUniversity,
	useUsersByUniversity,
} from '@/hooks/useUsersByUnversity'
import type { User } from '@/types/usersByUnversity'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronLeft, Edit, Trash } from 'lucide-react'
type UserForm = Partial<User>

const AdminUniversityDetail = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const universityId = Number(id)

	const { data: users } = useUsersByUniversity(universityId)
	const createMutation = useCreateUserByUniversity(universityId)
	const updateMutation = useUpdateUserByUniversity(universityId)
	const deleteMutation = useDeleteUserByUniversity(universityId)

	const [open, setOpen] = useState(false)
	const emptyForm: UserForm = {
		email: '',
		fullName: '',
		password: '',
		role: 'UNIVERSITY_ADMIN',
		universityId,
		active: true,
	}
	const [form, setForm] = useState<UserForm>(emptyForm)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (form.id) {
			await updateMutation.mutateAsync({ id: form.id, body: form })
		} else {
			await createMutation.mutateAsync(
				form as Omit<User, 'id' | 'universityName'>,
			)
		}
		setOpen(false)
		setForm(emptyForm)
	}

	const handleEdit = (user: User) => {
		setForm(user)
		setOpen(true)
	}

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id)
	}

	return (
		<div>
			<div className='flex items-center justify-between py-4'>
				<div className='flex items-center gap-4'>
					<Button
						variant='outline'
						className='cursor-pointer'
						onClick={() => navigate(`/universities`)}
					>
						<ChevronLeft />
					</Button>
					<h1 className='font-bold text-2xl'>Foydalanuvchilar</h1>
				</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant='outline'>Qo'shish</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-sm'>
						<form onSubmit={handleSubmit}>
							<DialogHeader>
								<DialogTitle>
									{form.id ? 'Userni tahrirlash' : 'User qo‘shish'}
								</DialogTitle>
							</DialogHeader>
							<FieldGroup className='py-5'>
								<Field>
									<Label>Email</Label>
									<Input
										value={form.email}
										onChange={e => setForm({ ...form, email: e.target.value })}
										required
									/>
								</Field>

								<Field>
									<Label>Parol</Label>
									<Input
										value={form.password}
										onChange={e =>
											setForm({ ...form, password: e.target.value })
										}
										required
									/>
								</Field>
								<Field>
									<Label>Ism Familiya</Label>
									<Input
										value={form.fullName}
										onChange={e =>
											setForm({ ...form, fullName: e.target.value })
										}
										required
									/>
								</Field>
								<Field>
									<Label>Role</Label>
									<select
										className='w-full border rounded-md p-2'
										value={form.role}
										onChange={e =>
											setForm({
												...form,
												role: e.target.value as 'UNIVERSITY_ADMIN' | 'ADMIN',
											})
										}
									>
										<option value='UNIVERSITY_ADMIN'>Universitet amin</option>
										<option value='ADMIN'>Admin</option>
									</select>
								</Field>
								<Field className='flex items-center gap-2'>
									<div className='flex items-center gap-2 p-2 rounded'>
										<Label>Faol</Label>
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
									{form.id ? 'Yangilash' : 'Qo‘shish'}
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
						<TableHead>Email</TableHead>
						<TableHead>Ism Familiya</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Harakatlar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users?.map(user => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.fullName}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>{user.active ? 'Faol' : 'Faol emas'}</TableCell>
							<TableCell className='flex gap-2'>
								<Button
									size='sm'
									variant='outline'
									onClick={() => handleEdit(user)}
								>
									<Edit />
								</Button>
								<Button
									size='sm'
									variant='outline'
									onClick={() => handleDelete(user.id)}
								>
									<Trash />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default AdminUniversityDetail
