"use client";

import Link from "next/link";
import { Trash2, Heart, Loader2 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { useWishlist, useRemoveFromWishlist } from "@/features/main/shop/hooks/useWishlist";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Product } from "@/features/main/shop/types/product.types";
import { AxiosError } from "axios";

export default function Wishlist() {
    const { data: wishlistData, isLoading } = useWishlist();
    const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist();

    const wishlistItems = wishlistData?.data || [];

    const handleRemove = (productId: string) => {
        toast.success("Product removed from wishlist");
        removeFromWishlist(productId, {
            onError: (err: Error) => {
                const axiosError = err as AxiosError<{ message?: string }>;
                toast.error(axiosError.response?.data?.message || "Failed to remove product from wishlist");
            }
        });
    };


    if (isLoading) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">My Wishlist</h1>

            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item: Product) => (
                        <div key={item._id} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                            <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                <img
                                    src={item.imageCover}
                                    alt={item.title}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    disabled={isRemoving}
                                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 shadow-sm"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-foreground line-clamp-1">
                                        <Link href={`/product/${item._id}`} className="hover:text-primary transition-colors">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="font-bold text-lg text-foreground">${item.price}</p>
                                        <p className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                                            item.quantity > 0 ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                                        )}>
                                            {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                                        </p>
                                    </div>
                                </div>
                                <AddToCartButton productId={item._id} className="w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex w-full items-center justify-center h-[70vh]">
                    <EmptyState
                        icon={Heart}
                        title="Your wishlist is empty"
                        description="Save items you love to your wishlist. Review them anytime and easily move them to the bag."
                        actionLabel="Browse Products"
                        actionHref="/shop"
                    />
                </div>
            )}
        </div>
    );
}

