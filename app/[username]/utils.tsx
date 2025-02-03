"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Link from "next/link";
import { Problem } from "@prisma/client";
import { DIFFICULTY_ORDER } from "./constants";

export const buildColumns = (
  onToggleFavorite: (props: { problemId: string; isFavorite: boolean }) => void,
): ColumnDef<Problem>[] => [
  {
    accessorKey: "isFavorite",
    header: ({ column }) => <ColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          onToggleFavorite({
            problemId: row.original.id,
            isFavorite: !row.original.isFavorite,
          })
        }
      >
        {row.original.isFavorite ? (
          <Star className="fill-amber-500 text-amber-500" />
        ) : (
          <Star />
        )}
      </Button>
    ),
    invertSorting: true,
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
    sortingFn: (rowA, rowB) => {
      // Sort difficulty as "easy" => "medium" => "hard".
      // @ts-expect-error: these type errors can be safely ignored since any
      // mismatch is handled in the return statement.
      const diffA = DIFFICULTY_ORDER[rowA.original.difficulty.toLowerCase()];
      // @ts-expect-error: same as above.
      const diffB = DIFFICULTY_ORDER[rowB.original.difficulty.toLowerCase()];
      return diffA - diffB || 0;
    },
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
    sortingFn: "datetime",
  },
];
