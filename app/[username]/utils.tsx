"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Link from "next/link";
import { SCORE } from "@/lib/constants/score";
import { Badge } from "@/components/ui/badge";
import { ProblemWithTopics } from "@/types/problem";

export const buildColumns = (
  onToggleFavorite: (props: { problemId: string; isFavorite: boolean }) => void,
): ColumnDef<ProblemWithTopics>[] => [
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
    accessorKey: "topics",
    header: ({ column }) => <ColumnHeader column={column} title="Topics" />,
    cell: ({ row }) => {
      const topics = row.original.topics.sort((topic1, topic2) =>
        topic1.name.localeCompare(topic2.name),
      );

      return (
        <div className="flex min-w-52 max-w-full flex-wrap gap-1">
          {topics.map((topic) => (
            <Badge key={topic.id} variant="outline">
              {topic.name}
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => <ColumnHeader column={column} title="Difficulty" />,
    sortingFn: (rowA, rowB) => {
      // Sort difficulty as "easy" => "medium" => "hard".
      // @ts-expect-error: these type errors can be safely ignored since any
      // mismatch is handled in the return statement.
      const diffA = SCORE[rowA.original.difficulty.toLowerCase()];
      // @ts-expect-error: same as above.
      const diffB = SCORE[rowB.original.difficulty.toLowerCase()];
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
