export type User = {
  id: number;
  email: string;
  fullName: string;
  role: "ADMIN" | "UNIVERSITY_ADMIN" | "COLLEGE_ADMIN";
  universityId: number;
  universityName: string;
  active: boolean;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
};

export type ErrorResponse = {
  errorCode: string;
  message: string;
  messageUz?: string;
  fieldErrors?: { field: string; message: string; messageUz?: string }[];
  timestamp: string;
};
