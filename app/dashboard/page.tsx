import { columns, Problem } from "./constants";
import Table from "./table";

async function getData(): Promise<Problem[]> {
  return Array.from(Array(50)).map(() => ({
    id: "728ed52f",
    favorite: true,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Easy",
    topics: [
      "Array",
      "Hash Table",
      "String",
      "Sliding Window",
      "Dynamic Programming",
    ],
    date: "15 Aug, 2021",
  }));
}

const Dashboard = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-4">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;
