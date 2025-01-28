import { Problem, User } from "./constants";
import Table from "./table";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`);
  const users = await response.json();
  return users;
};

const fetchProblems = async (userId: string): Promise<Problem[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${userId}/problems`,
  );
  const problems = await response.json();
  return problems;
};

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const [users, problems] = await Promise.all([
    fetchUsers(),
    fetchProblems(userId),
  ]);

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} users={users} userId={userId} />
    </div>
  );
};

export default Dashboard;
