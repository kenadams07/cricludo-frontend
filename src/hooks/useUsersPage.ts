import useSWR from "swr";
import { API_URL } from "@/lib/config";
import { fetcher } from "@/lib/fetcher";
import { useAnalysisStore } from "@/store/analysisStore";
import { useRouter } from "next/navigation";

export function useUsersPage(page: number) {
  const store = useAnalysisStore.getState();
  const router = useRouter();

  return useSWR(`${API_URL}/os-analysis/users?page=${page}&limit=20`, fetcher, {
    revalidateOnFocus: false,

    onSuccess: (res) => {
      const data = res?.data || [];
      store.setUserTableData(data);
    },

    onError: (error) => {
      if (error.status === 401) {
        router.push("/auth/login");
      }
    },
  });
}
