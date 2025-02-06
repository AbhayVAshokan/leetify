"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Problem, User } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/table/pagination";
import ColumnToggle from "@/components/ui/table/column-toggle";

import UserSelect from "./user-select";
import { buildColumns } from "./utils";
import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
import { syncWithLeetCode, toggleFavorite } from "../actions/problems";

interface DataTableProps<> {
  problems: Problem[];
  users: User[];
  username: string;
}

const DataTable = ({ problems, users, username }: DataTableProps) => {
  const [isFavoritePending, startFavoriteTransition] = useTransition();
  const [isSyncPending, startSyncTransition] = useTransition();

  const [optimisticProblems, updateOptimisticProblems] = useOptimistic(
    problems,
    (problems, { problemId, isFavorite }) => {
      const idx = problems.findIndex((problem) => problem.id === problemId);
      if (idx === -1) return problems;
      problems[idx].isFavorite = isFavorite;

      return problems;
    },
  );

  const handleToggleFavorite = ({
    problemId,
    isFavorite,
  }: {
    problemId: string;
    isFavorite: boolean;
  }) => {
    startFavoriteTransition(async () => {
      updateOptimisticProblems({
        problemId,
        isFavorite,
      });

      await toggleFavorite({
        username,
        problemId,
        isFavorite,
      });
    });
  };

  const handleSync = () => {
    startSyncTransition(async () => {
      await syncWithLeetCode();
    });
  };

  const columns = buildColumns(handleToggleFavorite);

  const table = useReactTable({
    data: optimisticProblems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap-reverse items-center justify-between gap-2 md:flex-nowrap">
        <Button
          onClick={handleSync}
          loading={isSyncPending}
          variant="secondary"
          size="sm"
        >
          Sync with LeetCode
        </Button>
        <div className="flex gap-2">
          <UserSelect users={users} />
          <ColumnToggle table={table} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table loading={isFavoritePending}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn({
                      "bg-amber-50 hover:bg-[#fcf6de] dark:bg-[#171200] dark:hover:bg-[#1c1600]":
                        row.original.isFavorite,
                    })}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 items-center justify-center space-y-2 text-center"
                  >
                    <p>There are no problems to show.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;
