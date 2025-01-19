"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export type Problem = {
  id: string;
  isFavorite: boolean;
  title: string;
  url: string;
  difficulty: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "isFavorite",
    header: () => <></>,
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        {row.getValue("isFavorite") ? <Star fill="bg-accent" /> : <Star />}
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <Link
        target="_blank"
        href={row.getValue("url")}
        className={cn("truncate", buttonVariants({ variant: "link" }))}
      >
        {row.getValue("title")}
      </Link>
    ),
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => <ColumnHeader column={column} title="Difficulty" />,
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <p className="w-24">
        {new Date(row.getValue("submittedAt")).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    accessorKey: "url",
    header: () => <></>,
    cell: () => <></>,
    enableHiding: false,
  },
];
