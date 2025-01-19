import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import axios from "axios";
import {
  LEET_CODE_HEADERS,
  LEET_CODE_GRAPH_URL,
  PROBLEM_DETAILS_QUERY,
  SubmissionResponse,
  SUBMISSIONS_QUERY,
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

  submissions.map(async (submission) => {
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
      },
      update: {},
    });
  });
};

export async function GET() {
  const users = await prisma.user.findMany();

  users.forEach((user) => fetchSubmissionsAndSyncWithDB(user));

  return Response.json({ message: "Started sync" });
}
