import type { CalculatedRating } from '@/types/rating'
import api from './api'

export const calculateRatingsByPeriod = async (
	periodId: number,
): Promise<CalculatedRating[]> => {
	const { data } = await api.post<CalculatedRating[]>(
		`/ratings/${periodId}/calculate`,
	)

	return data
}
