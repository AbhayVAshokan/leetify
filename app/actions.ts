"use server";

import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { Problem, User } from "./[userId]/constants";

export const fetchUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const fetchProblems = async ({
  userId,
}: {
  userId: string;
}): Promise<Problem[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { problems: true },
  });
  return user?.problems ?? [];
};

// TODO: Take `favorite` as argument and refactor it to execute a single SQL query.
export const toggleFavorite = async ({
  userId,
  problemId,
}: {
  userId: string;
  problemId: string;
}) => {
  try {
    const problem = await prisma.problem.findFirst({
      where: {
        id: problemId,
        userId,
      },
    });

    await prisma.problem.update({
      where: {
        id: problemId,
        userId,
      },
      data: {
        isFavorite: !problem?.isFavorite,
      },
    });
    revalidatePath(`/${userId}`);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Response.json("Problem not found for the user", { status: 404 });
    } else {
      return Response.json("Unexpected error", { status: 500 });
    }
  }
};
