import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/analysisStore";
import { prepareDashboardData } from "@/lib/analytics-data";
import { API_URL } from "@/lib/config";
import { fetcher } from "@/lib/fetcher";

export function useUsersAnalysisData() {
  const router = useRouter();
  const store = useAnalysisStore.getState();

  const swr = useSWR(
    `${API_URL}/os-analysis/data`,
    async (url: string) => {
      store.setLoading(true);

      const res = await fetcher(url, {
        credentials: "include",
      });

      if (res?.code >= 20001 && res?.code <= 20011) {
        router.push("/login");
        return null;
      }

      if (!res || res.error || res.status >= 400) {
        store.setLoading(false);
        throw new Error(res?.message || "Failed to fetch analysis data");
      }

      return res;
    },
    {
      // ⭐ IMPORTANT — heavy analytics API → reduce refresh
      refreshInterval: 5 * 60 * 1000,
      dedupingInterval: 5 * 60 * 1000,

      revalidateOnFocus: false,
      revalidateOnReconnect: false,

      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        store.setLoading(false);
        if (retryCount >= 1) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },

      onError: (error) => {
        if (error.status === 401) {
          router.push("/auth/login");
        }
      },

      onSuccess: (newData) => {
        if (!newData?.data) {
          store.setLoading(false);
          return;
        }

        // ⭐ still needed for user table + match stats
        const dashboard = prepareDashboardData(newData.data);

        // ⭐ override totals from OpenSearch aggregation
        const summary = newData.data.summary;

        if (summary) {
          dashboard.totalUsers = summary.totalUsers;
          dashboard.totalRoomsCreated = summary.totalRoomsCreated;
          dashboard.todayRoomSettled = summary.todayRoomSettled;
          dashboard.totalCoin = summary.totalCoin;
          dashboard.totalDiamond = summary.totalDiamond;
          dashboard.totalLives = summary.totalLives;

          // histogram conversion
          dashboard.roomsByDate = Object.fromEntries(
            (summary.roomsByDate || []).map((b: any) => [
              b.key_as_string?.slice(0, 10),
              b.doc_count,
            ]),
          );
        }

        // ⭐ VERY IMPORTANT safeguard (large dataset)
        const safeUserTable =
          dashboard.userTableData?.length > 1500
            ? dashboard.userTableData.slice(0, 1500)
            : dashboard.userTableData;

        store.setTotalUsers(dashboard.totalUsers);
        store.setActiveUsers(dashboard.activeUsers);
        store.setActiveUserPercent(dashboard.activeUserPercent);
        store.setTotalRoomsCreated(dashboard.totalRoomsCreated);
        store.setTodayRoomSettled(dashboard.todayRoomSettled);
        store.setTotalCoin(dashboard.totalCoin);
        store.setTotalDiamond(dashboard.totalDiamond);
        store.setTotalLives(dashboard.totalLives);
        store.setRoomsByDate(dashboard.roomsByDate);
        store.setUserTableData(safeUserTable);
        store.setChartData(dashboard.chartData);

        store.setLoading(false);
      },
    },
  );

  return swr;
}
