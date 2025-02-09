"use server";

import prisma from "@/lib/prisma";
import { Problem } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { fetchSubmissionsAndSyncWithDB } from "./utils";
import { FavoriteProblem } from "@/types/problem";

export const fetchProblems = async ({
  username,
}: {
  username: string;
}): Promise<Problem[]> => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    include: { problems: { orderBy: { submittedAt: "desc" } } },
  });
  return user?.problems ?? [];
};

export const toggleFavorite = async ({
  username,
  problemId,
  isFavorite,
}: {
  username: string;
  problemId: string;
  isFavorite: boolean;
}) => {
  try {
    await prisma.problem.update({
      where: { id: problemId },
      data: {
        isFavorite,
      },
    });
    revalidatePath(`/${username}`);
    revalidatePath("/favorites");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Response.json("Problem not found for the user", { status: 404 });
    } else {
      return Response.json("Unexpected error", { status: 500 });
    }
  }
};

export const syncWithLeetCode = async () => {
  try {
    const users = await prisma.user.findMany();
    const syncPromises = users.map((user) =>
      fetchSubmissionsAndSyncWithDB(user),
    );
    await Promise.all(syncPromises);

    revalidatePath("/[username]", "page");
    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

export const fetchFavoriteProblems = async (): Promise<FavoriteProblem[]> => {
  const problems = await prisma.problem.findMany({
    where: { isFavorite: true },
    include: { user: true },
    orderBy: { submittedAt: "desc" },
  });

  const favoriteProblems = problems.reduce<FavoriteProblem[]>(
    (summary, problem) => {
      const favProblem = summary.find(({ url }) => url === problem.url);
      return favProblem
        ? [
            ...summary,
            { ...problem, users: [problem.user, ...favProblem.users] },
          ]
        : [...summary, { ...problem, users: [problem.user] }];
    },
    [],
  );

  return favoriteProblems;
};
