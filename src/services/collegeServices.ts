import type { UniversitiesResponse, University } from "@/types/universities";
import api from "./api";

// get all unversities
export const fetchColleges = async (page: number, size: number) => {
  const { data } = await api.get<UniversitiesResponse>("/vocational/colleges", {
    params: { page, size },
  });
  return data;
};

// create unversitie
export const createCollege = async (
  body: Omit<University, "id">,
): Promise<University> => {
  const { data } = await api.post("/vocational/colleges", body);
  return data;
};

// update unversity
export const updateCollege = async (body: University): Promise<University> => {
  const { data } = await api.put(`/vocational/colleges/${body.id}`, body);
  return data;
};

// delete unversity
export const deleteCollege = async (id: number) => {
  const { data } = await api.delete(`/vocational/colleges/${id}`);
  return data;
};
