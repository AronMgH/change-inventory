"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox} from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { ArrowUpDown, MoreHorizontal} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu"
  
export type Item = {
    id: String,
    name: String,
    quantity: number,
    functionalNo: number,
    disfunctionalNo: number,
    picture: string,
    remark: string
}


export const columns: ColumnDef<Item>[] = [
    {
        id: 'select',
        header: ({table}) => (
                <Checkbox 
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                className='mr-2'
                />
        ),
        cell: (({row}) => (
            <Checkbox 
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                className='mr-2'
                />
        )),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({column}) => <Button className="text-left" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() ==='asc')}>ID <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown></Button>,
        cell: ({row}) => {
            const val = row.getValue('id')
            return (
                <div className="text-left ml-2">{ val as string}</div>
            )
        }
    },
    {
        accessorKey: 'name',
        header: ({column}) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() ==='asc')}>Name <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown></Button>
    },
    {
        accessorKey: 'quantity',
        header: ({column}) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() ==='asc')}>Quantity <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown></Button>,
        cell: ({row}) => {
            const val = row.getValue('quantity')
            return (
                <div className="text-center">{ val as string}</div>
            )
        }
    },
    {
        accessorKey: 'functionalItems',
        header: ({column}) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() ==='asc')}>Functional <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown></Button>,
        cell: ({row}) => {
            const val = row.getValue('functionalItems')
            return (
                <div className="text-center">{ val as string}</div>
            )
        }
    },
    {
        accessorKey: 'disfunctionalItems',
        header: ({column}) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() ==='asc')}>Disfunctional <ArrowUpDown className="ml-2  h-3 w-3"></ArrowUpDown></Button>,
        cell: ({row}) => {
            const val = row.getValue('disfunctionalItems')
            return (
                <div className="text-center">{ val as string}</div>
            )
        }
    },
    {
        accessorKey: 'picture',
        header: () => <div className="text-center">Picture</div>,
        cell: ({row}) => {
            const val = row.getValue('picture')
            return (
                <div className="text-center">
                {
                    val != null 
                    ?  <Link className={buttonVariants({variant:'link',size:'sm'})} href={val as string ?? ""}>View</Link> 
                    : ""
                }
                    
                </div>
            )
        }
    },
    {
        accessorKey: 'remark',
        header: 'Remark'
    },
    {
        id: 'actions',
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4"></MoreHorizontal>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]