export interface CalculateRequest {
	universityId: number
	periodId: number
}

export interface CalculationResponse {
	id: number
	universityId: number
	universityName: string
	periodId: number
	periodName: string

	indicator1: number | null
	indicator2: number | null
	indicator3: number | null
	indicator4: number | null
	indicator5: number | null
	indicator6: number | null
	indicator7: number | null
	indicator8: number | null
	indicator9: number | null
	indicator10: number | null
	indicator11: number | null
	indicator12: number | null
	indicator13: number | null
	indicator14: number | null
	indicator15: number | null
	indicator16: number | null
	indicator17: number | null

	compositeScore: number | null
	rank: number | null
	calculatedAt: string
}
