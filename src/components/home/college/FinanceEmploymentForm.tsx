import { useFinanceEmployment } from "@/hooks/useCollegeDataEnitry";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import HeadingPanel from "../HeadingPanel";
import LabeledInputWithInfo from "../LabeledInputWithInfo";
import { Button } from "@/components/ui/button";
import {
  financeEmploymentSchema,
  type CollegeData,
  type FinanceEmploymentFormData,
} from "@/types/collegeDataEnitry";

interface FinanceEmploymentFormProps {
  collegeId: number;
  periodId: number;
  onSuccess?: () => void;
  collegeData?: CollegeData;
}

const FinanceEmploymentForm: React.FC<FinanceEmploymentFormProps> = ({
  collegeId,
  periodId,
  onSuccess,
  collegeData,
}) => {
  const { mutateAsync, isPending } = useFinanceEmployment();
  const financeData = collegeData?.financeEmploymentData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FinanceEmploymentFormData>({
    resolver: zodResolver(financeEmploymentSchema as any),
    defaultValues: {
      collegeId,
      periodId,
      i31SurveyScore: financeData?.i31SurveyScore ?? 0,
      a1: financeData?.a1 ?? 0,
      a2: financeData?.a2 ?? 0,
      o: financeData?.o ?? 0,
      o7: financeData?.o7 ?? 0,
      b1: financeData?.b1 ?? 0,
      b2: financeData?.b2 ?? 0,
      b3: financeData?.b3 ?? 0,
      b: financeData?.b ?? 0,
    },
  });

  useEffect(() => {
    if (financeData) {
      reset({
        collegeId,
        periodId,
        i31SurveyScore: financeData.i31SurveyScore ?? 0,
        a1: financeData.a1 ?? 0,
        a2: financeData.a2 ?? 0,
        o: financeData.o ?? 0,
        o7: financeData.o7 ?? 0,
        b1: financeData.b1 ?? 0,
        b2: financeData.b2 ?? 0,
        b3: financeData.b3 ?? 0,
        b: financeData.b ?? 0,
      });
    }
  }, [financeData, reset, collegeId, periodId]);

  const onSubmit = async (formData: FinanceEmploymentFormData) => {
    try {
      await mutateAsync(formData);
      toast.success(
        "Moliyaviy barqarorlik va bandlik ma'lumotlari muvaffaqiyatli yuborildi!",
      );
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <FaBriefcase size={20} className="text-[#4778F5]" />
        <h2 className="font-bold text-2xl text-black">
          Moliyaviy barqarorlik va bitiruvchilar bandligi
        </h2>
      </div>

      <div className="w-full h-px bg-[#EBEFFA] my-6"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <HeadingPanel
            title="Moliyaviy barqarorlik va bitiruvchilar bandligi"
            description="Moliyaviy ko'rsatkichlar va bitiruvchilar ish bilan ta'minlanishi (3-mezon)."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInputWithInfo
              label="I31 – So'rovnoma natijalari (avtomatik hisoblanadi)"
              type="number"
              step="any"
              {...register("i31SurveyScore")}
              error={errors.i31SurveyScore?.message}
              disabled
            />
            <LabeledInputWithInfo
              label="A1 – ishlab chiqarilgan mahsulotlar (tovarlar, ish va xizmatlar)ni davlat xaridlari asosida sotishdan olingan mablagʻlar miqdori"
              type="number"
              step="any"
              {...register("a1")}
              error={errors.a1?.message}
            />
            <LabeledInputWithInfo
              label="A2 – ishlab chiqarilgan mahsulotlarni sotishdan va boshqa ta’lim xizmatlarini ko‘rsatishdan tushgan mablagʻlar miqdori"
              type="number"
              step="any"
              {...register("a2")}
              error={errors.a2?.message}
            />
            <LabeledInputWithInfo
              label="Oʻ – tahsil olayotgan o‘quvchilar soni"
              type="number"
              step="any"
              {...register("o")}
              error={errors.o?.message}
            />
            <LabeledInputWithInfo
              label="Oʻ2 – dual taʼlim shaklida tahsil olayotgan oʻquvchilar soni"
              type="number"
              step="any"
              {...register("o7")}
              error={errors.o7?.message}
            />
            <LabeledInputWithInfo
              label="B1 – yakka tartibdagi tadbirkor yoki ta’sischi sifatida faoliyat ko‘rsatayotgan bitiruvchilar soni"
              type="number"
              step="any"
              {...register("b1")}
              error={errors.b1?.message}
            />
            <LabeledInputWithInfo
              label="B2 – davlat organi yoki xo‘jalik yurituvchi subyektda ishlayotgan bitiruvchilar soni"
              type="number"
              step="any"
              {...register("b2")}
              error={errors.b2?.message}
            />
            <LabeledInputWithInfo
              label="B3 – ta’limning keyingi bosqichi bilan qamrab olingan, ikki yoshgacha bola parvarishi bilan band, 1-2 guruh nogironi, o‘zini o‘zi band qilgan bitiruvchilar soni"
              type="number"
              step="any"
              {...register("b3")}
              error={errors.b3?.message}
            />
            <LabeledInputWithInfo
              label="B – jami bitiruvchilar soni"
              type="number"
              step="any"
              {...register("b")}
              error={errors.b?.message}
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

export default FinanceEmploymentForm;
