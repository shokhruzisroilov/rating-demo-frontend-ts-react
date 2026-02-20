import type {
  CalculatedRating,
  VocationalCalculatedRating,
} from "@/types/rating";
import api from "./api";

export const calculateRatingsByPeriod = async (
  periodId: number,
): Promise<CalculatedRating[]> => {
  const { data } = await api.post<CalculatedRating[]>(
    `/ratings/${periodId}/calculate`,
  );

  return data;
};

export const calculateVocationalRatingsByPeriod = async (
  periodId: number,
): Promise<VocationalCalculatedRating[]> => {
  const { data } = await api.post<VocationalCalculatedRating[]>(
    `/vocational/ratings/${periodId}/calculate`,
  );

  return data;
};
