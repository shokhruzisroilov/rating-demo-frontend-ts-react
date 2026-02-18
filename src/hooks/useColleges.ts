
import { createCollege, deleteCollege, fetchColleges, updateCollege } from "@/services/collegeServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useColleges = (page: number, size: number) => {
  return useQuery({
    queryKey: ["colleges", page, size],
    queryFn: () => fetchColleges(page, size),
  });
};

// create unversity
export const useCreateCollege = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};

// update unversity
export const useUpdateCollege = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};

// delete unversity
export const useDeleteCollege = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });
};
