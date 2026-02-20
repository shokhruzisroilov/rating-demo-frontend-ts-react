export interface WeightedScores {
  [key: string]: number;
}

export interface CalculatedRating {
  universityId: number;
  universityName: string;
  universityCode: string;
  rank: number | null;
  compositeScore: number | null;
  weightedScores: WeightedScores;
}

export interface VocationalWeightedScores {
  [key: string]: number;
}

export interface VocationalCalculatedRating {
  collegeId: number;
  collegeName: string;
  collegeCode: string;
  rank: number | null;
  compositeScore: number | null;
  weightedScores: VocationalWeightedScores;
}
