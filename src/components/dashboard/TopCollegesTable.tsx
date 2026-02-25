"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface TopCollege {
  rank: number;
  collegeId: number;
  collegeName: string;
  collegeCode: string;
  collegeType: string;
  region: string;
  compositeScore: number;
  previousScore: number | null;
  rankChange: number | null;
}

interface TopCollegesTableProps {
  data: TopCollege[];
}

export function TopCollegesTable({ data }: TopCollegesTableProps) {
  const getRankChangeIcon = (change: number | null) => {
    if (change === null) return <Minus className="h-4 w-4 text-gray-500" />;
    if (change > 0) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getCollegeTypeLabel = (type: string) => {
    switch (type) {
      case "STATE":
        return "Davlat";
      case "PRIVATE":
        return "Xususiy";
      default:
        return type;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Kasbiy ta'lim tashkilotlar</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">O'rin</TableHead>
              <TableHead>Kasbiy ta'lim tashkilot</TableHead>
              <TableHead>Kod</TableHead>
              <TableHead>Turi</TableHead>
              <TableHead>Hudud</TableHead>
              <TableHead className="text-right">Umumiy Ball</TableHead>
              <TableHead className="text-right">O'zgarish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((college) => (
                <TableRow key={college.collegeId}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">#{college.rank}</span>
                      {getRankChangeIcon(college.rankChange)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{college.collegeName}</div>
                  </TableCell>
                  <TableCell>{college.collegeCode}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        college.collegeType === "STATE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {getCollegeTypeLabel(college.collegeType)}
                    </span>
                  </TableCell>
                  <TableCell>{college.region}</TableCell>
                  <TableCell className="text-right font-bold">
                    {(college.compositeScore ?? 0).toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-medium ${
                        college.rankChange && college.rankChange > 0
                          ? "text-green-600"
                          : college.rankChange && college.rankChange < 0
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {college.rankChange && college.rankChange > 0 ? "+" : ""}
                      {college.rankChange !== null ? college.rankChange : "0"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
