"use client";

import { useAddToCart } from "@/features/main/cart/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { AxiosError } from "axios";


interface AddToCartButtonProps {
  productId: string | number;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function AddToCartButton({
  productId,
  className,
  variant = "default",
  size = "default"
}: AddToCartButtonProps) {
  const token = useAuthStore((state) => state.token);
  const { mutate } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to add to cart");
      return;
    }
    toast.success("Product added to cart");

    mutate(String(productId), {
      onError: (err: Error) => {
        const axiosError = err as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to remove product from wishlist");
      },
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="size-4" />
      Add to Cart
    </Button>
  );
}

