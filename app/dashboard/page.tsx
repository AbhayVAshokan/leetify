import { columns, Problem } from "./constants";
import Table from "./table";

async function getData(): Promise<Problem[]> {
  return [
    {
      id: "728ed52f",
      favorite: true,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Sum"],
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Table columns={columns} data={data} />
    </div>
  );
}
