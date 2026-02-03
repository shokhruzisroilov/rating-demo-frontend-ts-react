export interface WeightedScores {
	[key: string]: number
}

export interface CalculatedRating {
	universityId: number
	universityName: string
	universityCode: string
	rank: number | null
	compositeScore: number | null
	weightedScores: WeightedScores
}
