import type { CalculateRequest, CalculationResponse } from '@/types/calculation'
import api from './api'

// POST → hisoblash
export const calculate = async (
	payload: CalculateRequest,
): Promise<CalculationResponse> => {
	const { data } = await api.post('/calculations/calculate', payload)
	return data
}

// GET → natijani olish
export const getCalculation = async (
	universityId: number,
	periodId: number,
): Promise<CalculationResponse> => {
	const { data } = await api.get(`/calculations/${universityId}/${periodId}`)
	return data
}
