import { User } from "@prisma/client";

export type UserRanked = User & {
  score: number;
  rank: number;
};
