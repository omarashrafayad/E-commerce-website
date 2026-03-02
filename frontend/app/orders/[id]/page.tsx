"use client";
import React, { use } from 'react';
import { Package, Truck, CreditCard, Calendar, CheckCircle, MapPin, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useOrderById } from '@/hooks/useOrder';
import CartItem from "@/components/ui/CartItem";
import { ICartItem } from '@/types/cart.types';

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        Shipped: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || styles.Processing}`}>
            {status || 'Processing'}
        </span>
    );
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: orderData, isLoading } = useOrderById(id);
    const order = orderData?.data;

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <p>Order not found</p>
                <Link href="/shop" className="text-primary hover:underline">Go to Shop</Link>
            </div>
        );
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/shop" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        Shop
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Order {order._id}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="flex-1 space-y-6">

                        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-800">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        Order Details
                                    </h1>
                                    <p className="text-sm text-muted-foreground mt-1">ID: {order._id}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(order.createdAt)}
                                        </span>
                                        <span className="hidden sm:inline text-gray-300">|</span>
                                        <span className="flex items-center gap-1.5">
                                            <ShoppingBag className="w-4 h-4" />
                                            {order.cartItems?.length || 0} Items
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <StatusBadge status={order.isDelivered ? 'Delivered' : 'Processing'} />
                                    {order.isPaid ? <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Paid</span> : <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Unpaid</span>}
                                </div>
                            </div>
                        </div>


                        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-zinc-800">
                            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items</h2>
                            </div>
                            <ul className="divide-y divide-gray-100 dark:divide-zinc-800 px-6">
                                {order.cartItems?.map((item: ICartItem) => (
                                    <CartItem key={item._id} item={item} readOnly />
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
                                </div>
                                <address className="not-italic text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {typeof order.user !== 'string' ? order.user?.name : 'User'}
                                    </p>
                                    <p>{order.shippingAddress?.details}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                </address>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Payment Method</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-6 bg-gray-200 dark:bg-zinc-700 rounded-sm flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{order.paymentMethodType}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {order.paymentMethodType === 'cash' ? 'Cash on Delivery' : 'Online Payment'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="lg:w-96 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-zinc-800  top-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-base text-gray-600 dark:text-gray-300">
                                    <span>Subtotal</span>
                                    <span>${(order.totalOrderPrice).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base text-gray-600 dark:text-gray-300">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-zinc-700 my-4" />
                                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>${order.totalOrderPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
