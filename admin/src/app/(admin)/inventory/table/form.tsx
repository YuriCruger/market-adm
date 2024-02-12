import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/dbTypes";
import { addProduct } from "@/utils/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function Form() {
  const { toast } = useToast();
  const productSchema = z.object({
    id: z.coerce.number(),
    name: z.string().min(1),
    category: z.string().min(1),
    price: z.coerce.number().min(1),
    quantityInStock: z.coerce.number().min(1),
    createdAt: z.coerce.date(),
  });

  type ProductSchemaProps = z.infer<typeof productSchema>;

  const { register, handleSubmit, reset } = useForm<ProductSchemaProps>({
    resolver: zodResolver(productSchema),
  });

  function onSubmit(data: Product) {
    addProduct(data);
    toast({
      title: "The product has been successfully added!",
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="id" className="text-right">
          Número de série
        </Label>
        <Input id="id" className="col-span-3" autoFocus {...register("id")} />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" className="col-span-3" {...register("name")} />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Input id="category" className="col-span-3" {...register("category")} />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input id="price" className="col-span-3" {...register("price")} />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock_quantity" className="text-right">
          Stock quantity
        </Label>
        <Input
          id="stock_quantity"
          className="col-span-3"
          {...register("quantityInStock")}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="added_on" className="text-right">
          Added on
        </Label>
        <Input
          id="added_on"
          className="col-span-3 text-white"
          type="date"
          {...register("createdAt", { valueAsDate: true })}
        />
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
