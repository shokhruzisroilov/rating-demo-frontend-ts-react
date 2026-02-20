import { usePedagog } from "@/hooks/useCollegeDataEnitry";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaChalkboardTeacher } from "react-icons/fa";
import { toast } from "react-toastify";
import { pedagogSchema, type CollegeData, type PedagogFormData } from "@/types/collegeDataEnitry";
import LabeledInputWithInfo from "../LabeledInputWithInfo";
import HeadingPanel from "../HeadingPanel";
import { Button } from "@/components/ui/button";

interface PedagogFormProps {
  collegeId: number;
  periodId: number;
  onSuccess?: () => void;
  collegeData?: CollegeData;
}

const PedagogForm: React.FC<PedagogFormProps> = ({
  collegeId,
  periodId,
  onSuccess,
  collegeData,
}) => {
  const { mutateAsync, isPending } = usePedagog();
  const pedagogData = collegeData?.pedagogData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PedagogFormData>({
    resolver: zodResolver(pedagogSchema as any),
    defaultValues: {
      collegeId,
      periodId,
      p1: pedagogData?.p1 ?? 0,
      p2: pedagogData?.p2 ?? 0,
      p3: pedagogData?.p3 ?? 0,
      p4: pedagogData?.p4 ?? 0,
      p5: pedagogData?.p5 ?? 0,
      p6: pedagogData?.p6 ?? 0,
      p7: pedagogData?.p7 ?? 0,
      p8: pedagogData?.p8 ?? 0,
      p9: pedagogData?.p9 ?? 0,
      p10: pedagogData?.p10 ?? 0,
      p11: pedagogData?.p11 ?? 0,
      p12: pedagogData?.p12 ?? 0,
      p13: pedagogData?.p13 ?? 0,
      p14: pedagogData?.p14 ?? 0,
      p15: pedagogData?.p15 ?? 0,
      p16: pedagogData?.p16 ?? 0,
      p17: pedagogData?.p17 ?? 0,
      p: pedagogData?.p ?? 0,
      i16SurveyScore: pedagogData?.i16SurveyScore ?? 0,
    },
  });

  useEffect(() => {
    if (pedagogData) {
      reset({
        collegeId,
        periodId,
        p1: pedagogData.p1 ?? 0,
        p2: pedagogData.p2 ?? 0,
        p3: pedagogData.p3 ?? 0,
        p4: pedagogData.p4 ?? 0,
        p5: pedagogData.p5 ?? 0,
        p6: pedagogData.p6 ?? 0,
        p7: pedagogData.p7 ?? 0,
        p8: pedagogData.p8 ?? 0,
        p9: pedagogData.p9 ?? 0,
        p10: pedagogData.p10 ?? 0,
        p11: pedagogData.p11 ?? 0,
        p12: pedagogData.p12 ?? 0,
        p13: pedagogData.p13 ?? 0,
        p14: pedagogData.p14 ?? 0,
        p15: pedagogData.p15 ?? 0,
        p16: pedagogData.p16 ?? 0,
        p17: pedagogData.p17 ?? 0,
        p: pedagogData.p ?? 0,
        i16SurveyScore: pedagogData.i16SurveyScore ?? 0,
      });
    }
  }, [pedagogData, reset, collegeId, periodId]);

  const onSubmit = async (formData: PedagogFormData) => {
    try {
      await mutateAsync(formData);
      toast.success("Pedagog kadrlar ma'lumotlari muvaffaqiyatli yuborildi!");
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <FaChalkboardTeacher size={20} className="text-[#4778F5]" />
        <h2 className="font-bold text-2xl text-black">
          Pedagog kadrlar salohiyati
        </h2>
      </div>

      <div className="w-full h-px bg-[#EBEFFA] my-6"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <HeadingPanel
            title="Pedagog kadrlar salohiyati"
            description="Pedagog kadrlarning malaka va tajriba darajasi (1-mezon)."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledInputWithInfo
              label="P1 – ilmiy daraja (unvon)ga ega pedagoglar soni"
              type="number"
              step="any"
              {...register("p1")}
              error={errors.p1?.message}
            />
            <LabeledInputWithInfo
              label="P2 – xorijiy davlat fuqarosi hisoblangan pedagoglar soni"
              type="number"
              step="any"
              {...register("p2")}
              error={errors.p2?.message}
            />
            <LabeledInputWithInfo
              label="P3 – “TOP-1000” xorijiy OTM diplomiga ega pedagoglar soni"
              type="number"
              step="any"
              {...register("p3")}
              error={errors.p3?.message}
            />
            <LabeledInputWithInfo
              label="P4 – bosh o‘qituvchi pedagoglar soni"
              type="number"
              step="any"
              {...register("p4")}
              error={errors.p4?.message}
            />
            <LabeledInputWithInfo
              label="P5 – yetakchi o‘qituvchi pedagoglar va 1-2 toifali ishlab chiqarish ta’lim ustalari soni"
              type="number"
              step="any"
              {...register("p5")}
              error={errors.p5?.message}
            />
            <LabeledInputWithInfo
              label="P6 – katta o‘qituvchi pedagoglar soni"
              type="number"
              step="any"
              {...register("p6")}
              error={errors.p6?.message}
            />
            <LabeledInputWithInfo
              label="P7 – respublika hududida malaka oshirgan ishlab chiqarish ta’lim ustalari soni"
              type="number"
              step="any"
              {...register("p7")}
              error={errors.p7?.message}
            />
            <LabeledInputWithInfo
              label="P8 – respublika hududida malaka oshirish va stajirovkada qatnashgan umumta’lim, umumkasbiy va maxsus fan pedagoglari soni"
              type="number"
              step="any"
              {...register("p8")}
              error={errors.p8?.message}
            />
            <LabeledInputWithInfo
              label="P9 – xorijda malaka oshirish yoki stajirovkada qatnashgan pedagoglar soni"
              type="number"
              step="any"
              {...register("p9")}
              error={errors.p9?.message}
            />
            <LabeledInputWithInfo
              label="P10 – xorijga malaka oshirish uchun yuborilgan ishlab chiqarish ta’lim ustalari soni"
              type="number"
              step="any"
              {...register("p10")}
              error={errors.p10?.message}
            />
            <LabeledInputWithInfo
              label="P11 – xorijga yuborilgan maxsus fan pedagoglari soni"
              type="number"
              step="any"
              {...register("p11")}
              error={errors.p11?.message}
            />
            <LabeledInputWithInfo
              label="P12 – xorijga yuborilgan umumta’lim fan pedagoglari soni"
              type="number"
              step="any"
              {...register("p12")}
              error={errors.p12?.message}
            />
            <LabeledInputWithInfo
              label="P13 – xalqaro sertifikatga ega pedagoglar soni"
              type="number"
              step="any"
              {...register("p13")}
              error={errors.p13?.message}
            />
            <LabeledInputWithInfo
              label="P14 – milliy sertifikatga ega pedagoglar soni"
              type="number"
              step="any"
              {...register("p14")}
              error={errors.p14?.message}
            />
            <LabeledInputWithInfo
              label="P15 – tashqi o‘rindosh sifatida jalb qilingan soha mutaxassislari soni"
              type="number"
              step="any"
              {...register("p15")}
              error={errors.p15?.message}
            />
            <LabeledInputWithInfo
              label="P16 – tashqi o‘rindosh xorijiy pedagoglar soni"
              type="number"
              step="any"
              {...register("p16")}
              error={errors.p16?.message}
            />
            <LabeledInputWithInfo
              label="P17 – tashqi o‘rindosh OTM professor-o‘qituvchilari soni"
              type="number"
              step="any"
              {...register("p17")}
              error={errors.p17?.message}
            />
            <LabeledInputWithInfo
              label="P – asosiy shtat va ichki o‘rindosh sifatida mehnat faoliyatini olib boruvchi pedagoglar soni"
              type="number"
              step="any"
              {...register("p")}
              error={errors.p?.message}
            />
            <LabeledInputWithInfo
              label="I16 – So‘rovnoma natijalari (avtomatik hisoblanadi)"
              type="number"
              step="any"
              {...register("i16SurveyScore")}
              error={errors.i16SurveyScore?.message}
              disabled
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

export default PedagogForm;
