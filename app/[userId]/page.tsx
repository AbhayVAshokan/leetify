import { fetchProblems, fetchUsers } from "../actions";
import Table from "./table";

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const [users, problems] = await Promise.all([
    fetchUsers(),
    fetchProblems({ userId }),
  ]);

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} users={users} userId={userId} />
    </div>
  );
};

export default Dashboard;
