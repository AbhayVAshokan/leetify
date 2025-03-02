import prisma from "@/lib/prisma";
import zlib from "zlib";
import fs from "fs";

export async function POST() {
  try {
    const [users, problems, topics] = await Promise.all([
      prisma.user.findMany(),
      prisma.problem.findMany(),
      prisma.topic.findMany(),
    ]);

    if (!fs.existsSync("backup")) {
      fs.mkdirSync("backup");
    }

    const data = JSON.stringify({ users, problems, topics });
    fs.writeFileSync("backup/data.json.gz", zlib.gzipSync(data));

    return Response.json({
      message: `Backup completed at ${new Date().toLocaleString("en-UK")}`,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
