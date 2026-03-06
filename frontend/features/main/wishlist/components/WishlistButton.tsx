"use client";

import { Heart } from "lucide-react";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "@/features/main/wishlist/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Product } from "@/features/main/shop/types/product.types";

interface WishlistButtonProps {
    productId: string;
    className?: string;
}

type WishlistItem = (Partial<Product> & { id?: string }) | string;

export default function WishlistButton({ productId, className }: WishlistButtonProps) {
    const token = useAuthStore((state) => state.token);

    const { data: wishlistData } = useWishlist();
    const { mutate: addToWishlist } = useAddToWishlist();
    const { mutate: removeFromWishlist } = useRemoveFromWishlist();

    const wishlistItems = wishlistData?.data || [];
    const isInWishlist = wishlistItems.some(
        (item: WishlistItem) => {
            if (typeof item === "string") return item === productId;
            return item._id === productId || item.id === productId;
        }
    );

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!token) {
            toast.error("Please login to manage your wishlist");
            return;
        }

        if (isInWishlist) {
            toast.success("Product removed from wishlist");
            removeFromWishlist(productId, {
                onError: (err: Error) => {
                    const axiosError = err as AxiosError<{ message?: string }>;
                    toast.error(axiosError.response?.data?.message || "Failed to remove product from wishlist");
                }
            });
        } else {
            toast.success("Product added to wishlist");
            addToWishlist(productId, {
                onError: (err: Error) => {
                    const axiosError = err as AxiosError<{ message?: string }>;
                    toast.error(axiosError.response?.data?.message || "Failed to add product to wishlist");
                }
            });
        }
    };

    return (
        <button
            onClick={handleWishlistClick}
            className={cn(
                "h-12 w-12 rounded-lg border border-border flex items-center justify-center text-foreground   transition-colors",
                className,
                isInWishlist && "text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30"
            )}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart className={cn("size-5", isInWishlist && "fill-current")} />
        </button>
    );
}

