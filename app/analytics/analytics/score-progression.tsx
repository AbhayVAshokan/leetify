import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScoreProgression as ScoreProgressionType } from "@/types/analytics";
import { buildChartConfig, formattedDate } from "./utils";
import { User } from "@prisma/client";
import React from "react";
import { useTranslations } from "next-intl";

interface ScoreProgressionProps {
  users: User[];
  data: ScoreProgressionType[];
}

const ScoreProgression = ({ users, data }: ScoreProgressionProps) => {
  const t = useTranslations("AnalyticsPage.scoreProgression");
  const chartConfig = buildChartConfig(users) satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={2}
              tickFormatter={formattedDate}
            />
            <YAxis />
            {users.map((user, index) => (
              <defs key={user.username}>
                <linearGradient id={user.username} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`hsl(var(--chart-${index + 1}))`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`hsl(var(--chart-${index + 1}))`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
            ))}
            {users.map((user, index) => (
              <Area
                key={user.username}
                animationDuration={500}
                dataKey={user.username}
                type="monotone"
                fill={`url(#${user.username})`}
                fillOpacity={0.4}
                stroke={`hsl(var(--chart-${index + 1}))`}
              />
            ))}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={formattedDate} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ScoreProgression;
