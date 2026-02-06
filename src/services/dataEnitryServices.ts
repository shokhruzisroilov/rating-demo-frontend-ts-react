import type {
	GraduateEmploymentFormData,
	GraduateEmploymentResponse,
	InternationalActivityFormData,
	InternationalActivityResponse,
	ProfessorTeacherFormData,
	ProfessorTeacherResponse,
	ScientificActivityFormData,
	ScientificActivityResponse,
	T1Document,
	T1PendingItem,
	T1StatusUpdateRequest,
	UniversityData,
} from '@/types/dataEnitry'
import api from './api'

export const submitScientificActivity = async (
	data: ScientificActivityFormData,
): Promise<ScientificActivityResponse> => {
	const response = await api.post<ScientificActivityResponse>(
		'/data-entry/scientific-activity',
		data,
	)
	return response.data
}

// Professor-teacher uchun submit
export const submitProfessorTeacher = async (
	data: ProfessorTeacherFormData,
): Promise<ProfessorTeacherResponse> => {
	const response = await api.post<ProfessorTeacherResponse>(
		'/data-entry/professor-teacher',
		data,
	)
	return response.data
}

// Xalqaro faoliyat uchun submit
export const submitInternationalActivity = async (
	data: InternationalActivityFormData,
): Promise<InternationalActivityResponse> => {
	const response = await api.post<InternationalActivityResponse>(
		'/data-entry/international-activity',
		data,
	)
	return response.data
}

// Bitiruvchilar bandligi uchun submit
export const submitGraduateEmployment = async (
	data: GraduateEmploymentFormData,
): Promise<GraduateEmploymentResponse> => {
	const response = await api.post<GraduateEmploymentResponse>(
		'/data-entry/graduate-employment',
		data,
	)
	return response.data
}

// get data
export const fetchUniversityData = async (
	universityId: number,
	periodId: number,
): Promise<UniversityData> => {
	const response = await api.get(
		`/data-entry/university/${universityId}/period/${periodId}`,
	)
	return response.data
}

// T1 Document upload
export const uploadT1Document = async (
	universityId: number,
	periodId: number,
	file: File,
): Promise<T1Document> => {
	const formData = new FormData()
	formData.append('file', file)
	const response = await api.post<T1Document>(
		`/data-entry/university/${universityId}/period/${periodId}/t1-documents`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } },
	)
	return response.data
}

// T1 Document delete
export const deleteT1Document = async (documentId: number): Promise<void> => {
	await api.delete(`/data-entry/documents/${documentId}`)
}

// T1 Document download
export const downloadT1Document = async (documentId: number): Promise<Blob> => {
	const response = await api.get(`/data-entry/documents/${documentId}/download`, {
		responseType: 'blob',
	})
	return response.data
}

// Get T1 pending items (admin)
export const fetchT1PendingItems = async (
	periodId: number,
): Promise<T1PendingItem[]> => {
	const response = await api.get<T1PendingItem[]>(
		`/data-entry/t1-pending?periodId=${periodId}`,
	)
	return response.data
}

// Update T1 status (admin)
export const updateT1Status = async (
	universityId: number,
	periodId: number,
	data: T1StatusUpdateRequest,
): Promise<T1PendingItem> => {
	const response = await api.put<T1PendingItem>(
		`/data-entry/university/${universityId}/period/${periodId}/t1-status`,
		data,
	)
	return response.data
}
