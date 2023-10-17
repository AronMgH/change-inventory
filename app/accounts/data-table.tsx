"use client";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
 Select,
 SelectTrigger,
 SelectContent,
 SelectValue,
 SelectItem
} from '@/components/ui/select'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });



  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h4 className="font-bolder ml-2 text-xxl ">Showing 10 items</h4>
        <Input
          placeholder="Filter items"
          className="max-w-md"
          value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("fullname")?.setFilterValue(event.target.value);
          }}
        />
        <Select
        value = {(table.getColumn("activityType")?.getFilterValue() as string) ?? ""}
         onValueChange={ (value) => {
          if (value == "CLEAR"){
            table.getColumn('role')?.setFilterValue(null)
          } else {
            table.getColumn('role')?.setFilterValue(value)
          }
        }}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Activity Type"></SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="STAFF">STAFF</SelectItem>

            <SelectItem value="CLEAR">Clear Selection</SelectItem>
          </SelectContent>
        </Select>

      </div>

      <div className="rounded-md border p-4">
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
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Reults
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
