"use client";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import CouponInput from "@/components/ui/CouponInput";
import EmptyState from "@/components/ui/EmptyState";
import { useCart, useClearCart } from "@/hooks/useCart";
import CartItem from "@/components/ui/CartItem";
import {  ICartItem } from "@/types/cart.types";

export default function Cart() {
    const { data: cartData, isLoading,error } = useCart();
    const { mutate: clearCart, isPending: isClearing } = useClearCart();
    const cartItems = cartData?.data?.cartItems || [];
    const totalCartPrice = cartData?.data?.totalCartPrice || 0;
    const totalPriceAfterDiscount = cartData?.data?.totalPriceAfterDiscount || 0;

    const handleClearCart = () => {
        clearCart();
    };
    if (isLoading) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    if (cartItems.length === 0) {
        return (
            <div className="flex w-full items-center justify-center h-[100vh]">
                <EmptyState
                    icon={ShoppingCart}
                    title="Your cart is empty"
                    description="Looks like you haven't added any items to your cart yet."
                    actionLabel="Continue Shopping"
                    actionHref="/shop"
                />
            </div>
        );
    }
    if(error){
        return (
            <div className="flex w-full items-center justify-center h-[100vh]">
                <EmptyState
                    icon={ShoppingCart}
                    title="Your cart is empty"
                    description="Looks like you haven't added any items to your cart yet."
                    actionLabel="Continue Shopping"
                    actionHref="/shop"
                />
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
                <button
                    onClick={handleClearCart}
                    disabled={isClearing}
                    className="text-sm text-destructive hover:underline flex items-center gap-1 disabled:opacity-50 w-fit"
                >
                    <Trash2 className="size-4" /> Clear Cart
                </button>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <div className="lg:col-span-7">
                    <ul className="divide-y divide-border border-t border-border">
                        {cartItems.map((item: ICartItem) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-5 mt-10 lg:mt-0">
                    <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-border p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                        <div className="mt-6">
                            <CouponInput />
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                                <span className="text-sm">Subtotal</span>
                                <span className="text-sm font-semibold text-foreground">
                                    ${totalPriceAfterDiscount ? totalPriceAfterDiscount : totalCartPrice}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                                <span className="text-sm">Shipping</span>
                                <span className="text-sm font-semibold text-green-600">Free</span>
                            </div>

                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <span className="text-base font-bold text-foreground">Order Total</span>
                                <span className="text-xl font-bold text-primary">
                                    ${totalPriceAfterDiscount ? totalPriceAfterDiscount : totalCartPrice}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/checkout"
                                className="group w-full flex items-center justify-center rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-primary/30 active:scale-[0.98]"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                            <ShoppingCart className="size-4" />
                            <span className="text-xs">Secure Checkout • Satisfaction Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
