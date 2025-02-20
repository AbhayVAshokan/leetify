import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScoreProgression as ScoreProgressionType } from "@/types/analytics";
import { buildChartConfig } from "./utils";
import { User } from "@prisma/client";

interface ScoreProgressionProps {
  users: User[];
  data: ScoreProgressionType[];
}

const ScoreProgression = ({ users, data }: ScoreProgressionProps) => {
  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];

  const chartConfig = buildChartConfig(users) satisfies ChartConfig;
  console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score progression over time</CardTitle>
        <CardDescription>
          Visualizing how user scores changed over time.
        </CardDescription>
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
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {/* <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1"> */}
              {/*   <stop */}
              {/*     offset="5%" */}
              {/*     stopColor="var(--color-desktop)" */}
              {/*     stopOpacity={0.8} */}
              {/*   /> */}
              {/*   <stop */}
              {/*     offset="95%" */}
              {/*     stopColor="var(--color-desktop)" */}
              {/*     stopOpacity={0.1} */}
              {/*   /> */}
              {/* </linearGradient> */}
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillabhayvashokan"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#abhayvashokan)"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
            {/* <Area */}
            {/*   dataKey="desktop" */}
            {/*   type="natural" */}
            {/*   fill="url(#fillDesktop)" */}
            {/*   fillOpacity={0.4} */}
            {/*   stroke="var(--color-desktop)" */}
            {/*   stackId="a" */}
            {/* /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ScoreProgression;
