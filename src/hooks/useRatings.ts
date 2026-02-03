import { calculateRatingsByPeriod } from '@/services/ratingServices'
import type { CalculatedRating } from '@/types/rating'
import { useMutation } from '@tanstack/react-query'

export const useCalculateRatings = () => {
	return useMutation<CalculatedRating[], Error, number>({
		mutationFn: (periodId: number) => calculateRatingsByPeriod(periodId),
	})
}
