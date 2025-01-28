import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      problems: true,
    },
  });

  return Response.json(user?.problems || []);
}
