import axios from "axios";
import { redirect } from "next/navigation";
import { User } from "./[userId]/constants";

async function getFirstUser(): Promise<User[]> {
  const response = await axios.get("/api/users");

  return response.data[0].id;
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const defaultUserId = await getFirstUser();
  redirect(`/${defaultUserId}`);
}
