import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CardInfoProps {
  description: string;
  title: number;
  percentage: number;
}

export function CardInfo({ description, title, percentage }: CardInfoProps) {
  return (
    <Card className="border-none bg-softBlack text-white shadow-violet-500">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>

        {percentage >= 0 && (
          <div className="flex items-center gap-1 text-green-500">
            <p className="text-sm">{percentage.toFixed(2) + "%"}</p>
            <TrendingUp />
          </div>
        )}

        {percentage < 0 && (
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
