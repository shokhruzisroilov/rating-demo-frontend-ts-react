export interface RatingPeriod {
	id: number
	name: string
	startDate: string
	endDate: string
	status: 'ACTIVE' | 'DRAFT'
	createdAt: string
}
