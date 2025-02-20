"use server";

// TODO: The logic is written without any time-zone offset to Asia/Kolkata.
// This will work as long as the deployment is done to a server hosted in India.

import { SCORE } from "@/lib/constants/score";
import prisma from "@/lib/prisma";
import { Problem } from "@prisma/client";
import { SYNC_START_DATE } from "./constants";

type ScoreType = Record<string, number>;
type ScoreSummaryType = Record<string, ScoreType>;

const buildUserData = (problems: Problem[]) =>
  problems.reduce<ScoreType>((data, problem) => {
    const date = problem.submittedAt.withoutTime().toISOString();
    const prevScore = data[date] ?? 0;
    const difficulty = problem.difficulty.toLowerCase() as keyof typeof SCORE;
    const score = SCORE[difficulty];
    return { ...data, [date]: prevScore + score };
  }, {});

export const fetchScoreProgression = async () => {
  const users = await prisma.user.findMany({
    include: { problems: { orderBy: { submittedAt: "asc" } } },
  });

  const scores = users.reduce<ScoreSummaryType>((summary, user) => {
    const userData = buildUserData(user.problems);
    return { ...summary, [user.username]: userData };
  }, {});

  const chartData = [];
  const currDate = new Date(SYNC_START_DATE);
  const cumulativeScore = users.reduce<ScoreType>(
    (sum, user) => ({ ...sum, [user.username]: 0 }),
    {},
  );

  while (currDate.withoutTime() <= new Date().withoutTime()) {
    const date = currDate.withoutTime().toISOString();
    const dataForCurrDate: Record<string, number | string> = { date };

    users.forEach((user) => {
      cumulativeScore[user.username] += scores[user.username][date] ?? 0;
      dataForCurrDate[user.username] = cumulativeScore[user.username];
    });

    chartData.push(dataForCurrDate);
    currDate.setDate(currDate.getDate() + 1);
  }

  return chartData;
};
