import api from './api'

// Types based on API response
export interface DashboardResponse {
	generalStatistics: GeneralStatistics
	universityTypeDistribution: Record<string, number>
	regionDistribution: Record<string, number>
	activePeriod: ActivePeriod
	topUniversities: TopUniversity[]
	dataEntryStatus: DataEntryStatus
	averageIndicators: Record<string, number>
}

export interface GeneralStatistics {
	totalUniversities: number
	activeUniversities: number
	inactiveUniversities: number
	stateUniversities: number
	privateUniversities: number
	branchUniversities: number
	totalUsers: number
	totalRatingPeriods: number
	activeRatingPeriods: number
	closedRatingPeriods: number
}

export interface ActivePeriod {
	id: number
	name: string
	startDate: string
	endDate: string
	status: string
	universitiesWithData: number
	universitiesWithoutData: number
	dataCompletionPercentage: number
}

export interface TopUniversity {
	rank: number
	universityId: number
	universityName: string
	universityCode: string
	universityType: string
	region: string
	compositeScore: number
	previousScore: number
	rankChange: number
}

export interface DataEntryStatus {
	totalUniversities: number
	universitiesWithProfessorData: number
	universitiesWithScientificData: number
	universitiesWithInternationalData: number
	universitiesWithGraduateData: number
	universitiesWithAllData: number
	professorDataPercentage: number
	scientificDataPercentage: number
	internationalDataPercentage: number
	graduateDataPercentage: number
	overallCompletionPercentage: number
}

// API functions
export const dashboardApi = {
	getDashboardData: () =>
		api.get<DashboardResponse>('/dashboard').then(res => res.data),
}
