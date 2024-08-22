"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { downloadToExcel } from "@/lib/xlsx";
import { Form } from "./form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { toast } from "@/components/ui/use-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { removeRowSelection } from "@/redux/slices/rowSlice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const rowSelected = useAppSelector((state) => state.row.value);
  const dispatch = useAppDispatch();
  const deleteProduct = async () => {
    if (Object.keys(rowSelection).length === 0) {
      toast({
        title: "Please select the product you want to delete.",
      });
      return;
    }

    try {
      rowSelected.forEach((row) => {
        const docRef = doc(firestore, `products/${row}`);

        deleteDoc(docRef);
      });

      toast({
        title: "Product deleted successfully",
      });
      dispatch(removeRowSelection());
      setRowSelection({});
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting product",
        description:
          "An error occurred while deleting the product. Please try again later.",
      });
    }
  };

  return (
    <Dialog>
      <div className="grid grid-cols-2 gap-5 py-4 lg:flex lg:items-center">
        <Input
          placeholder="Filter by name"
          value={(table.getColumn("name")?.getFilterValue() as string) || ""}
          onChange={(e) => {
            table.getColumn("name")?.setFilterValue(e.target.value);
          }}
          className="lg:max-w-xs"
        />

        <DialogTrigger asChild>
          <Button>Add new product</Button>
        </DialogTrigger>

        <DialogContent className="bg-softBlack">
          <DialogHeader>
            <DialogTitle className="text-white">Add new product</DialogTitle>
            <DialogDescription className="text-xs text-slate-200">
              Provide the details of your new product.
            </DialogDescription>
            <Form />
          </DialogHeader>
        </DialogContent>

        <Button onClick={deleteProduct}>Delete</Button>

        <Button className="lg:ml-auto" onClick={() => downloadToExcel(data)}>
          Export to Excel
        </Button>
      </div>
      {/*table*/}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/*pagination*/}
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
    </Dialog>
  );
}
