export interface User {
	id: number
	email: string
	password?: string
	fullName: string
	role: 'UNIVERSITY_ADMIN' | 'ADMIN'
	universityId: number
	universityName: string
	active: boolean
}
