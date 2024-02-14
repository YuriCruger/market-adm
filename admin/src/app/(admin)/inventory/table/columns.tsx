"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/dbTypes";
import { formatCurrency } from "@/utils/functions/formated-currency";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "Select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
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
