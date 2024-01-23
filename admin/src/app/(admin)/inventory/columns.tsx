"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/dbTypes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Stock_quantity",
    accessorKey: "quantityInStock",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent hover:text-white"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Added_on
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formatted = new Date(createdAt as string).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
];
