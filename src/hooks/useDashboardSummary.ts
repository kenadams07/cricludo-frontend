import useSWR from "swr";
import { API_URL } from "@/lib/config";
import { fetcher } from "@/lib/fetcher";
import { useAnalysisStore } from "@/store/analysisStore";
import { useRouter } from "next/navigation";

export function useDashboardSummary() {
  const store = useAnalysisStore.getState();
  const router = useRouter();

  return useSWR(`${API_URL}/os-analysis/dashboard`, fetcher, {
    refreshInterval: 60000,

    onSuccess: (res) => {
      const data = res?.data;
      if (!data) return;

      store.setTotalUsers(data.totalUsers);
      store.setActiveUsers(data.activeUsers);
      store.setActiveUserPercent(data.activeUserPercent);
      store.setTotalRoomsCreated(data.totalRoomsCreated);
      store.setTotalCoin(data.totalCoin);
      store.setTotalDiamond(data.totalDiamond);
      store.setTotalLives(data.totalLives);
      store.setRoomsByDate(data.roomsByDate);

      store.setChartData(data.chartData);
    },

    onError: (error) => {
      if (error.status === 401) {
        router.push("/auth/login");
      }
    },
  });
}
