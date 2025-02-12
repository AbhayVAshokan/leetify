"use server";

import { SCORE } from "@/lib/constants/score";
import prisma from "@/lib/prisma";
import { UserRanked } from "@/types/user";
import { ONE_DAY_IN_SECONDS, TIMEZONE } from "./constants";

export const fetchUsers = async (): Promise<UserRanked[]> => {
  const users = await prisma.user.findMany({
    include: { problems: true },
  });
  // Calculate score dynamically
  const usersWithScore = users.map((user) => {
    const score = user.problems.reduce((sum, problem) => {
      const difficulty = problem.difficulty.toLowerCase() as keyof typeof SCORE;
      return sum + SCORE[difficulty];
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

const parseDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", { timeZone: TIMEZONE });

export const fetchStreak = async ({
  username,
}: {
  username: string;
}): Promise<{
  streakCount: number;
  currentDayCompleted: boolean;
}> => {
  const problems = await prisma.problem.findMany({
    where: {
      user: {
        username: { equals: username, mode: "insensitive" },
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  if (problems.length === 0) {
    return { streakCount: 0, currentDayCompleted: false };
  }

  let streakCount = 0;
  let prevDate = parseDate(new Date());
  problems.every((problem) => {
    const currDate = parseDate(problem.submittedAt);
    if (currDate === prevDate) {
      return true;
    }

    const date1 = new Date(currDate);
    const date2 = new Date(prevDate);
    // @ts-expect-error: subtraction of two bigints will be an int.
    const diff = (date2 - date1) / ONE_DAY_IN_SECONDS;

    if (diff === 1) {
      ++streakCount;
    } else {
      return false;
    }

    prevDate = currDate;
    return true;
  });

  const currentDayCompleted =
    parseDate(problems[0].submittedAt) === parseDate(new Date());

  return {
    streakCount: streakCount + Number(currentDayCompleted),
    currentDayCompleted: currentDayCompleted,
  };
};
