import type { UniversitiesResponse, University } from '@/types/universities'
import api from './api'

// get all unversities
export const fetchUniversities = async (page: number, size: number) => {
	const { data } = await api.get<UniversitiesResponse>('/universities', {
		params: { page, size },
	})
	return data
}
	
// create unversitie
export const createUniversity = async (
	body: Omit<University, 'id'>,
): Promise<University> => {
	const { data } = await api.post('/universities', body)
	return data
}

// update unversity
export const updateUniversity = async (
	body: University,
): Promise<University> => {
	const { data } = await api.put(`/universities/${body.id}`, body)
	return data
}

// delete unversity
export const deleteUniversity = async (id: number) => {
	const { data } = await api.delete(`/universities/${id}`)
	return data
}
