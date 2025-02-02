"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Link from "next/link";
import { Problem } from "@prisma/client";

import { toggleFavorite } from "../actions/problems";

export const buildColumns = (username: string): ColumnDef<Problem>[] => [
  {
    accessorKey: "isFavorite",
    header: () => <></>,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          toggleFavorite({
            username,
            problemId: row.original.id,
            isFavorite: !row.getValue("isFavorite"),
          });
        }}
      >
        {row.getValue("isFavorite") ? (
          <Star className="fill-amber-500 text-amber-500" />
        ) : (
          <Star />
        )}
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
        href={row.original.url}
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
];
