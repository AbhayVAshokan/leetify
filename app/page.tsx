import { redirect } from "next/navigation";
import { fetchUsers } from "./actions/users";

const HomePage = async () => {
  const users = await fetchUsers();
  redirect(`/${users[0].username}`);
};

export default HomePage;
