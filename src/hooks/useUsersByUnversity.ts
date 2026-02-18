import {
  createUserByUniversity,
  deleteUserByUniversity,
  getUsersByCollege,
  getUsersByUniversity,
  updateUserByUniversity,
} from "@/services/usersByUnversityServices";
import type { User } from "@/types/usersByUnversity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get users by university
export const useUsersByUniversity = (universityId: number) => {
  return useQuery({
    queryKey: ["usersByUniversity", universityId],
    queryFn: () => getUsersByUniversity(universityId),
  });
};

// get users by
export const useUsersByCollege = (collegeId: number) => {
  return useQuery({
    queryKey: ["usersByCollege", collegeId],
    queryFn: () => getUsersByCollege(collegeId),
  });
};

// create user
export const useCreateUserByUniversity = (universityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<User, "id" | "universityName">) =>
      createUserByUniversity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersByUniversity", universityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersByCollege", universityId],
      });
    },
  });
};

// update user
export const useUpdateUserByUniversity = (universityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: Partial<Omit<User, "id" | "universityName">>;
    }) => updateUserByUniversity(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersByUniversity", universityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersByCollege", universityId],
      });
    },
  });
};

// delete user
export const useDeleteUserByUniversity = (universityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUserByUniversity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersByUniversity", universityId],
      });
      queryClient.invalidateQueries({
        queryKey: ["usersByCollege", universityId],
      });
    },
  });
};
