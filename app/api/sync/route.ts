import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import axios from "axios";
import {
  LEET_CODE_HEADERS,
  LEET_CODE_GRAPH_URL,
  PROBLEM_DETAILS_QUERY,
  SubmissionResponse,
  SUBMISSIONS_QUERY,
  SYNC_START_DATE,
} from "./constants";

const fetchSubmissions = async (userName: string) => {
  const response = await axios.post(
    LEET_CODE_GRAPH_URL,
    {
      query: SUBMISSIONS_QUERY,
      variables: {
        username: userName,
        limit: 20,
      },
    },
    { headers: LEET_CODE_HEADERS },
  );

  return response.data;
};

const fetchProblemDetails = async (titleSlug: string) => {
  const response = await axios.post(
    LEET_CODE_GRAPH_URL,
    {
      query: PROBLEM_DETAILS_QUERY,
      variables: {
        titleSlug,
      },
    },
    { headers: LEET_CODE_HEADERS },
  );

  return response.data;
};

const fetchSubmissionsAndSyncWithDB = async (user: User) => {
  const data = await fetchSubmissions(user.leetCodeUserName);

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

export async function POST() {
  try {
    const users = await prisma.user.findMany();
    const syncPromises = users.map((user) =>
      fetchSubmissionsAndSyncWithDB(user),
    );
    await Promise.all(syncPromises);

    return Response.json({
      message:
        "Started sync. Please refresh the page after a while to see the latest data.",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: (error as Error).message });
  }
}
