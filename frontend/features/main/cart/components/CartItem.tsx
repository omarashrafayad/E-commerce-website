"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useProductById } from "@/features/main/shop/hooks/useProducts";
import { useDeleteCartItem, useUpdateQuantity } from "@/features/main/cart/hooks/useCart";
import { toast } from "sonner";
import { CartItemProps } from "@/features/main/cart/types/cart.types";
import { AxiosError } from "axios";
import SkeletonGrid from "@/components/shared/SkeletonGrid";
import { Button } from "@/components/ui/button";


export default function CartItem({ item, readOnly = false }: CartItemProps) {
  const productId = typeof item.product === "string" ? item.product : item.product._id;
  const { data: productData, isLoading: isProductLoading } = useProductById(productId);
  const { mutate: updateQuantity } = useUpdateQuantity();
  const { mutate: deleteItem } = useDeleteCartItem();

  const product = productData?.data;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;

    if (newQuantity > item.quantity) {
      toast.success("Quantity increased");
    } else {
      toast.success("Quantity decreased");
    }

    updateQuantity({ cartItemId: item._id, quantity: newQuantity });
  };

  const handleDeleteItem = () => {
    toast.success("Product removed from cart");
    deleteItem(item._id, {
      onError: (err: Error) => {
        const axiosError = err as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to remove product from wishlist");
      }
    });
  };

  if (isProductLoading) {
    return (
      <SkeletonGrid count={1} type="product" />
    );
  }
  if (readOnly) {
    return (
      <li className="flex items-center py-4">
        <div className="h-16 w-16 relative shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-foreground">
              <h3>{product.title}</h3>
              <p className="ml-4">${item.price}</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.category?.name}
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-muted-foreground">Qty {item.quantity}</p>
          </div>
        </div>
      </li>
    );
  }
  return (
    <li className="flex py-6 group relative">
      <div className="h-24 w-24 relative shrink-0 overflow-hidden rounded-lg border border-border bg-zinc-100 dark:bg-zinc-800 sm:h-32 sm:w-32">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          unoptimized
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-medium text-foreground line-clamp-1 pr-8 sm:pr-0">
              <Link
                href={`/product/${product._id}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>
            <Button
              variant="secondary"
              onClick={handleDeleteItem}
              className="absolute top-6 right-0 p-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.category?.name}
          </p>

          <p className="mt-2 text-lg font-bold text-foreground">
            ${item.price}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:block">
          <div className="flex items-center border border-border rounded-lg bg-background shadow-sm overflow-hidden w-fit">
            <Button
              variant="secondary"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
            <Button
              variant="secondary"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
          <div className="sm:hidden text-right">
            <p className="text-sm font-medium text-primary">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}