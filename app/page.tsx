import axios from "axios";
import { redirect } from "next/navigation";
import { User } from "./[userId]/constants";

async function getFirstUser(): Promise<User[]> {
  const response = await axios.get("http://localhost:3000/api/users");

  return response.data[0].id;
}

export default async function HomePage() {
  const defaultUserId = await getFirstUser();
  redirect(`/${defaultUserId}`);
}
