// components/dashboard/StatCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  Building2,
  Calendar,
  Users,
  School,
  Landmark,
} from "lucide-react";

interface StatCardsProps {
  data: any;
}

export function StatCards({ data }: StatCardsProps) {
  const stats = [
    {
      title: "Jami Universitetlar",
      value: data.generalStatistics.totalUniversities,
      icon: Building2,
      description: `${data.generalStatistics.activeUniversities} faol, ${data.generalStatistics.inactiveUniversities} nofaol`,
      color: "bg-blue-500",
    },
    {
      title: "Jami Kasbiy ta'lim tashkilotlar",
      value: data.generalStatistics.totalColleges,
      icon: School,
      description: `${data.generalStatistics.activeColleges} faol, ${data.generalStatistics.inactiveColleges} nofaol`,
      color: "bg-indigo-500",
    },
    {
      title: "Foydalanuvchilar",
      value: data.generalStatistics.totalUsers,
      icon: Users,
      description: "Jami ro'yxatdan o'tgan foydalanuvchilar",
      color: "bg-green-500",
    },
    {
      title: "Reyting Davrlari",
      value: data.generalStatistics.totalRatingPeriods,
      icon: Calendar,
      description: `${data.generalStatistics.activeRatingPeriods} faol, ${data.generalStatistics.closedRatingPeriods} yopilgan`,
      color: "bg-purple-500",
    },
    {
      title: "Universitetlar (turi)",
      value:
        data.generalStatistics.stateUniversities +
        data.generalStatistics.privateUniversities +
        data.generalStatistics.branchUniversities,
      icon: Building,
      description: `${data.generalStatistics.stateUniversities} davlat, ${data.generalStatistics.privateUniversities} xususiy, ${data.generalStatistics.branchUniversities} filial`,
      color: "bg-red-500",
    },
    {
      title: "Kasbiy ta'lim tashkilotlar (turi)",
      value:
        data.generalStatistics.stateColleges +
        data.generalStatistics.privateColleges,
      icon: Landmark,
      description: `${data.generalStatistics.stateColleges} davlat, ${data.generalStatistics.privateColleges} xususiy`,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color} text-white`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
