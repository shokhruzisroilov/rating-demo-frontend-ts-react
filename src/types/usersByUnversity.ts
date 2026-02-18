export interface User {
  id: number;
  email: string;
  password?: string;
  fullName: string;
  role: "UNIVERSITY_ADMIN" | "ADMIN" | "COLLEGE_ADMIN";
  universityId: number;
  universityName: string;
  collegeId?: number;
  active: boolean;
}
