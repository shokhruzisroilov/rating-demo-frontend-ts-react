import { dashboardApi, type DashboardResponse } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboardData,
  });
};
