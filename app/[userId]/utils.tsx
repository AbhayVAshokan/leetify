"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Star, Link } from "lucide-react";
import { toggleFavorite } from "../actions";
import { Problem } from "./constants";

export const buildColumns = (userId: string): ColumnDef<Problem>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "isFavorite",
    header: () => <></>,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          toggleFavorite({ userId, problemId: row.getValue("id") });
        }}
      >
        {row.getValue("isFavorite") ? (
          <Star className="fill-foreground" />
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
