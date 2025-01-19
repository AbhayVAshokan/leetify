import axios from "axios";

import { columns, User } from "./constants";
import Table from "./table";

async function getUsers(): Promise<User[]> {
  const response = await axios.get("http://localhost:3000/api/users");

  return response.data;
}

const Dashboard = async () => {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-4">
      <Table columns={columns} users={users} />
    </div>
  );
};

export default Dashboard;
