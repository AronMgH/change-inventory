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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetHeader,
  SheetDescription,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventorySchema } from "@/prisma/zod";
import { useForm, useFormState } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserWithId } from "@/components/user_type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { columns } from "./columns";

/**
 * Renders a data table component.
 *
 * @param {DataTableProps<TData, TValue>} {
 *   columns,
 *   data,
 *   updateInventory
 * } - The props for the DataTable component.
 * @return {JSX.Element} The rendered DataTable component.
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updateInventory: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  updateInventory
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );


  const enhancedColumns: ColumnDef<TData, TValue>[] = columns.map(column => {
    if ( column.id == 'actions'){
      return {
      ...column,
        cell: ({row}:{row:any}) => {
          const id = row.getValue('id')

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
                <DropdownMenuItem onClick={() =>{setOpenModal(true); populateForm(row)}}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteItem(id as number) }>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      }
    }
    return column
  })

  const [rowSelection, setRowSelection] = React.useState({});
  const [openModal, setOpenModal ] = useState(false);
  const [formActionType, setFormActionType] = useState('add')
  const { data: session, status } = useSession();

  const table = useReactTable({
    data,
    columns:enhancedColumns,
    
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

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues:{
      userId:(session?.user as UserWithId).id,
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Submits values to the server and updates the inventory.
   *
   * @param {z.infer<typeof inventorySchema>} values - The values to be submitted.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  async function onSubmit(values: z.infer<typeof inventorySchema>) {
    // console.log("It i working.");
    // console.log(values);
    if(formActionType == 'add') {

      await fetch(`/api/${(session?.user as UserWithId).id}/inventory`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(res => {
      setIsSubmitted(true);
      updateInventory();
      console.log('SUCCESS:Form submitted successfully');
      setOpenModal(false)
    }).catch(err => {
      console.log('ERROR:Form submission failed.');
    }
    )} else {
      await fetch(`/api/${(session?.user as UserWithId).id}/inventory?id=${values.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => {
        setIsSubmitted(true);
        updateInventory();
        console.log('SUCCESS:Form submitted successfully');
        setOpenModal(false)
      }).catch(err => {
        console.log('ERROR:Form submission failed.');
      }
      )
    }
  
  }

  // async function 

  async function deleteItem(id: number) {
    await fetch(`/api/${(session?.user as UserWithId).id}/inventory?id=${id}`, {
      method: 'DELETE',
    }).then(() => {
      console.log('Success:Item deleted successfully')
      updateInventory();
    }).catch((err) => {
      console.log('Error: Failed deleting an item. from inventory,', err)
    })
  }

  // type fieldType = "id" | "name" | "functionalItems" | "disfunctionalItmes" | 'remark' | 'picture' | 'quantity'

  function populateForm(row: any) {
    setFormActionType('edit');

    form.setValue('name', row.getValue('name') ?? undefined)
    form.setValue('functionalItems', row.getValue('functionalItems') ?? undefined)
    form.setValue('disfunctionalItems', row.getValue('disfunctionalItems') ?? undefined)
    form.setValue('remark', row.getValue('remark') ?? undefined )
    form.setValue('picture', row.getValue('picture') ?? undefined)
    form.setValue('quantity', row.getValue('quantity') ?? undefined)
    form.setValue('id', row.getValue('id') ?? undefined)
  }


  useEffect(() => {
   if(!openModal){
    form.reset()
    setFormActionType('add')
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h4 className="font-bolder ml-2 text-xxl ">Showing 10 items</h4>
        <Input
          placeholder="Filter items"
          className="max-w-md"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
        />
        <Sheet open={openModal} onOpenChange={(val) => setOpenModal(val)}>
          <SheetTrigger>
            <Button onClick={()=>setOpenModal(true)}>
              Add Item
              </Button>
          </SheetTrigger>
          <SheetContent id="sheet-back">
            <SheetHeader className="font-bold">{formActionType === 'add' ? 'Add Item' : 'Update Item' } </SheetHeader>
            <SheetDescription>
              Use the following form to { formActionType === "add" ? "add an item to your inventory" : "edit an item." }
            </SheetDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem
                      className="hidden"
                    >
                      <FormControl>
                        <Input {...field} disabled type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />                
                <FormField
                  control={form.control}
                  name="functionalItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Items</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disfunctionalItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disfunctional Items</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remark</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                <Button type="submit" className="mt-3">
                {formActionType === 'add' ? 'Add Item' : 'Update Item' }
                </Button>
                </div>
                {isSubmitted ?? (
                  <div className="text-green-600 text-sm my-2">
                    Form Submitted Succesfully.
                  </div>
                )}
              </form>
            </Form>
          </SheetContent>
        </Sheet>
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
