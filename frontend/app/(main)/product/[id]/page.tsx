"use client";

import { use, useState } from "react";
import { Star, Heart, Truck, RefreshCw, ShieldCheck, Minus, Plus } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import WishlistButton from "@/components/ui/WishlistButton";
import SkeletonGrid from "@/components/ui/SkeletonGrid";
import { useProductById } from "@/features/main/shop/hooks/useProducts";
import { useCart, useUpdateQuantity } from "@/features/main/cart/hooks/useCart";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ICartItem } from "@/features/main/cart/types/cart.types";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: productData, isLoading } = useProductById(id);
    const { data: cartData } = useCart();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const product = productData?.data;

    const [localQuantity, setLocalQuantity] = useState(1);

    const cartItem = cartData?.data?.cartItems?.find(
        (item: ICartItem) => {
            const productId = typeof item.product === "object" ? item.product._id : item.product;
            return productId === id;
        }
    );

    const currentQuantity = cartItem ? cartItem.quantity : localQuantity;

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return;

        if (newQuantity > currentQuantity) {
            toast.success("Quantity increased");
        } else {
            toast.success("Quantity decreased");
        }

        if (cartItem) {
            updateQuantity({ cartItemId: cartItem._id, quantity: newQuantity });
        } else {
            setLocalQuantity(newQuantity);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <Spinner />
                <p className="text-foreground">Loading product details...</p>
            </div>
        </div>
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* Product Images */}
                <div className="flex flex-col gap-4">
                    <div className="aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-border relative">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6 border-b border-border pb-6">
                        <h2 className="text-sm font-medium text-primary mb-2">{product.category?.name || "Category"}</h2>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="fill-current size-5" />
                                <span className="font-bold text-foreground ml-1">{product.ratingsAverage || 0}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">|</span>
                            <span className="text-muted-foreground text-sm">{product.ratingsQuantity || 0} Reviews</span>
                        </div>

                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-foreground">${product.price}</span>
                            {product.priceAfterDiscount && (
                                <span className="text-xl text-muted-foreground line-through mb-1">${product.priceAfterDiscount}</span>
                            )}
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-foreground">Quantity</span>
                            <div className="flex items-center border border-border rounded-md">
                                <button
                                    onClick={() => handleUpdateQuantity(currentQuantity - 1)}
                                    disabled={currentQuantity <= 1}
                                    className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors disabled:opacity-50"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="w-12 text-center text-sm font-semibold">{currentQuantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(currentQuantity + 1)}
                                    className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                            <span className="text-sm text-green-600 font-medium">
                                {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <AddToCartButton
                                productId={product._id}
                                className="flex-1 bg-primary text-primary-foreground h-12 rounded-lg font-semibold text-base flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            />
                            <WishlistButton productId={product._id} />
                        </div>
                    </div>

                    {/* Features / Services */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-10 border-t border-border">
                        <div className="flex flex-col items-center text-center gap-2 max-w-[160px] mx-auto">
                            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full text-foreground mb-1">
                                <Truck className="size-6" />
                            </div>
                            <h3 className="text-sm font-semibold">Free Shipping</h3>
                            <p className="text-xs text-muted-foreground">On all orders over $50</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 max-w-[160px] mx-auto">
                            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full text-foreground mb-1">
                                <RefreshCw className="size-6" />
                            </div>
                            <h3 className="text-sm font-semibold">Easy Returns</h3>
                            <p className="text-xs text-muted-foreground">30-day return policy</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 max-w-[160px] mx-auto">
                            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full text-foreground mb-1">
                                <ShieldCheck className="size-6" />
                            </div>
                            <h3 className="text-sm font-semibold">Secure Payment</h3>
                            <p className="text-xs text-muted-foreground">100% secure checkout</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
