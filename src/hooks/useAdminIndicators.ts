import { adminIndicatorsApi, universitiesApi, type AdminIndicatorInput } from '@/services/adminIndicators'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


// Universitetlar uchun hook
export const useUniversities = () => {
	return useQuery({
		queryKey: ['universities'],
		queryFn: () => universitiesApi.getAll(),
		staleTime: 5 * 60 * 1000, // 5 daqiqa
	})
}

// Admin indikatorlarini olish uchun hook
export const useAdminIndicators = (
	universityId: number | null,
	periodId: number | null,
) => {
	return useQuery({
		queryKey: ['admin-indicators', universityId, periodId],
		queryFn: () => {
			if (!universityId || !periodId) {
				throw new Error('University ID and Period ID are required')
			}
			return adminIndicatorsApi.get(universityId, periodId)
		},
		enabled: !!universityId && !!periodId,
		staleTime: 2 * 60 * 1000, // 2 daqiqa
	})
}

// Admin indikatorlarini saqlash uchun hook
export const useSaveAdminIndicators = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: AdminIndicatorInput) => adminIndicatorsApi.save(data),
		onSuccess: (_, variables) => {
			// Ma'lumot muvaffaqiyatli saqlandi
			queryClient.invalidateQueries({
				queryKey: [
					'admin-indicators',
					variables.universityId,
					variables.periodId,
				],
			})
		},
	})
}
