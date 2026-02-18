import { z } from "zod";

// Pedagog kadrlar uchun schema (1-mezon)
export const pedagogSchema = z.object({
  collegeId: z.coerce.number(),
  periodId: z.coerce.number(),
  p1: z.coerce.number(),
  p2: z.coerce.number(),
  p3: z.coerce.number(),
  p4: z.coerce.number(),
  p5: z.coerce.number(),
  p6: z.coerce.number(),
  p7: z.coerce.number(),
  p8: z.coerce.number(),
  p9: z.coerce.number(),
  p10: z.coerce.number(),
  p11: z.coerce.number(),
  p12: z.coerce.number(),
  p13: z.coerce.number(),
  p14: z.coerce.number(),
  p15: z.coerce.number(),
  p16: z.coerce.number(),
  p17: z.coerce.number(),
  p: z.coerce.number(),
  i16SurveyScore: z.coerce.number(),
});

export type PedagogFormData = z.infer<typeof pedagogSchema>;
export interface PedagogResponse extends PedagogFormData {
  id: number;
  collegeName: string;
  periodName: string;
  submittedAt: string;
}

// Ta'lim sifati uchun schema (2-mezon)
export const educationQualitySchema = z.object({
  collegeId: z.coerce.number(),
  periodId: z.coerce.number(),
  i21MaterialTechnicalScore: z.coerce.number(),
  i22SurveyScore: z.coerce.number(),
  d1: z.coerce.number(),
  d2: z.coerce.number(),
  qSum: z.coerce.number(),
  n: z.coerce.number(),
  o5: z.coerce.number(),
  p18: z.coerce.number(),
  pMax: z.coerce.number(),
  o: z.coerce.number(),
});

export type EducationQualityFormData = z.infer<typeof educationQualitySchema>;
export interface EducationQualityResponse extends EducationQualityFormData {
  id: number;
  collegeName: string;
  periodName: string;
  submittedAt: string;
}

// Moliyaviy barqarorlik va bandlik uchun schema (3-mezon)
export const financeEmploymentSchema = z.object({
  collegeId: z.coerce.number(),
  periodId: z.coerce.number(),
  i31SurveyScore: z.coerce.number(),
  a1: z.coerce.number(),
  a2: z.coerce.number(),
  o: z.coerce.number(),
  o7: z.coerce.number(),
  b1: z.coerce.number(),
  b2: z.coerce.number(),
  b3: z.coerce.number(),
  b: z.coerce.number(),
});

export type FinanceEmploymentFormData = z.infer<typeof financeEmploymentSchema>;
export interface FinanceEmploymentResponse extends FinanceEmploymentFormData {
  id: number;
  collegeName: string;
  periodName: string;
  submittedAt: string;
}

// O'quvchilar yutuqlari uchun schema (4-mezon)
export const studentAchievementSchema = z.object({
  collegeId: z.coerce.number(),
  periodId: z.coerce.number(),
  o8: z.coerce.number(),
  o9: z.coerce.number(),
  o10: z.coerce.number(),
  o11: z.coerce.number(),
  o12: z.coerce.number(),
  o13: z.coerce.number(),
  o14: z.coerce.number(),
  o13Cert: z.coerce.number(),
  o14Cert: z.coerce.number(),
  o: z.coerce.number(),
});

export type StudentAchievementFormData = z.infer<
  typeof studentAchievementSchema
>;
export interface StudentAchievementResponse extends StudentAchievementFormData {
  id: number;
  collegeName: string;
  periodName: string;
  submittedAt: string;
}

// College data type
export interface CollegeData {
  collegeId: number;
  collegeName: string;
  periodId: number;
  periodName: string;
  pedagogData: PedagogResponse | null;
  educationQualityData: EducationQualityResponse | null;
  financeEmploymentData: FinanceEmploymentResponse | null;
  studentAchievementData: StudentAchievementResponse | null;
}

// Hujjat turlari (agar kerak bo'lsa)
export interface Document {
  id: number;
  fieldName: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  uploadedById: number;
  uploadedByName: string;
  uploadedAt: string;
  downloadUrl: string;
}

export type DocumentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DocumentStatusUpdateRequest {
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}
