// components/dashboard/UniversityTypeChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

interface UniversityTypeChartProps {
  data: Record<string, number>;
  title?: string;
  type?: "university" | "college";
}

export function UniversityTypeChart({
  data,
  title = "Universitetlar Turi Bo'yicha Taqsimot",
  type = "university",
}: UniversityTypeChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name:
      name === "state"
        ? "Davlat"
        : name === "private"
          ? "Xususiy"
          : name === "branch"
            ? "Filial"
            : name,
    value,
  }));

  // type propni ishlatish
  const chartTitle =
    type === "university"
      ? title
      : "Kasbiy ta'lim tashkilotlar Turi Bo'yicha Taqsimot";

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(
                { name, percent = 0 }, // percent ga default qiymat berish
              ) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
