import { useStudentAchievement } from "@/hooks/useCollegeDataEnitry";
import {
  studentAchievementSchema,
  type CollegeData,
  type StudentAchievementFormData,
} from "@/types/CollegeDataEnitry";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import HeadingPanel from "../HeadingPanel";
import LabeledInputWithInfo from "../LabeledInputWithInfo";
import { Button } from "@/components/ui/button";

interface StudentAchievementFormProps {
  collegeId: number;
  periodId: number;
  onSuccess?: () => void;
  collegeData?: CollegeData;
}

const StudentAchievementForm: React.FC<StudentAchievementFormProps> = ({
  collegeId,
  periodId,
  onSuccess,
  collegeData,
}) => {
  const { mutateAsync, isPending } = useStudentAchievement();
  const achievementData = collegeData?.studentAchievementData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentAchievementFormData>({
    resolver: zodResolver(studentAchievementSchema as any),
    defaultValues: {
      collegeId,
      periodId,
      o8: achievementData?.o8 ?? 0,
      o9: achievementData?.o9 ?? 0,
      o10: achievementData?.o10 ?? 0,
      o11: achievementData?.o11 ?? 0,
      o12: achievementData?.o12 ?? 0,
      o13: achievementData?.o13 ?? 0,
      o14: achievementData?.o14 ?? 0,
      o13Cert: achievementData?.o13Cert ?? 0,
      o14Cert: achievementData?.o14Cert ?? 0,
      o: achievementData?.o ?? 0,
    },
  });

  useEffect(() => {
    if (achievementData) {
      reset({
        collegeId,
        periodId,
        o8: achievementData.o8 ?? 0,
        o9: achievementData.o9 ?? 0,
        o10: achievementData.o10 ?? 0,
        o11: achievementData.o11 ?? 0,
        o12: achievementData.o12 ?? 0,
        o13: achievementData.o13 ?? 0,
        o14: achievementData.o14 ?? 0,
        o13Cert: achievementData.o13Cert ?? 0,
        o14Cert: achievementData.o14Cert ?? 0,
        o: achievementData.o ?? 0,
      });
    }
  }, [achievementData, reset, collegeId, periodId]);

  const onSubmit = async (formData: StudentAchievementFormData) => {
    try {
      await mutateAsync(formData);
      toast.success(
        "O'quvchilar yutuqlari ma'lumotlari muvaffaqiyatli yuborildi!",
      );
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <FaGraduationCap size={20} className="text-[#4778F5]" />
        <h2 className="font-bold text-2xl text-black">O'quvchilar yutuqlari</h2>
      </div>

      <div className="w-full h-px bg-[#EBEFFA] my-6"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <HeadingPanel
            title="O'quvchilar yutuqlari"
            description="O'quvchilarning sport va ijodiy yutuqlari (4-mezon)."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInputWithInfo
              label="O8 – sport musobaqalarida sovrindor bo'lgan talabalar soni"
              type="number"
              step="any"
              {...register("o8")}
              error={errors.o8?.message}
            />
            <LabeledInputWithInfo
              label="O9 – ko'rik tanlovlarda sovrindor bo'lgan talabalar soni"
              type="number"
              step="any"
              {...register("o9")}
              error={errors.o9?.message}
            />
            <LabeledInputWithInfo
              label="O10 – fan olimpiadalarida sovrindor bo'lgan talabalar soni"
              type="number"
              step="any"
              {...register("o10")}
              error={errors.o10?.message}
            />
            <LabeledInputWithInfo
              label="O11 – jurnal va gazetalarda maqolalari chop etilgan talabalar soni"
              type="number"
              step="any"
              {...register("o11")}
              error={errors.o11?.message}
            />
            <LabeledInputWithInfo
              label="O12 – konferensiya va boshqa tadbirlarda ma'ruzalari chop etilgan talabalar soni"
              type="number"
              step="any"
              {...register("o12")}
              error={errors.o12?.message}
            />
            <LabeledInputWithInfo
              label="O13 – xalqaro va xorijiy grantlar va loyihalarda ishtirok etgan talabalar soni"
              type="number"
              step="any"
              {...register("o13")}
              error={errors.o13?.message}
            />
            <LabeledInputWithInfo
              label="O14 – sertifikatga ega bo'lgan talabalar soni (IELTS, TOEFL, SAT va boshqalar)"
              type="number"
              step="any"
              {...register("o14")}
              error={errors.o14?.message}
            />
            <LabeledInputWithInfo
              label="O13 sertifikat – O13 bandi uchun sertifikatga ega talabalar soni"
              type="number"
              step="any"
              {...register("o13Cert")}
              error={errors.o13Cert?.message}
            />
            <LabeledInputWithInfo
              label="O14 sertifikat – O14 bandi uchun sertifikatga ega talabalar soni"
              type="number"
              step="any"
              {...register("o14Cert")}
              error={errors.o14Cert?.message}
            />
            <LabeledInputWithInfo
              label="O – umumiy talabalar soni"
              type="number"
              step="any"
              {...register("o")}
              error={errors.o?.message}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="submit"
            className="bg-[#4076FF] hover:bg-[#335ECC] text-white rounded-xl h-13"
            disabled={isPending}
          >
            {isPending ? "Yuborilmoqda..." : "Saqlash va Yakunlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentAchievementForm;
