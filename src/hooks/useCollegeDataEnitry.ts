import {
  deleteDocument,
  downloadDocument,
  fetchCollegeData,
  submitEducationQuality,
  submitFinanceEmployment,
  submitPedagog,
  submitStudentAchievement,
  updateDocumentStatus,
  uploadDocument,
} from "@/services/collegeDataEnitryServices";
import type {
  PedagogFormData,
  EducationQualityFormData,
  FinanceEmploymentFormData,
  StudentAchievementFormData,
  CollegeData,
  Document,
  DocumentStatusUpdateRequest,
} from "@/types/collegeDataEnitry";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Pedagog kadrlar uchun hook
export const usePedagog = () => {
  return useMutation({
    mutationKey: ["pedagogSubmission"],
    mutationFn: (data: PedagogFormData) => submitPedagog(data),
  });
};

// Ta'lim sifati uchun hook
export const useEducationQuality = () => {
  return useMutation({
    mutationKey: ["educationQualitySubmission"],
    mutationFn: (data: EducationQualityFormData) =>
      submitEducationQuality(data),
  });
};

// Moliyaviy barqarorlik va bandlik uchun hook
export const useFinanceEmployment = () => {
  return useMutation({
    mutationKey: ["financeEmploymentSubmission"],
    mutationFn: (data: FinanceEmploymentFormData) =>
      submitFinanceEmployment(data),
  });
};

// O'quvchilar yutuqlari uchun hook
export const useStudentAchievement = () => {
  return useMutation({
    mutationKey: ["studentAchievementSubmission"],
    mutationFn: (data: StudentAchievementFormData) =>
      submitStudentAchievement(data),
  });
};

// College ma'lumotlarini olish uchun hook
export const useFetchCollegeData = (collegeId: number, periodId: number) => {
  return useQuery<CollegeData>({
    queryKey: ["collegeData", collegeId, periodId],
    queryFn: () => fetchCollegeData(collegeId, periodId),
    enabled: !!collegeId && !!periodId,
  });
};

// Hujjat yuklash hook
export const useUploadDocument = (
  collegeId: number,
  periodId: number,
  fieldName: string,
) => {
  const queryClient = useQueryClient();
  return useMutation<Document, Error, File>({
    mutationFn: (file: File) =>
      uploadDocument(collegeId, periodId, fieldName, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collegeData", collegeId, periodId],
      });
    },
  });
};

// Hujjat o'chirish hook
export const useDeleteDocument = (collegeId: number, periodId: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (documentId: number) => deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collegeData", collegeId, periodId],
      });
    },
  });
};

// Hujjat yuklab olish hook
export const useDownloadDocument = () => {
  return useMutation<Blob, Error, number>({
    mutationFn: (documentId: number) => downloadDocument(documentId),
  });
};

// Hujjat statusini yangilash hook (admin)
export const useUpdateDocumentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Document,
    Error,
    {
      collegeId: number;
      periodId: number;
      fieldName: string;
      data: DocumentStatusUpdateRequest;
    }
  >({
    mutationFn: ({ collegeId, periodId, fieldName, data }) =>
      updateDocumentStatus(collegeId, periodId, fieldName, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collegeData", variables.collegeId, variables.periodId],
      });
    },
  });
};
