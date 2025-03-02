import prisma from "@/lib/prisma";
import zlib from "zlib";

export async function POST() {
  try {
    const [users, problems, topics] = await Promise.all([
      prisma.user.findMany(),
      prisma.problem.findMany(),
      prisma.topic.findMany(),
    ]);

    const data = JSON.stringify({ users, problems, topics });
    return new Response(zlib.gzipSync(data), {
      headers: {
        "Content-Type": "text/json",
        "Content-Encoding": "gzip",
      },
    });
  } catch (error) {
    return Response.json({ error });
  }
}
