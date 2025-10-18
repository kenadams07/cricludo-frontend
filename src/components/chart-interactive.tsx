"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

type GenericStats = Record<string, number>;

type GenericStatsByPeriod = {
  daily: Record<string, GenericStats>;
  monthly: Record<string, GenericStats>;
  yearly: Record<string, GenericStats>;
};

type GenericChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

function transformGenericStatsForChart(
  stats: GenericStatsByPeriod,
  timeRange: "90d" | "30d" | "7d"
) {
  if(stats == null) return [];
  const periodKey =
    timeRange === "90d" ? "daily" : timeRange === "30d" ? "monthly" : "yearly";

  const periodStats = stats[periodKey];
  const entries = Object.entries(periodStats);

  // Sort by date
  entries.sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime());

  return entries.map(([date, stat]) => ({ date, ...stat }));
}


export function ChartInteractiveGeneric({
  stats,
  config,
  title = "Statistics",
}: {
  stats: GenericStatsByPeriod;
  config: GenericChartConfig;
  title?: string;
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  const chartData = React.useMemo(() => {
    return transformGenericStatsForChart(stats, timeRange);
  }, [stats, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Aggregated {timeRange === "90d" ? "daily" : timeRange === "30d" ? "monthly" : "yearly"} stats
          </span>
          <span className="@[540px]/card:hidden capitalize">
            {timeRange === "90d" ? "Daily" : timeRange === "30d" ? "Monthly" : "Yearly"}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as "90d" | "30d" | "7d")}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Daily</ToggleGroupItem>
            <ToggleGroupItem value="30d">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="7d">Yearly</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={(val) => setTimeRange(val as "90d" | "30d" | "7d")}>
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
        <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              {Object.keys(config).map((key) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config[key].color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={config[key].color} stopOpacity={0.1} />
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
              tickFormatter={(value) => value} // Keep original format: YYYY-MM-DD, YYYY-MM, or YYYY
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />

            {Object.keys(config).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="monotone"
                fill={`url(#fill-${key})`}
                stroke={config[key].color}
                // stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


