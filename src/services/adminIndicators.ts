import api from './api'

export interface University {
	id: number
	code: string
	name: string
	region: string
	type: 'STATE' | 'PRIVATE'
	active: boolean
	createdAt: string
	updatedAt: string
}

export interface AdminIndicator {
	id: number
	universityId: number
	universityName: string
	periodId: number
	periodName: string
	indicator1: number | null
	indicator2: number | null
	indicator3: number | null
	indicator4: number | null
	indicator5: number | null
	indicator6: number | null
	indicator7: number | null
	indicator8: number | null
	indicator9: number | null
	indicator10: number | null
	indicator10_1: number | null
	indicator10_2: number | null
	indicator11: number | null
	indicator12: number | null
	indicator13: number | null
	indicator14: number | null
	indicator15: number | null
	indicator16: number | null
	indicator17: number | null
	indicator18: number | null
	indicator19: number | null
	indicator20: number | null
	indicator21: number | null
	indicator22: number | null
	indicator23: number | null
	compositeScore: number | null
	rank: number | null
	calculatedAt: string
}

export interface AdminIndicatorInput {
	universityId: number
	periodId: number
	indicator19: number
	indicator20: number
	indicator21: number
	indicator22: number
	indicator23: number
}

export interface UniversitiesResponse {
	content: University[]
	empty: boolean
	first: boolean
	last: boolean
	number: number
	numberOfElements: number
	pageable: any
	size: number
	sort: any
	totalElements: number
	totalPages: number
}

// / Universitetlar API
export const universitiesApi = {
	getAll: (params?: any) =>
		api.get('/universities', { params }).then(res => res.data),
}

// Admin indikatorlar API
export const adminIndicatorsApi = {
	get: (universityId: number, periodId: number) =>
		api
			.get('/rating-periods/admin-indicators', {
				params: { universityId, periodId },
			})
			.then(res => res.data),

	save: (data: {
		universityId: number
		periodId: number
		indicator19: number
		indicator20: number
		indicator21: number
		indicator22: number
		indicator23: number
	}) =>
		api.post('/rating-periods/admin-indicators', data).then(res => res.data),
}

// Rating davrlari API (agar mavjud bo'lsa)
export const ratingPeriodsApi = {
	getAll: () => api.get('/rating-periods').then(res => res.data),
}
