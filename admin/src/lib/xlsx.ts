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
          label: "Price",
          value: "price",
        },
        {
          label: "Stock quantity",
          value: "quantityInStock",
        },
        {
          label: "Date",
          value: (row) => new Date(row.createdAt).toLocaleDateString(),
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
