import { getRatingPeriods } from '@/services/periodServices'
import type { RatingPeriod } from '@/types/periods'
import { useQuery } from '@tanstack/react-query'

// rating periods
export const useRatingPeriods = () => {
	return useQuery<RatingPeriod[], Error>({
		queryKey: ['ratingPeriods'],
		queryFn: getRatingPeriods,
		retry: 1,
		refetchOnWindowFocus: false,
	})
}
