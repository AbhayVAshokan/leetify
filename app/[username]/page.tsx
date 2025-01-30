import { fetchProblems, fetchUsers } from "../actions";
import Table from "./table";

export const generateStaticParams = async () => {
  const users = await fetchUsers();
  return users.map(({ username }) => ({
    username: username.toLowerCase(),
  }));
};

const Dashboard = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const [users, problems] = await Promise.all([
    fetchUsers(),
    fetchProblems({ username }),
  ]);

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} users={users} username={username} />
    </div>
  );
};

export default Dashboard;
