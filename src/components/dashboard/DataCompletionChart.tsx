import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DataCompletionChartProps {
  data: any;
}

export function DataCompletionChart({ data }: DataCompletionChartProps) {
  const completionData = [
    {
      name: "Professor Ma'lumotlari",
      value: data.dataEntryStatus.professorDataPercentage,
      color: "bg-blue-500",
    },
    {
      name: "Ilmiy Ma'lumotlar",
      value: data.dataEntryStatus.scientificDataPercentage,
      color: "bg-green-500",
    },
    {
      name: "Xalqaro Ma'lumotlar",
      value: data.dataEntryStatus.internationalDataPercentage,
      color: "bg-yellow-500",
    },
    {
      name: "Bitiruvchi Ma'lumotlari",
      value: data.dataEntryStatus.graduateDataPercentage,
      color: "bg-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ma'lumot Kiritish Holati (Universitetlar)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Umumiy to'ldirilganlik</span>
            <span className="text-sm font-bold">
              {data.dataEntryStatus.overallCompletionPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress
            value={data.dataEntryStatus.overallCompletionPercentage}
            className="h-2"
          />
        </div>

        {completionData.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">{item.name}</span>
              <span className="text-sm font-medium">
                {item.value.toFixed(1)}%
              </span>
            </div>
            <Progress value={item.value} className="h-1" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
