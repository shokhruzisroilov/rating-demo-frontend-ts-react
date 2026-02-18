import type { User } from "@/types/auth";
import api from "./api";

// get users by university
export const getUsersByUniversity = async (
  universityId: number,
): Promise<User[]> => {
  const { data } = await api.get(`/users/university/${universityId}`);
  return data;
};

// for college
export const getUsersByCollege = async (collegeId: number): Promise<User[]> => {
  const { data } = await api.get(`/users/college/${collegeId}`);
  return data;
};

// create user
export const createUserByUniversity = async (
  body: Omit<User, "id" | "universityName">,
): Promise<User> => {
  const { data } = await api.post("/users", body);
  return data;
};

// update user
export const updateUserByUniversity = async (
  id: number,
  body: Partial<Omit<User, "id" | "universityName">>,
): Promise<User> => {
  const { data } = await api.put(`/users/${id}`, body);
  return data;
};

// delete user
export const deleteUserByUniversity = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
