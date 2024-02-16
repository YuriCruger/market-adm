import { useAppSelector } from "@/app/redux/hooks";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface CategoryDataProps {
  category: string;
  quantityInStock: number;
}

export function Graphics() {
  const dataSelector = useAppSelector((state) => state.data.value);

  const categoriesWithQuantity = dataSelector.reduce(
    (accumulator, product) => {
      if (accumulator[product.category]) {
        accumulator[product.category].quantityInStock +=
          product.quantityInStock;
      } else {
        accumulator[product.category] = {
          category: product.category,
          quantityInStock: product.quantityInStock,
        };
      }
      return accumulator;
    },
    {} as Record<string, CategoryDataProps>,
  );

  const quantitiesByCategory = Object.values(categoriesWithQuantity);

  return (
    <div className="mt-10">
      <Card className="overflow-auto border-none bg-softBlack p-10 shadow-violet-500">
        <BarChart width={1000} height={500} data={quantitiesByCategory}>
          <Bar dataKey="quantityInStock" barSize={50} fill="#8b5cf6" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            content={({ label, payload }) => {
              if (payload && payload.length) {
                return (
                  <div className="custom-tooltip ">
                    <b>{label}</b>
                    <br />
                    Quantity: {payload[0].value}
                  </div>
                );
              }
              return null;
            }}
            label="Category"
            wrapperStyle={{
              background: "#ddd6fe",
              padding: 10,
              borderRadius: 5,
            }}
            cursor={<rect fill="#c4b5fd" stroke="#c4b5fd" opacity={0.5} />}
          />
          <Legend
            formatter={() => {
              return "Quantity in stock per category";
            }}
          />
        </BarChart>
      </Card>
    </div>
  );
}
