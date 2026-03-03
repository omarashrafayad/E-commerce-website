
import { Package } from "lucide-react";
import { useOrders } from "@/features/main/orders/hooks/useOrder";
import Link from "next/link";
import { IOrder } from "@/features/main/orders/types/order.types";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/ui/EmptyState";

export default function OrdersSection() {
  const { data: ordersMutate, isPending } = useOrders();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Spinner />
        <p className="text-zinc-500 text-sm animate-pulse font-medium">Retrieving your orders...</p>
      </div>
    );
  }

  const orders = ordersMutate?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">Order History</h2>
          <p className="text-sm text-zinc-500">Track and manage your recent purchases.</p>
        </div>
        <Badge variant="outline" className="w-fit rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-bold">
          {orders.length} TOTAL ORDERS
        </Badge>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order: IOrder) => (
            <Card key={order._id} className="group overflow-hidden rounded-3xl border-zinc-100 dark:border-zinc-800 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-white dark:bg-zinc-900/50">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base md:text-lg text-zinc-900 dark:text-zinc-100 truncate max-w-[150px] sm:max-w-none">
                            #{order._id.slice(-8).toUpperCase()}
                          </h4>
                          <Badge className={cn(
                            "md:hidden rounded-md px-2 py-0 text-[10px] font-bold uppercase",
                            order.isDelivered ? "bg-emerald-500" : order.isPaid ? "bg-blue-500" : "bg-amber-500"
                          )}>
                            {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-zinc-500 font-medium">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0 border-zinc-50 dark:border-zinc-800">
                      <div className="md:text-right">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Grand Total</p>
                        <p className="font-black text-lg md:text-xl text-primary">${order.totalOrderPrice.toFixed(2)}</p>
                      </div>

                      <div className="hidden md:block">
                        <Badge
                          className={cn(
                            "rounded-lg px-3 py-1 text-xs font-bold uppercase",
                            order.isDelivered ? "bg-emerald-500 hover:bg-emerald-600" :
                              order.isPaid ? "bg-blue-500 hover:bg-blue-600" : "bg-amber-500 hover:bg-amber-600"
                          )}
                        >
                          {order.isDelivered ? "Delivered" : order.isPaid ? "Paid" : "Pending"}
                        </Badge>
                      </div>

                      <Link
                        href={`/orders/${order._id}`}
                        className="group/link flex items-center gap-2 px-4 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-bold text-zinc-600 dark:text-zinc-300 shadow-sm"
                      >
                        Details
                        <MoveRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="">
            <EmptyState title="No orders yet" description="Looks like you haven't ordered anything yet. Start shopping to see your history here." actionLabel="Explore Products" actionHref="/shop" />
          </div>
        )}
      </div>
    </div>
  );
}

