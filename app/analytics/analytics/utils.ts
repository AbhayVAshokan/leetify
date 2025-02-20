import { User } from "@prisma/client";

export const buildChartConfig = (users: User[]) =>
  users.reduce(
    (config, user, index) => ({
      ...config,
      [user.username]: {
        label: user.name,
        color: `hsl(var(--char-${index + 1}))`,
      },
    }),
    {},
  );

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
