import {
	createUniversity,
	deleteUniversity,
	fetchUniversities,
	updateUniversity,
} from '@/services/universitiesServices'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUniversities = (page: number, size: number) => {
	return useQuery({
		queryKey: ['universities', page, size],
		queryFn: () => fetchUniversities(page, size),
	})
}

// create unversity
export const useCreateUnversity = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createUniversity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['universities'] })
		},
	})
}

// update unversity
export const useUpdateUnversity = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateUniversity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['universities'] })
		},
	})
}

// delete unversity
export const useDeleteUnversity = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteUniversity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['universities'] })
		},
	})
}
