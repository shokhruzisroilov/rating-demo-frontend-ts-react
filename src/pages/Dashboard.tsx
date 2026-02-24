// app/dashboard/page.tsx
"use client";

import { ActivePeriodCard } from "@/components/dashboard/ActivePeriodCard";
import { DataCompletionChart } from "@/components/dashboard/DataCompletionChart";
import { RegionDistributionChart } from "@/components/dashboard/RegionDistributionChart";
import { StatCards } from "@/components/dashboard/StatCards";
import { TopUniversitiesTable } from "@/components/dashboard/TopUniversitiesTable";
import { UniversityTypeChart } from "@/components/dashboard/UniversityTypeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg">Dashboard yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">Xatolik yuz berdi</h2>
          <p className="text-gray-600">
            Dashboard ma'lumotlarini yuklashda xatolik
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("uz-UZ")}
        </div>
      </div>

      <StatCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UniversityTypeChart
          data={data.universityTypeDistribution}
          title="Universitetlar Turi Bo'yicha Taqsimot"
        />
        <UniversityTypeChart
          data={data.collegeTypeDistribution}
          title="Kollejlar Turi Bo'yicha Taqsimot"
          type="college"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionDistributionChart
          data={data.regionDistribution}
          title="Universitetlar Hududlar Bo'yicha Taqsimot"
        />
        <RegionDistributionChart
          data={data.collegeRegionDistribution}
          title="Kollejlar Hududlar Bo'yicha Taqsimot"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivePeriodCard data={data} />
        <DataCompletionChart data={data} />
        <Card>
          <CardHeader>
            <CardTitle>Umumiy Ko'rsatkichlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>O'rtacha Kompozit Ball:</span>
                <span className="font-bold">
                  {data.averageIndicators?.compositeScore_avg?.toFixed(1) ||
                    "0.0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Faol Universitetlar:</span>
                <span className="font-bold">
                  {data.generalStatistics.activeUniversities}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Faol Kollejlar:</span>
                <span className="font-bold">
                  {data.generalStatistics.activeColleges}
                </span>
              </div>
              <div className="pt-2 border-t">
                <h4 className="font-semibold mb-2">
                  Universitetlar statistikasi
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Davlat:</span>
                    <span>{data.generalStatistics.stateUniversities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Xususiy:</span>
                    <span>{data.generalStatistics.privateUniversities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Filiallar:</span>
                    <span>{data.generalStatistics.branchUniversities}</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <h4 className="font-semibold mb-2">Kollejlar statistikasi</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Davlat:</span>
                    <span>{data.generalStatistics.stateColleges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Xususiy:</span>
                    <span>{data.generalStatistics.privateColleges}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TopUniversitiesTable data={data.topUniversities} />
    </div>
  );
}
