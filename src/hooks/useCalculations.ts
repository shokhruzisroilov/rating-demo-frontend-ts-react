import { calculate, getCalculation } from '@/services/calculationsServices'
import type { CalculateRequest } from '@/types/calculation'
import { useMutation, useQuery } from '@tanstack/react-query'

// POST hook
export const useCalculateMutation = () => {
	return useMutation({
		mutationFn: (payload: CalculateRequest) => calculate(payload),
	})
}

// GET hook
export const useCalculationQuery = (universityId: number, periodId: number) => {
	return useQuery({
		queryKey: ['calculation', universityId, periodId],
		queryFn: () => getCalculation(universityId, periodId),
		enabled: !!universityId && !!periodId,
	})
}
