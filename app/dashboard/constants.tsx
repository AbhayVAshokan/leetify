"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export type Problem = {
  id: string;
  favorite: boolean;
  title: string;
  url: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  date: string;
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "favorite",
    header: () => <></>,
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        {row.getValue("favorite") ? <Star fill="bg-accent" /> : <Star />}
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
    accessorKey: "topics",
    header: ({ column }) => <ColumnHeader column={column} title="Topcs" />,
    cell: ({ row }) => (
      <div className="flex min-w-52 max-w-96 flex-wrap gap-1">
        <p className="block w-full md:hidden">
          {row.getValue("topics").join(", ")}
        </p>
        {row.getValue("topics").map((topic) => (
          <Badge key={topic} variant="outline" className="hidden md:block">
            {topic}
          </Badge>
        ))}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <p className="w-24">
        {new Date(row.getValue("date")).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "url",
    header: () => <></>,
    cell: () => <></>,
    enableHiding: false,
  },
];
