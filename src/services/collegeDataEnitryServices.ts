import type {
  PedagogFormData,
  PedagogResponse,
  EducationQualityFormData,
  EducationQualityResponse,
  FinanceEmploymentFormData,
  FinanceEmploymentResponse,
  StudentAchievementFormData,
  StudentAchievementResponse,
  CollegeData,
  Document,
  DocumentStatusUpdateRequest,
} from "@/types/CollegeDataEnitry";
import api from "./api";

// Pedagog kadrlar ma'lumotlarini kiritish
export const submitPedagog = async (
  data: PedagogFormData,
): Promise<PedagogResponse> => {
  const response = await api.post<PedagogResponse>(
    "/vocational/data-entry/pedagog",
    data,
  );
  return response.data;
};

// Ta'lim sifati ma'lumotlarini kiritish
export const submitEducationQuality = async (
  data: EducationQualityFormData,
): Promise<EducationQualityResponse> => {
  const response = await api.post<EducationQualityResponse>(
    "/vocational/data-entry/education-quality",
    data,
  );
  return response.data;
};

// Moliyaviy barqarorlik va bandlik ma'lumotlarini kiritish
export const submitFinanceEmployment = async (
  data: FinanceEmploymentFormData,
): Promise<FinanceEmploymentResponse> => {
  const response = await api.post<FinanceEmploymentResponse>(
    "/vocational/data-entry/finance-employment",
    data,
  );
  return response.data;
};

// O'quvchilar yutuqlari ma'lumotlarini kiritish
export const submitStudentAchievement = async (
  data: StudentAchievementFormData,
): Promise<StudentAchievementResponse> => {
  const response = await api.post<StudentAchievementResponse>(
    "/vocational/data-entry/student-achievement",
    data,
  );
  return response.data;
};

// Barcha kiritilgan ma'lumotlarni olish
export const fetchCollegeData = async (
  collegeId: number,
  periodId: number,
): Promise<CollegeData> => {
  const response = await api.get<CollegeData>(
    `/vocational/data-entry/college/${collegeId}/period/${periodId}`,
  );
  return response.data;
};

// Hujjat yuklash (agar kerak bo'lsa)
export const uploadDocument = async (
  collegeId: number,
  periodId: number,
  fieldName: string,
  file: File,
): Promise<Document> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<Document>(
    `/vocational/data-entry/college/${collegeId}/period/${periodId}/documents/${fieldName}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

// Hujjat o'chirish
export const deleteDocument = async (documentId: number): Promise<void> => {
  await api.delete(`/vocational/data-entry/documents/${documentId}`);
};

// Hujjat yuklab olish
export const downloadDocument = async (documentId: number): Promise<Blob> => {
  const response = await api.get(
    `/vocational/data-entry/documents/${documentId}/download`,
    {
      responseType: "blob",
    },
  );
  return response.data;
};

// Hujjat statusini yangilash (admin)
export const updateDocumentStatus = async (
  collegeId: number,
  periodId: number,
  fieldName: string,
  data: DocumentStatusUpdateRequest,
): Promise<Document> => {
  const response = await api.put<Document>(
    `/vocational/data-entry/college/${collegeId}/period/${periodId}/documents/${fieldName}/status`,
    data,
  );
  return response.data;
};
