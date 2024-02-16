import { calculatePercentageDifference } from "@/utils/calculate-percentage";
import { formatCurrency } from "@/utils/formated-currency";
import { useEffect, useState } from "react";
import { CardItem } from "./cardItem";
import { useAppSelector } from "@/app/redux/hooks";
import { DocumentData } from "firebase/firestore";

export function Cards() {
  const dataSelector = useAppSelector((state) => state.data.value);
  const [totalStock, setTotalStock] = useState(0);
  const [lowestStockProduct, setLowestStockProduct] =
    useState<DocumentData | null>(null);
  const initialTotalStock = 330;
  const initialTotalRevenue = 47596.7;

  const totalRevenue = dataSelector.reduce((total, product) => {
    return total + product.price * product.quantityInStock;
  }, 0);

  const totalRevenueFormatted = formatCurrency(totalRevenue);

  const stockPercentageDifference = calculatePercentageDifference(
    initialTotalStock,
    totalStock,
  );
  const revenuePercentageDifference = calculatePercentageDifference(
    initialTotalRevenue,
    totalRevenue,
  );

  useEffect(() => {
    let accumulatedQuantity = 0;
    let minStockProduct = dataSelector[0];

    dataSelector.forEach((product) => {
      accumulatedQuantity += product.quantityInStock;

      if (
        minStockProduct &&
        product.quantityInStock < minStockProduct.quantityInStock
      ) {
        minStockProduct = product;
      }
    });

    setTotalStock(accumulatedQuantity);
    setLowestStockProduct(minStockProduct);
  }, [dataSelector]);

  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <CardItem
        description="Total products"
        title={totalStock}
        percentage={stockPercentageDifference}
      />

      <CardItem
        description="Total Revenue"
        title={totalRevenueFormatted}
        percentage={revenuePercentageDifference}
      />

      <CardItem
        title={lowestStockProduct?.name}
        stock={lowestStockProduct?.quantityInStock}
        description="Product with lowest stock"
      />
    </div>
  );
}
