import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; problemId: string }> },
) {
  const { userId, problemId } = await params;
  const body = await request.json();
  const { isFavorite } = body;

  try {
    await prisma.problem.update({
      where: {
        id: problemId,
        userId,
      },
      data: {
        isFavorite,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Response.json("Problem not found for the user", { status: 404 });
    } else {
      return Response.json("Unexpected error", { status: 500 });
    }
  }

  return Response.json("Problem updated successfully");
}
