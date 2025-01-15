import { ColumnDef } from "@tanstack/react-table";

export type Problem = {
  id: string;
  favorite: boolean;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  date: string;
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "favorite",
    header: "Favorite",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
