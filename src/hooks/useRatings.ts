import {
  calculateRatingsByPeriod,
  calculateVocationalRatingsByPeriod,
} from "@/services/ratingServices";
import type {
  CalculatedRating,
  VocationalCalculatedRating,
} from "@/types/rating";
import { useMutation } from "@tanstack/react-query";

export const useCalculateRatings = () => {
  return useMutation<CalculatedRating[], Error, number>({
    mutationFn: (periodId: number) => calculateRatingsByPeriod(periodId),
  });
};

export const useCalculateVocationalRatings = () => {
  return useMutation<VocationalCalculatedRating[], Error, number>({
    mutationFn: (periodId: number) =>
      calculateVocationalRatingsByPeriod(periodId),
  });
};
