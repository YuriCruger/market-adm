import { Product } from "@/types/dbTypes";
import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadToExcel(data: any) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Products",
      columns: [
        {
          label: "Name",
          value: "name",
        },
        {
          label: "Category",
          value: "category",
        },
        {
          label: "Serial Number",
          value: "id",
        },
        {
          label: "Price",
          value: "price",
        },
        {
          label: "Stock quantity",
          value: "quantityInStock",
        },
        {
          label: "Added on",
          value: (row) =>
            new Date(row.createdAt as string).toLocaleDateString(),
        },
      ],
      content: data,
    },
  ];

  let settings = {
    fileName: "Project Excel",
  };
  xlsx(columns, settings);
}
