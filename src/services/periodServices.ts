import type { RatingPeriod } from '@/types/periods'
import api from './api'

// get all periods
export const getRatingPeriods = async (): Promise<RatingPeriod[]> => {
	const response = await api.get<RatingPeriod[]>('/rating-periods')
	return response.data
}
