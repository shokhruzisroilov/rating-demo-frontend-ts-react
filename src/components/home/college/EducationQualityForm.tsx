

import { useEducationQuality } from "@/hooks/useCollegeDataEnitry";
import { educationQualitySchema, type CollegeData, type EducationQualityFormData } from "@/types/collegeDataEnitry";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFlask } from "react-icons/fa";
import { toast } from "react-toastify";
import HeadingPanel from "../HeadingPanel";
import LabeledInputWithInfo from "../LabeledInputWithInfo";
import { Button } from "@/components/ui/button";


interface EducationQualityFormProps {
  collegeId: number;
  periodId: number;
  onSuccess?: () => void;
  collegeData?: CollegeData;
}

const EducationQualityForm: React.FC<EducationQualityFormProps> = ({
  collegeId,
  periodId,
  onSuccess,
  collegeData,
}) => {
  const { mutateAsync, isPending } = useEducationQuality();
  const educationData = collegeData?.educationQualityData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationQualityFormData>({
    resolver: zodResolver(educationQualitySchema as any),
    defaultValues: {
      collegeId,
      periodId,
      i21MaterialTechnicalScore: educationData?.i21MaterialTechnicalScore ?? 0,
      i22SurveyScore: educationData?.i22SurveyScore ?? 0,
      d1: educationData?.d1 ?? 0,
      d2: educationData?.d2 ?? 0,
      qSum: educationData?.qSum ?? 0,
      n: educationData?.n ?? 0,
      o5: educationData?.o5 ?? 0,
      p18: educationData?.p18 ?? 0,
      pMax: educationData?.pMax ?? 0,
      o: educationData?.o ?? 0,
    },
  });

  useEffect(() => {
    if (educationData) {
      reset({
        collegeId,
        periodId,
        i21MaterialTechnicalScore: educationData.i21MaterialTechnicalScore ?? 0,
        i22SurveyScore: educationData.i22SurveyScore ?? 0,
        d1: educationData.d1 ?? 0,
        d2: educationData.d2 ?? 0,
        qSum: educationData.qSum ?? 0,
        n: educationData.n ?? 0,
        o5: educationData.o5 ?? 0,
        p18: educationData.p18 ?? 0,
        pMax: educationData.pMax ?? 0,
        o: educationData.o ?? 0,
      });
    }
  }, [educationData, reset, collegeId, periodId]);

  const onSubmit = async (formData: EducationQualityFormData) => {
    try {
      await mutateAsync(formData);
      toast.success("Ta'lim sifati ma'lumotlari muvaffaqiyatli yuborildi!");
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <FaFlask size={20} className="text-[#4778F5]" />
        <h2 className="font-bold text-2xl text-black">Ta'lim sifati</h2>
      </div>

      <div className="w-full h-px bg-[#EBEFFA] my-6"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <HeadingPanel
            title="Ta'lim sifati"
            description="O'quv jarayoni va ta'lim resurslari sifati (2-mezon)."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInputWithInfo
              label="I21 – Moddiy-texnika bazasi ko'rsatkichi (avtomatik hisoblanadi)"
              type="number"
              step="any"
              {...register("i21MaterialTechnicalScore")}
              error={errors.i21MaterialTechnicalScore?.message}
              disabled
            />
            <LabeledInputWithInfo
              label="I22 – So'rovnoma natijalari (avtomatik hisoblanadi)"
              type="number"
              step="any"
              {...register("i22SurveyScore")}
              error={errors.i22SurveyScore?.message}
              disabled
            />
            <LabeledInputWithInfo
              label="D1 – mavjud kasb va mutaxassisliklarning oʻquv rejalaridagi auditoriya yuklamalari (soatlari) miqdori"
              type="number"
              step="any"
              {...register("d1")}
              error={errors.d1?.message}
            />
            <LabeledInputWithInfo
              label="D2 – sababsiz oʻtkazib yuborilgan auditoriya soatlari"
              type="number"
              step="any"
              {...register("d2")}
              error={errors.d2?.message}
            />
            <LabeledInputWithInfo
              label="Qn – tegishli kasb va mutaxassisliklar kesimida tasdiqlangan qabul parametrlarining bajarilishi (qabul parametrlari ortig‘i bilan bajarilgan taqdirda ushbu ko‘rsatkich 1 ga teng hisoblanadi)"
              type="number"
              step="any"
              {...register("qSum")}
              error={errors.qSum?.message}
            />
            <LabeledInputWithInfo
              label="n – kasb va mutaxassisliklar soni"
              type="number"
              step="any"
              {...register("n")}
              error={errors.n?.message}
            />
            <LabeledInputWithInfo
              label="Oʻ1 – xalqaro(1) va qoʻshma taʼlim dasturida tahsil olayotgan oʻquvchilar soni"
              step="any"
              {...register("o5")}
              error={errors.o5?.message}
            />
            <LabeledInputWithInfo
              label="P18 – xalqaro va qoʻshma dasturlar soni"
              type="number"
              step="any"
              {...register("p18")}
              error={errors.p18?.message}
            />
            <LabeledInputWithInfo
              label="Pmax – ta’lim tashkilotlari orasidagi eng ko‘p xalqaro va qoʻshma taʼlim dasturlarga ega bo‘lgan ta’lim tashkilotining shunday taʼlim dasturlari soni"
              type="number"
              step="any"
              {...register("pMax")}
              error={errors.pMax?.message}
            />
            <LabeledInputWithInfo
              label="Oʻ – jami tahsil olayotgan o‘quvchilar soni"
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
            {isPending
              ? "Yuborilmoqda..."
              : "Saqlash va Keyingi shaklga o'tish"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationQualityForm;
