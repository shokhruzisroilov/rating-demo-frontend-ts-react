// components/dashboard/RegionDistributionChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RegionDistributionChartProps {
  data: Record<string, number>;
  title?: string;
}

export function RegionDistributionChart({
  data,
  title = "Hududlar Bo'yicha Taqsimot",
}: RegionDistributionChartProps) {
  const chartData = Object.entries(data)
    .filter(
      ([key, value]) => key !== "string" && key !== "fdsafasfas" && value > 0,
    )
    .map(([region, count]) => ({
      region:
        region === "tashkent"
          ? "Toshkent"
          : region === "samarkand"
            ? "Samarqand"
            : region === "bukhara"
              ? "Buxoro"
              : region === "andijan"
                ? "Andijon"
                : region === "fergana"
                  ? "Farg'ona"
                  : region === "namangan"
                    ? "Namangan"
                    : region === "khorezm"
                      ? "Xorazm"
                      : region === "surkhandarya"
                        ? "Surxondaryo"
                        : region === "kashkadarya"
                          ? "Qashqadaryo"
                          : region === "jizzakh"
                            ? "Jizzax"
                            : region === "sirdarya"
                              ? "Sirdaryo"
                              : region === "navoi"
                                ? "Navoiy"
                                : region === "karakalpakstan"
                                  ? "Qoraqalpog'iston"
                                  : region,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="region"
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
