import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, TrendingDown, TrendingUp } from "lucide-react";

interface CardItemProps {
  description: string;
  title?: number | string;
  percentage?: number;
  stock?: number;
}

export function CardItem({
  description,
  title,
  percentage,
  stock,
}: CardItemProps) {
  return (
    <Card className="border-none bg-softBlack text-white shadow-violet-500">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {stock !== undefined && (
          <div className="flex items-center gap-1">
            <Package size={20} />
            <p className="text-xl font-bold">{stock}</p>
          </div>
        )}

        {percentage !== undefined && percentage >= 0 && (
          <div className="flex items-center gap-1 text-green-500">
            <p className="text-sm">{percentage.toFixed(2) + "%"}</p>
            <TrendingUp />
          </div>
        )}

        {percentage !== undefined && percentage < 0 && (
          <div className="flex items-center gap-1 text-red-500">
            <p className="text-sm">{percentage.toFixed(2) + "%"}</p>
            <TrendingDown />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
