"use client";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useAnalysisStore } from "@/store/analysisStore";
import { ColumnDef, Row } from "@tanstack/react-table";
import React, { useEffect } from "react";
import z from "zod";
import { ChartInteractiveGeneric } from "@/components/chart-interactive";
import {
  IconCrown,
  IconShield,
  IconUser,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/user-avatar";
import { formatPlaytime } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const schema = z.object({
  id: z.string(),
  username: z.string().optional(),
  profilePic: z.string().optional(),
  active: z.string().optional(),
  email: z.string().optional(),
  totalGamesJoined: z.string().optional(),
  totalRoomsCreated: z.string().optional(),
  wins: z.string().optional(),
  losses: z.string().optional(),
  rating: z.string().optional(),
  coinsDistributed: z.string().optional(),
  totalTimeSpent: z.string().optional(),
  isVIP: z.boolean().optional(),
  isGuest: z.boolean().optional(),
  isAgent: z.boolean().optional(),
  lastLogin: z.string().optional(),
});
// ring-2

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="flex flex-col items-center space-y-2 w-40">
        <UserAvatar
          username={row.original.username || ""}
          profilePic={row.original.profilePic || ""}
        />
        <span className="text-sm">{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const condition = row.original.active;
      return (
        <div className={`${condition ? "text-green-500" : "text-red-500"}`}>
          {condition ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "userType",
    header: "User Type",
    cell: ({ row }) => {
      const { isVIP, isGuest, isAgent } = row.original;
      return (
        <div className="flex  flex-col items-center">
          {isVIP && (
            <Badge
              variant="outline"
              className="flex bg-yellow-500 items-center space-x-1"
            >
              <IconCrown className="h-4 w-4 text-black-500" />
              <span>VIP</span>
            </Badge>
          )}
          {isGuest && (
            <Badge
              variant="outline"
              className="flex bg-blue-300 items-center space-x-1"
            >
              <IconUser className="h-4 w-4 text-black-500" />
              <span>Guest</span>
            </Badge>
          )}
          {isAgent && (
            <Badge
              variant="outline"
              className="flex bg-green-400 items-center space-x-1"
            >
              <IconShield className="h-4 w-4 text-black-500" />
              <span>Agent</span>
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }: { row: Row<z.infer<typeof schema>> }) => {
      const rating = Number(row.original.rating) ?? 0;
      return (
        <div className={rating > 60 ? "text-green-500" : "text-red-500"}>
          {rating.toFixed(2)}%
        </div>
      );
    },
  },
  {
    accessorKey: "gameJoined",
    header: "Game Joined",
    cell: ({ row }) => {
      const gameJoined = row.original.totalGamesJoined;
      return <div>{gameJoined}</div>;
    },
  },
  {
    accessorKey: "roomCreated",
    header: "Room Created",
    cell: ({ row }) => {
      const gameJoined = row.original.totalRoomsCreated;
      return <div>{gameJoined}</div>;
    },
  },
  {
    accessorKey: "totalTimeSpent",
    header: "Time Spent (HH:mm:ss)",
    cell: ({ row }) => {
      const totalSeconds = Number(row.original.totalTimeSpent) ?? 0;

      return <div>{formatPlaytime(totalSeconds/1000)}</div>;
    },
  },
];

export default function DashboardPage() {
  const userTableData = useAnalysisStore((state) => state.userTableData);
  const chartData = useAnalysisStore((state) => state.chartData);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const setTitle = useAuthStore((t) => t.setTitle);
  useEffect(() => {
    setTitle("Dashboard Overview");
    if (user.userType === "agent") {
      router.push(`user/${user?.user?.id || ""}`);
    }
  }, [setTitle, user]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartInteractiveGeneric
              title="User & Room Stats"
              stats={chartData}
              config={{
                userCount: {
                  label: "New Users",
                  color: "#3B82F6",
                },
                gameRoomCount: {
                  label: "Game Rooms",
                  color: "#10B981",
                },
              }}
            />
          </div>
          {userTableData && (
            <DataTable
              data={userTableData}
              columns={columns}
              rowClickable={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
