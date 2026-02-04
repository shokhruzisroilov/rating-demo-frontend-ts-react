export interface University {
	id: number
	code: string
	name: string
	region: string
	type: 'STATE' | 'PRIVATE'
	active: boolean
}

export interface UniversitiesResponse {
	content: University[]
	first: boolean
	last: boolean
	number: number
	totalPages: number
	totalElements: number
}
