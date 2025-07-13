import { buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SCORE } from "@/lib/constants/score";
import { ColumnDef } from "@tanstack/react-table";
import { FavoriteProblem } from "@/types/problem";
import { Badge } from "@/components/ui/badge";

import { buttonVariants } from "@/components/ui/button";
import ColumnHeader from "@/components/ui/table/column-header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SCORE } from "@/lib/constants/score";
import { ColumnDef } from "@tanstack/react-table";
import { FavoriteProblem } from "@/types/problem";
import { Badge } from "@/components/ui/badge";

export const getColumns = (t: (key: string) => string): ColumnDef<FavoriteProblem>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title={t("UserPage.columns.title")} />,
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
    header: ({ column }) => <ColumnHeader column={column} title={t("UserPage.columns.topics")} />,
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
    header: ({ column }) => <ColumnHeader column={column} title={t("UserPage.columns.difficulty")} />,
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
    accessorKey: "users",
    header: ({ column }) => <ColumnHeader column={column} title={t("FavoritesPage.columns.users")} />,
    sortingFn: (rowA, rowB) =>
      rowA.original.users.length - rowB.original.users.length,
    cell: ({ row }) => (
      <div className="flex gap-1">
        {row.original.users.map(({ name, avatar, username }) => (
          <Link key={username} href={`/${username.toLowerCase()}`}>
            <Avatar className="h-7 w-7">
              <AvatarImage src={avatar ?? ""} alt={name} />
              <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>
    ),
  },
];
