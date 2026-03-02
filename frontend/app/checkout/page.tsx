"use client";

import { useRouter } from "next/navigation";
import { CreditCard, Truck, Loader2 } from "lucide-react";
import CouponInput from "@/components/ui/CouponInput";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/ui/CartItem";
import { useCreateOrder } from "@/hooks/useOrder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutValues } from "@/schemas/checkout.schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ICartItem } from "@/types/cart.types";


export default function Checkout() {
    const router = useRouter();
    const { data: cartData, isLoading } = useCart();
    const { mutate: createOrder, isPending: isPlacing } = useCreateOrder();
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema)
    });


    const onSubmit = (values: CheckoutValues) => {
        const cartId = cartData?.data?._id;
        if (!cartId) return;

        createOrder({
            cartId,
            shippingAddress: {
                ...values,
                postalCode: parseInt(values.postalCode)
            }
        }, {
            onSuccess: (data) => {
                const orderId = data?.data?._id || data?.session?.orderId;
                if (orderId) {
                    router.push(`/orders/${orderId}`);
                }
            }
        });
    }

    const cartItems = cartData?.data?.cartItems || [];
    const totalCartPrice = cartData?.data?.totalCartPrice || 0;
    const totalPriceAfterDiscount = cartData?.data?.totalPriceAfterDiscount;


    const subtotal: number = totalPriceAfterDiscount ?? totalCartPrice ?? 0;


    if (isLoading) {
        return (
            <div className="flex h-[100vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center sm:text-left">Checkout</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

                <div className="lg:col-span-7 space-y-10">

                    <div>
                        <h2 className="text-xl font-medium text-foreground mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Label className="block text-sm font-medium text-foreground">Details (Address)</Label>
                                <Input
                                    {...register("details")}
                                    type="text"
                                    className={cn(
                                        "mt-1 block w-full rounded-md bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border transition-colors",
                                        errors.details ? "border-destructive" : "border-input"
                                    )}
                                    placeholder="Street address, apartment, suite, etc."
                                />
                                {errors.details && <p className="mt-1 text-xs text-destructive">{errors.details.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-foreground">Phone</Label>
                                <Input
                                    {...register("phone")}
                                    type="tel"
                                    className={cn(
                                        "mt-1 block w-full rounded-md bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border transition-colors",
                                        errors.phone ? "border-destructive" : "border-input"
                                    )}
                                    placeholder="01012345678"
                                />
                                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-foreground">City</Label>
                                <Input
                                    {...register("city")}
                                    type="text"
                                    className={cn(
                                        "mt-1 block w-full rounded-md bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border transition-colors",
                                        errors.city ? "border-destructive" : "border-input"
                                    )}
                                    placeholder="Cairo"
                                />
                                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-foreground">Postal Code</Label>
                                <Input
                                    {...register("postalCode")}
                                    type="text"
                                    className={cn(
                                        "mt-1 block w-full rounded-md bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border transition-colors",
                                        errors.postalCode ? "border-destructive" : "border-input"
                                    )}
                                    placeholder="12345"
                                />
                                {errors.postalCode && <p className="mt-1 text-xs text-destructive">{errors.postalCode.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-medium text-foreground mb-4">Payment Details</h2>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div
                                    onClick={() => setPaymentMethod('card')}
                                    className={cn(
                                        "flex items-center gap-2 border p-4 rounded-lg flex-1 cursor-pointer transition-all",
                                        paymentMethod === 'card'
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                            : 'border-border hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                    )}
                                >
                                    <div className={cn(
                                        "rounded-full p-1 transition-colors",
                                        paymentMethod === 'card' ? 'bg-primary text-white' : 'text-muted-foreground'
                                    )}>
                                        <CreditCard className="size-4" />
                                    </div>
                                    <span className={cn(
                                        "font-medium transition-colors",
                                        paymentMethod === 'card' ? 'text-foreground' : 'text-muted-foreground'
                                    )}>Credit Card</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('cash')}
                                    className={cn(
                                        "flex items-center gap-2 border p-4 rounded-lg flex-1 cursor-pointer transition-all",
                                        paymentMethod === 'cash'
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                            : 'border-border hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                    )}
                                >
                                    <div className={cn(
                                        "rounded-full p-1 transition-colors",
                                        paymentMethod === 'cash' ? 'bg-primary text-white' : 'text-muted-foreground'
                                    )}>
                                        <Truck className="size-4" />
                                    </div>
                                    <span className={cn(
                                        "font-medium transition-colors",
                                        paymentMethod === 'cash' ? 'text-foreground' : 'text-muted-foreground'
                                    )}>Cash on Delivery</span>
                                </div>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="sm:col-span-2">
                                        <Label className="block text-sm font-medium text-foreground">Card Number</Label>
                                        <Input type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Label className="block text-sm font-medium text-foreground">Expiration Date</Label>
                                        <Input type="text" placeholder="MM / YY" className="mt-1 block w-full rounded-md border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border" />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <Label className="block text-sm font-medium text-foreground">CVV</Label>
                                        <Input type="text" placeholder="123" className="mt-1 block w-full rounded-md border-input bg-background py-2 px-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 mt-16 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-border px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 sticky top-24">
                    <h2 className="text-lg font-medium text-foreground mb-6">Order Summary</h2>

                    <div className="flow-root">
                        <ul className="-my-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                            {cartItems.map((item: ICartItem) => (
                                <CartItem key={item._id} item={item} readOnly />
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-zinc-200 dark:border-zinc-800 mt-6 pt-6 space-y-4">
                        <CouponInput />
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-foreground">Subtotal</div>
                            <div className="text-sm font-medium text-foreground">
                                ${subtotal.toFixed(2)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-foreground">Shipping</div>
                            <div className="text-sm font-medium text-foreground">
                                0
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                            <div className="text-base font-bold text-foreground">Order Total</div>
                            <div className="text-base font-bold text-primary">${subtotal.toFixed(2)}</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-primary text-primary-foreground h-12 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center disabled:opacity-50"
                        disabled={isPlacing || cartItems.length === 0}
                    >
                        {isPlacing ? <Loader2 className="animate-spin" /> : "Place Order"}
                    </button>
                </div>
            </form>
        </div>
    );
}

