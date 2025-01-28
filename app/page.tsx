import { redirect } from "next/navigation";
import { User } from "./[userId]/constants";

const fetchFirstUser = async (): Promise<User> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    next: { revalidate: 86400 },
  });
  const users = await response.json();
  return users[0].id;
};

const HomePage = async () => {
  const defaultUserId = await fetchFirstUser();
  redirect(`/ ${defaultUserId} `);
};

export default HomePage;
