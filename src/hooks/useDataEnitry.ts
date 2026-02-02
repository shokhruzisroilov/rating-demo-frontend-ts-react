import {
	submitGraduateEmployment,
	submitInternationalActivity,
	submitProfessorTeacher,
	submitScientificActivity,
} from '@/services/dataEnitryServices'
import type {
	GraduateEmploymentFormData,
	InternationalActivityFormData,
	ProfessorTeacherFormData,
	ScientificActivityFormData,
} from '@/types/dataEnitry'
import { useMutation } from '@tanstack/react-query'

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
