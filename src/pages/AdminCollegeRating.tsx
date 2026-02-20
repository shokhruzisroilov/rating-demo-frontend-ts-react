import EditIcon from "@/assets/icons/edit-icon.svg?react";
import InfoCircle from "@/assets/icons/info-circle.svg?react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRatingPeriods } from "@/hooks/useRatingPeriods.ts";
import { useCalculateVocationalRatings } from "@/hooks/useRatings";
import { useEffect, useState } from "react";

interface SelectedPeriod {
  id: number;
  name: string;
}

type SortDirection = "asc" | "desc";

const AdminCollegeRating = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<SelectedPeriod | null>(
    null,
  );

  // ====== Davrlar ======
  const {
    data: ratingPeriods,
    isLoading: periodsLoading,
    isError: periodsError,
  } = useRatingPeriods();

  const periodId = selectedPeriod?.id;

  // ====== Calculate ======
  const {
    mutate: calculateRatings,
    data: ratings,
    error: ratingsError,
  } = useCalculateVocationalRatings();

  // ====== Sorting ======
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: string) => {
    if (["rank", "collegeName", "compositeScore"].includes(key)) {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
      return;
    }

    // Display name orqali backend keyni topish
    const reverseMap = Object.fromEntries(
      Object.entries(vocationalIndicatorsMap).map(([k, v]) => [v, k]),
    );
    const actualKey = reverseMap[key] || key;

    if (sortKey === actualKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(actualKey);
      setSortDirection("asc");
    }
  };

  // ====== localStorage ======
  useEffect(() => {
    const stored = localStorage.getItem("selectedVocationalPeriod");
    if (stored) {
      try {
        setSelectedPeriod(JSON.parse(stored));
      } catch {
        localStorage.removeItem("selectedVocationalPeriod");
        setShowWelcomeModal(true);
      }
    } else {
      setShowWelcomeModal(true);
    }
  }, []);

  // ====== Select year ======
  const handleSelectYear = (id: number) => {
    const period = ratingPeriods?.find((p) => p.id === id);
    if (!period) return;

    const selected = { id: period.id, name: period.name };
    setSelectedPeriod(selected);
    localStorage.setItem("selectedVocationalPeriod", JSON.stringify(selected));
    setShowWelcomeModal(false);
  };

  // ====== Calculate ======
  useEffect(() => {
    if (periodId && !ratings) {
      calculateRatings(periodId);
    }
  }, [periodId]);

  // ====== Loading / Error ======
  if (periodsLoading) return <p>Davrlar yuklanmoqda...</p>;
  if (periodsError) return <p>Davrlarni yuklashda xatolik</p>;

  // ====== Vocational indicators mapping ======
  const vocationalIndicatorsMap: Record<string, string> = {
    I11: "Ilmiy daraja (unvon)ga ega o‘qituvchilar ulushi",
    I12: "Ishlab chiqarish tajribasiga ega o‘qituvchilar ulushi",
    I13: "O‘qituvchilarning malaka oshirish ko‘rsatkichi",
    I14: "O‘quv-uslubiy majmualar bilan ta’minlanganlik",
    I15: "O‘quv binolari va jihozlar bilan ta’minlanganlik",
    I16: "Axborot-resurs markazi bilan ta’minlanganlik",
    I17: "Talabalarning sport va ijtimoiy infratuzilmasi",

    I21: "Yotoqxona bilan ta’minlanganlik",
    I22: "Talabalarning ta’lim sifatidan qoniqish darajasi",
    I23: "Bitiruvchilarning bandlik holati",
    I24: "Bitiruvchilarning ishga joylashish muddati",
    I25: "Ish beruvchilar o‘rtasidagi bitiruvchilar nufuzi",

    I31: "Amaliyot bazalari bilan hamkorlik",
    I32: "Dual ta’limga jalb qilingan talabalar ulushi",
    I33: "Xalqaro hamkorlik va loyihalarda ishtirok",
    I34: "Grant va loyihalarga jalb etilgan mablag‘lar",

    I41: "Innovatsion faoliyat va startap loyihalar",
    I42: "Professional ko‘nikmalar sertifikatlariga ega talabalar ulushi",
  };

  // ====== Sorted ratings ======
  const sortedRatings = [...(ratings ?? [])].sort((a, b) => {
    if (!sortKey) return 0;

    let aValue: any;
    let bValue: any;

    if (sortKey === "rank") {
      aValue = a.rank;
      bValue = b.rank;
    } else if (sortKey === "collegeName") {
      aValue = a.collegeName;
      bValue = b.collegeName;
    } else if (sortKey === "compositeScore") {
      aValue = a.compositeScore;
      bValue = b.compositeScore;
    } else {
      aValue = a.weightedScores[sortKey];
      bValue = b.weightedScores[sortKey];
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // ====== Sort Icon ======
  const SortIcon = ({ active }: { active: boolean }) => (
    <span className="ml-1 text-xs">
      {!active ? "⇅" : sortDirection === "asc" ? "↑" : "↓"}
    </span>
  );

  return (
    <div className="w-full max-w-[84vw]">
      {/* ====== Select Period Modal ====== */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="sm:max-w-md rounded-4xl">
          <DialogHeader className="flex flex-col items-center gap-2">
            <InfoCircle width={64} height={64} />
            <DialogTitle className="my-4 text-[24px] font-bold">
              O‘quv davrini tanlang
            </DialogTitle>
          </DialogHeader>

          <Select
            value={selectedPeriod?.id?.toString() ?? ""}
            onValueChange={(val) => handleSelectYear(Number(val))}
          >
            <SelectTrigger className="w-full bg-[#F4F6FC] rounded-xl py-6">
              <SelectValue placeholder="O‘quv yilini tanlang" />
            </SelectTrigger>

            <SelectContent className="bg-[#F4F6FC]">
              {ratingPeriods
                ?.filter((period) => period.status === "ACTIVE")
                ?.map((period) => (
                  <SelectItem key={period.id} value={period.id.toString()}>
                    {period.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() =>
              selectedPeriod && handleSelectYear(selectedPeriod.id)
            }
            disabled={!selectedPeriod}
            className="mt-8 h-13 rounded-xl bg-[#4076FF]"
          >
            Saqlash
          </Button>
        </DialogContent>
      </Dialog>

      {/* ====== Header ====== */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kollejlar reytinglari</h1>

        <div className="flex items-center gap-3">
          {periodId && (
            <Button
              variant="outline"
              className="h-13 rounded-xl bg-[#F4F6FC]"
              onClick={() => setShowWelcomeModal(true)}
            >
              O‘quv davri:
              <strong className="ml-1">{selectedPeriod?.name}</strong>
              <EditIcon className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* ====== Error ====== */}
      {ratingsError && (
        <p className="mb-4 text-red-500">
          Xatolik: {(ratingsError as Error).message}
        </p>
      )}

      {ratings && ratings.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                T/r <SortIcon active={sortKey === "rank"} />
              </TableHead>

              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("collegeName")}
              >
                Kollej nomi
                <SortIcon active={sortKey === "collegeName"} />
              </TableHead>

              {Object.entries(vocationalIndicatorsMap).map(
                ([backendKey, displayName]) => (
                  <TableHead
                    key={backendKey}
                    className="text-center cursor-pointer"
                    onClick={() => handleSort(backendKey)}
                  >
                    {displayName}
                    <SortIcon active={sortKey === backendKey} />
                  </TableHead>
                ),
              )}

              <TableHead
                className="text-center cursor-pointer"
                onClick={() => handleSort("compositeScore")}
              >
                Umumiy ball
                <SortIcon active={sortKey === "compositeScore"} />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedRatings.length ? (
              sortedRatings.map((item) => (
                <TableRow key={item.collegeId} className="hover:bg-muted/50">
                  <TableCell className="text-center">{item.rank}</TableCell>

                  <TableCell>{item.collegeName}</TableCell>

                  {Object.keys(vocationalIndicatorsMap).map((key) => (
                    <TableCell key={key} className="text-center">
                      {item.weightedScores[key]}
                    </TableCell>
                  ))}

                  <TableCell className="text-center font-semibold">
                    {item.compositeScore}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.keys(vocationalIndicatorsMap).length + 3}
                  className="h-24 text-center"
                >
                  Maʼlumot topilmadi
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={Object.keys(vocationalIndicatorsMap).length + 3}
                className="text-right"
              >
                Jami kollejlar: {sortedRatings.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default AdminCollegeRating;
