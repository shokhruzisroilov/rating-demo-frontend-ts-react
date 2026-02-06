import {
	deleteT1Document,
	downloadT1Document,
	fetchT1PendingItems,
	fetchUniversityData,
	submitGraduateEmployment,
	submitInternationalActivity,
	submitProfessorTeacher,
	submitScientificActivity,
	updateT1Status,
	uploadT1Document,
} from '@/services/dataEnitryServices'
import type {
	GraduateEmploymentFormData,
	InternationalActivityFormData,
	ProfessorTeacherFormData,
	ScientificActivityFormData,
	T1Document,
	T1PendingItem,
	T1StatusUpdateRequest,
	UniversityData,
} from '@/types/dataEnitry'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useDataEntry = () => {
	return useMutation({
		mutationKey: ['scientificActivitySubmission'],
		mutationFn: (data: ScientificActivityFormData) =>
			submitScientificActivity(data),
	})
}

export const useProfessorTeacher = () => {
	return useMutation({
		mutationKey: ['professorTeacherSubmission'],
		mutationFn: (data: ProfessorTeacherFormData) =>
			submitProfessorTeacher(data),
	})
}

export const useInternationalActivity = () => {
	return useMutation({
		mutationKey: ['internationalActivitySubmission'],
		mutationFn: (data: InternationalActivityFormData) =>
			submitInternationalActivity(data),
	})
}

export const useGraduateEmployment = () => {
	return useMutation({
		mutationKey: ['graduateEmploymentSubmission'],
		mutationFn: (data: GraduateEmploymentFormData) =>
			submitGraduateEmployment(data),
	})
}

export const useFetchUniversityData = (
	universityId: number,
	periodId: number,
) => {
	return useQuery<UniversityData>({
		queryKey: ['universityData', universityId, periodId],
		queryFn: () => fetchUniversityData(universityId, periodId),
		enabled: !!universityId && !!periodId,
	})
}

// T1 Document upload hook
export const useUploadT1Document = (universityId: number, periodId: number) => {
	const queryClient = useQueryClient()
	return useMutation<T1Document, Error, File>({
		mutationFn: (file: File) => uploadT1Document(universityId, periodId, file),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['universityData', universityId, periodId],
			})
		},
	})
}

// T1 Document delete hook
export const useDeleteT1Document = (universityId: number, periodId: number) => {
	const queryClient = useQueryClient()
	return useMutation<void, Error, number>({
		mutationFn: (documentId: number) => deleteT1Document(documentId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['universityData', universityId, periodId],
			})
		},
	})
}

// T1 Document download hook
export const useDownloadT1Document = () => {
	return useMutation<Blob, Error, number>({
		mutationFn: (documentId: number) => downloadT1Document(documentId),
	})
}

// T1 Pending items hook (admin)
export const useFetchT1PendingItems = (periodId: number) => {
	return useQuery<T1PendingItem[]>({
		queryKey: ['t1PendingItems', periodId],
		queryFn: () => fetchT1PendingItems(periodId),
		enabled: !!periodId,
	})
}

// T1 Status update hook (admin)
export const useUpdateT1Status = () => {
	const queryClient = useQueryClient()
	return useMutation<
		T1PendingItem,
		Error,
		{ universityId: number; periodId: number; data: T1StatusUpdateRequest }
	>({
		mutationFn: ({ universityId, periodId, data }) =>
			updateT1Status(universityId, periodId, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['t1PendingItems', variables.periodId],
			})
		},
	})
}
