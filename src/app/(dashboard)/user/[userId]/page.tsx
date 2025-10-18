"use client";
import { useParams, useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/analysisStore";
import { UserProfileCard } from "./userProfileCards";
import { ChartInteractiveGeneric } from "@/components/chart-interactive";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { LoginHistoryCard } from "./loginHistoryCard";
import { format } from "date-fns";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { mutate } from "swr";
import { API_URL } from "@/lib/config";
import { formatPlaytime } from "@/lib/utils";

const gameSessionSchema = z.object({
  id: z.string(),
  date: z.string(),
  result: z.string(),
  opponents: z.array(z.string()),
  roomId: z.string(),
  gameType: z.string(),
  category: z.string(),
  winnerPrize: z.number(),
  entryValue: z.number(),
  coinType: z.string(),
  gameId: z.string(),
  startedAt: z.string(),
  endedAt: z.string(),
  duration: z.number(),
  endReason: z.string(),
  totalOver: z.number()
});

type GameSession = z.infer<typeof gameSessionSchema>;

const gameSessionColumns: ColumnDef<GameSession>[] = [
  {
    accessorKey: "opponents",
    header: "Opponents",
    cell: ({ row }) => (
      <div className="truncate w-40">{row.original.opponents.join(", ")}</div>
    ),
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const result = row.original.result;
      const color = result === "win" ? "text-green-500" : "text-red-500";
      return <div className={color}>{result.toUpperCase()}</div>;
    },
  },
  {
    accessorKey: "roomId",
    header: "Room ID",
    cell: ({ row }) => <div>{row.original.roomId}</div>,
  },
  {
    accessorKey: "gameType",
    header: "Game Type",
    cell: ({ row }) => <div>{row.original.gameType}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    accessorKey: "winnerPrize",
    header: "Prize",
    cell: ({ row }) => <div>{row.original.winnerPrize}</div>,
  },
  {
    accessorKey: "entryValue",
    header: "Entry",
    cell: ({ row }) => <div>{row.original.entryValue}</div>,
  },
  {
    accessorKey: "coinType",
    header: "Coin Type",
    cell: ({ row }) => <div>{row.original.coinType}</div>,
  },
  {
    accessorKey: "totalOver",
    header: "Total Over",
    cell: ({ row }) => <div>{row.original.totalOver}</div>,
  },
  {
    accessorKey: "gameId",
    header: "Game ID",
    cell: ({ row }) => <div>{row.original.gameId}</div>,
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) => (
      <div>
        {row.original?.startedAt
          ? format(new Date(row.original?.startedAt), "PPpp")
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "endedAt",
    header: "Ended At",
    cell: ({ row }) => (
      <div>
        {row.original.endedAt
          ? format(new Date(row.original.endedAt), "PPpp")
          : ""}
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration (ms)",
    cell: ({ row }) => <div>{`${formatPlaytime(row?.original?.duration/1000)}` || ""}</div>,
  },
  {
    accessorKey: "endReason",
    header: "End Reason",
    cell: ({ row }) => (
      <div className="w-60" title={row.original.endReason || ""}>
        {row.original.endReason}
      </div>
    ),
  },
];

export default function userDashboard() {
  const params = useParams();
  const data = useAnalysisStore((u) => u.userTableData);
  const loading = useAnalysisStore((l)=> l.loading);
  const userData = data.find((d) => d.id === params.userId);
  const setTitle = useAuthStore((t) => t.setTitle);
  useEffect(() => {
    setTitle('User Dashboard');
    mutate(`${API_URL}/analysis/data`);
  }, [setTitle]);
  if(loading){
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75">
            <Spinner />
          </div>
        );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <UserProfileCard user={userData} />
          <div className="px-4 lg:px-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <ChartInteractiveGeneric
                title="Game Stats"
                stats={userData?.userChartData}
                config={{
                  gamesPlayed: {
                    label: "Games Played",
                    color: "#3B82F6",
                  },
                  wins: {
                    label: "Wins",
                    color: "#10B981",
                  },
                  losses: {
                    label: "Losses",
                    color: "#EF4444",
                  },
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <LoginHistoryCard logins={userData?.loginHistory || []} />
            </div>
          </div>
          
          {userData?.userMatches && (
            <DataTable
              data={userData?.userMatches || []}
              columns={gameSessionColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
}
