"use server";

import { User } from "@prisma/client";
import {
  LEET_CODE_HEADERS,
  LEET_CODE_GRAPH_URL,
  PROBLEM_DETAILS_QUERY,
  SubmissionResponse,
  SUBMISSIONS_QUERY,
  SYNC_START_DATE,
} from "./constants";
import prisma from "@/lib/prisma";

const fetchSubmissions = async (username: string) => {
  const response = await fetch(LEET_CODE_GRAPH_URL, {
    method: "POST",
    headers: LEET_CODE_HEADERS,
    body: JSON.stringify({
      query: SUBMISSIONS_QUERY,
      variables: {
        username,
        limit: 20,
      },
    }),
  });

  const data = await response.json();

  return data;
};

const fetchProblemDetails = async (titleSlug: string) => {
  const response = await fetch(LEET_CODE_GRAPH_URL, {
    method: "POST",
    headers: LEET_CODE_HEADERS,
    body: JSON.stringify({
      query: PROBLEM_DETAILS_QUERY,
      variables: {
        titleSlug,
      },
    }),
  });

  const data = await response.json();

  return data;
};

export const fetchSubmissionsAndSyncWithDB = async (user: User) => {
  const data = await fetchSubmissions(user.username);

  const submissions: SubmissionResponse[] = data.data.recentAcSubmissionList;
  const filteredSubmissions = submissions.filter(
    (submission) => new Date(submission.timestamp * 1000) > SYNC_START_DATE,
  );

  filteredSubmissions.map(async (submission) => {
    const data = await fetchProblemDetails(submission.titleSlug);
    const difficulty = data.data.question.difficulty;

    await prisma.problem.upsert({
      where: {
        uniqueUserProblem: {
          title: submission.title,
          userId: user.id,
        },
      },
      create: {
        title: submission.title,
        url: `https://leetcode.com/problems/${submission.titleSlug}`,
        difficulty,
        userId: user.id,
        submittedAt: new Date(submission.timestamp * 1000),
      },
      update: {
        title: submission.title,
        url: `https://leetcode.com/problems/${submission.titleSlug}`,
        difficulty,
        userId: user.id,
        submittedAt: new Date(submission.timestamp * 1000),
      },
    });
  });
};
