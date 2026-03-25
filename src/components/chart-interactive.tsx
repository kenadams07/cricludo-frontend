"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

type GenericStats = Record<string, number>;

export type GenericStatsByPeriod = {
  daily: Record<string, GenericStats>;
  monthly: Record<string, GenericStats>;
  yearly: Record<string, GenericStats>;
};

type Genericconfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

function transformGenericStatsForChart(
  stats: GenericStatsByPeriod,
  timeRange: "90d" | "30d" | "7d",
  config: Genericconfig,
) {
  if (!stats) return [];

  const periodKey =
    timeRange === "90d" ? "daily" : timeRange === "30d" ? "monthly" : "yearly";

  const periodStats = stats[periodKey];

  return Object.entries(periodStats)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, stat]) => {
      const row: Record<string, any> = { date };

      // 🔑 ONLY include keys that exist in config
      for (const key of Object.keys(config)) {
        if (key === "__duration") {
          row.__duration = stat.durationHour ?? 0;
          row.__durationText = stat.durationText ?? "";
        } else {
          row[key] = stat[key] ?? 0;
        }
      }

      return row;
    });
}

export function ChartInteractiveGeneric({
  stats,
  config,
  title = "Statistics",
}: {
  stats: GenericStatsByPeriod;
  config: Genericconfig;
  title?: string;
}) {
  const safeStats = stats || { daily: {}, monthly: {}, yearly: {} };

  const safeConfig = config || {
    userCount: { label: "Users", color: "#3B82F6" },
    gameRoomCount: { label: "Rooms", color: "#10B981" },
  };

  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  const chartData = React.useMemo(() => {
    return transformGenericStatsForChart(safeStats, timeRange, safeConfig);
  }, [safeStats, timeRange, safeConfig]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Aggregated{" "}
            {timeRange === "90d"
              ? "daily"
              : timeRange === "30d"
                ? "monthly"
                : "yearly"}{" "}
            stats
          </span>
          <span className="@[540px]/card:hidden capitalize">
            {timeRange === "90d"
              ? "Daily"
              : timeRange === "30d"
                ? "Monthly"
                : "Yearly"}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "90d" | "30d" | "7d")
            }
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Daily</ToggleGroupItem>
            <ToggleGroupItem value="30d">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="7d">Yearly</ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeRange}
            onValueChange={(val) => setTimeRange(val as "90d" | "30d" | "7d")}
          >
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Daily</SelectItem>
              <SelectItem value="30d">Monthly</SelectItem>
              <SelectItem value="7d">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={safeConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {Object.keys(safeConfig).map((key) => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={safeConfig[key].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={safeConfig[key].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />

            <ChartTooltip
              cursor={false}
              content={({ label, payload }) => {
                if (!payload || !payload.length) return null;

                return (
                  <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
                    {/* Date */}
                    <div className="mb-2 text-sm font-semibold text-foreground">
                      {label}
                    </div>

                    {/* Rows */}
                    <div className="space-y-1">
                      {payload.map((entry) => {
                        const key = entry.dataKey as string;

                        if (key === "__duration") {
                          return (
                            <div
                              key={key}
                              className="flex justify-between gap-4 text-sm"
                            >
                              <span className="text-muted-foreground">
                                Duration
                              </span>
                              <span className="font-medium">
                                {entry.payload?.__durationText}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={key}
                            className="flex justify-between gap-4 text-sm"
                          >
                            <span className="text-muted-foreground">
                              {safeConfig[key]?.label ?? key}
                            </span>
                            <span className="font-medium">{entry.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
            />

            {Object.keys(safeConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                fill={`url(#fill-${key})`}
                stroke={safeConfig[key].color}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
