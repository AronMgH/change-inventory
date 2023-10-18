"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export type Activity = {
  activityMessage: string;
  activityType: string;
  createdAt: string;
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="max-w-[200px]">
        {" "}
        <Button
          className="text-left"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date<ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const val = row.getValue("createdAt");
      const date = new Date(val as string);
      const day = date.getDay();
      const month = date.getMonth();
      const year = date.getFullYear();

      const date_str =
        (day > 10 ? day : "0" + day) +
        "-" +
        (month > 10 ? month : "0" + month) +
        "-" +
        year;
      return <div className="text-left ml-4 max-w-200[px]">{date_str}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="max-w-[100px]">
        <Button
          className="text-left"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const val = row.getValue("createdAt");
      const date = new Date(val as string);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const time =
        (hours > 12 ? hours - 12 : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes);
      return <div className="text-left ml-2 max-w-[100px]">{time}</div>;
    },
  },
  {
    accessorKey: "activityMessage",
    header: ({ column }) => (
      <div className="text-left">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({row}) => {
        const val = row.getValue('activityMessage') as string
        return (
            <div className="text-left">{val}</div>
        )
    }
  },
  {
    accessorKey: "activityType",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const val = row.getValue("activityType") as string;
      return (
        <div className="text-right">
          <Button variant="ghost" size="sm" disabled>
            {val}
          </Button>
        </div>
      );
    },
  },
];
