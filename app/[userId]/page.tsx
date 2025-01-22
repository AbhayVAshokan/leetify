import axios from "axios";

import { Problem, User } from "./constants";
import Table from "./table";

async function getUsers(): Promise<User[]> {
  const response = await axios.get("/api/users");

  return response.data;
}

async function getProblems(userId: string): Promise<Problem[]> {
  const response = await axios.get(`/api/users/${userId}/problems`);

  return response.data;
}

const Dashboard = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const users = await getUsers();
  const problems = await getProblems(userId);

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} users={users} userId={userId} />
    </div>
  );
};

export default Dashboard;
