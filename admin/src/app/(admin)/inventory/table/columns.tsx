"use client";

import { useAppDispatch } from "@/redux/hooks";
import { removeRowSelection, setRowSelection } from "@/redux/slices/rowSlice";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/utils/formated-currency";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentData } from "firebase/firestore";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<DocumentData>[] = [
  {
    id: "Select",
    // header: ({ table }) => {
    //   const dispatch = useAppDispatch();
    //   return (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => {
    //         table.toggleAllPageRowsSelected(!!value);
    //         if (value) {
    //           const rowIds = table.getAll();
    //           console.log(rowIds);
    //         } else {
    //           dispatch(removeRowSelection());
    //         }
    //       }}
    //     />
    //   );
    // },
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
              dispatch(setRowSelection(row.getValue("id")));
            } else {
              dispatch(removeRowSelection());
            }
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Serial number",
    accessorKey: "id",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "price",
    cell: ({ row }) => {
      const formattedPrice = formatCurrency(row.getValue("price"));
      return <div>{formattedPrice}</div>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "quantityInStock",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:text-white"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Added on
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formattedDate = new Date(createdAt as string).toLocaleDateString();
      return <div>{formattedDate}</div>;
    },
  },
];
