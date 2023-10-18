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

export type Account = {
  username: string;
  fullname: string;
  role: string;
  position: string;
  email: string;
};

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <div className="max-w-[200px]">
        {" "}
        <Button
          className="text-left"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name<ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const fullname = row.getValue('fullname') as string;
      return <div className="text-left ml-4 max-w-200[px]">{fullname}</div>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <div className="max-w-[100px]">
        <Button
          className="text-left"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return <div className="text-left ml-2 max-w-[100px]">{username}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="text-left">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({row}) => {
        const email = row.getValue('email') as string
        return (
            <div className="text-left">{email}</div>
        )
    }
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const val = row.getValue("position") as string;
      return (
        <div className="text-right">
          <Button variant="ghost" size="sm" disabled>
            {val}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const val = row.getValue("role") as string;
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
