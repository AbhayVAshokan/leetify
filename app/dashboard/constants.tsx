"use client";

import ColumnHeader from "@/components/ui/table/column-header";
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
    header: ({ column }) => <ColumnHeader column={column} title="Favorite" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => <ColumnHeader column={column} title="Difficulty" />,
  },
  {
    accessorKey: "tags",
    header: ({ column }) => <ColumnHeader column={column} title="Tags" />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
  },
];
