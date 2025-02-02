import { syncWithLeetCode } from "@/app/actions/problems";

export async function POST() {
  const { success, error } = await syncWithLeetCode();

  if (success) {
    return Response.json({ message: "Sync successful" });
  } else {
    return Response.json({ message: (error as Error).message });
  }
}
