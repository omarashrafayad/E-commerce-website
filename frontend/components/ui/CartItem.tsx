"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { useProductById } from "@/features/main/shop/hooks/useProducts";
import { useDeleteCartItem, useUpdateQuantity } from "@/features/main/cart/hooks/useCart";
import { toast } from "sonner";
import { CartItemProps } from "@/features/main/cart/types/cart.types";


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
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to remove product from cart");
      }
    });
  };

  if (isProductLoading) {
    return (
      <li className="flex py-6 sm:py-10 animate-pulse">
        <div className="h-24 w-24 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
        </div>
      </li>
    );
  }

  if (!product) {
    return (
      <li className="flex py-6 sm:py-10">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-md bg-zinc-100 flex items-center justify-center text-xs text-muted-foreground">
            Product Not Found
          </div>
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium text-destructive">
              Product Unavailable (ID: {typeof item.product === "string" ? item.product : item.product._id})
            </h3>
            {!readOnly && (
              <button
                type="button"
                onClick={handleDeleteItem}
                className="-m-2 inline-flex p-2 text-muted-foreground hover:text-destructive"
              >
                <span className="sr-only">Remove</span>
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </li>
    );
  }

  if (readOnly) {
    return (
      <li className="flex items-center py-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
          <img src={product.imageCover} alt={product.title} className="h-full w-full object-cover object-center" />
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
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-zinc-100 dark:bg-zinc-800 sm:h-32 sm:w-32">
        <img
          src={product.imageCover}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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

            <button
              type="button"
              onClick={handleDeleteItem}
              className="absolute top-6 right-0 p-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
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
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors disabled:opacity-50"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
            >
              <Plus className="size-3.5" />
            </button>
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


