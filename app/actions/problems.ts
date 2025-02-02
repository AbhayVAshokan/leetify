"use server";

import prisma from "@/lib/prisma";
import { Problem } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { fetchSubmissionsAndSyncWithDB } from "./utils";

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
    include: { problems: true },
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
