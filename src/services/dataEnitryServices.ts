import type {
	GraduateEmploymentFormData,
	GraduateEmploymentResponse,
	InternationalActivityFormData,
	InternationalActivityResponse,
	ProfessorTeacherFormData,
	ProfessorTeacherResponse,
	ScientificActivityFormData,
	ScientificActivityResponse,
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
