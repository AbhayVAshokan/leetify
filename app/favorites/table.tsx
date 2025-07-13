"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@prisma/client";
import { FavoriteProblem } from "@/types/problem";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/table/pagination";
import ColumnToggle from "@/components/ui/table/column-toggle";
import { getColumns } from "./utils";
import { useMemo, useState } from "react";
import UserSelect from "./user-select";
import { useTranslations } from "next-intl";

interface DataTableProps {
  problems: FavoriteProblem[];
  users: User[];
}

const DataTable = ({ problems, users }: DataTableProps) => {
  const t = useTranslations("UserPage");
  const columns = getColumns(t);
  const [selectedUsers, setSelectedUsers] = useState(users);

  const filteredProblems = useMemo(
    () =>
      problems
        .map((problem) => ({
          ...problem,
          users: problem.users.filter(({ username }) =>
            selectedUsers.some((user) => user.username === username),
          ),
        }))
        .filter(({ users }) => users.length > 0),
    [selectedUsers, problems],
  );

  const table = useReactTable({
    data: filteredProblems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
      sorting: [{ id: "users", desc: true }],
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap-reverse items-center justify-end gap-2 md:flex-nowrap">
        <div className="flex gap-2">
          <UserSelect
            users={users}
            selectedUsers={selectedUsers}
            onChange={setSelectedUsers}
          />
          <ColumnToggle table={table} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
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
                    <p>{t("noProblems")}</p>
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
