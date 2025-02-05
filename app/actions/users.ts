"use server";

import { SCORE } from "@/lib/constants/score";
import prisma from "@/lib/prisma";
import { UserRanked } from "@/types/user";

export const fetchUsers = async (): Promise<UserRanked[]> => {
  const users = await prisma.user.findMany({
    include: { problems: true },
  });
  // Calculate score dynamically
  const usersWithScore = users.map((user) => {
    const score = user.problems.reduce((sum, problem) => {
      if (problem.difficulty === "easy") return sum + SCORE.easy; // Easy → 2 points
      if (problem.difficulty === "medium") return sum + SCORE.medium; // Medium → 4 points
      if (problem.difficulty === "hard") return sum + SCORE.hard; // Hard → 6 points
      return sum;
    }, 0);

    return {
      ...user,
      score,
    };
  });
  const usersRanked = usersWithScore
    .sort((a, b) => b.score - a.score)
    .map((user, idx) => ({ ...user, rank: idx + 1 }));
  return usersRanked;
};
