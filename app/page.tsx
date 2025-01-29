import { redirect } from "next/navigation";
import { fetchUsers } from "./actions";

const HomePage = async () => {
  const users = await fetchUsers();
  redirect(`/${users[0].id}`);
};

export default HomePage;
