export interface User {
  id: number;
  email: string;
  password?: string;
  fullName: string;
  role: "UNIVERSITY_ADMIN" | "ADMIN";
  collegeId: number;
  collegeName: string;
  active: boolean;
}
