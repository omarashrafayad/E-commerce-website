"use client";

import { useState } from "react";
import {
    ShoppingBag,
    Search,
    Eye,
    Trash2,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
    Plus,
    Loader2,
    Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UniTable, { ActionCell, ActionButton } from "@/components/shared/UniTable";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from "@/hooks/useOrder";
import { toast } from "sonner";

const orderStatusSchema = z.object({
    status: z.string().min(1, "Status is required"),
});

type OrderStatusData = z.infer<typeof orderStatusSchema>;

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<any>(null);

    const { data: ordersResponse, isLoading: isOrdersLoading } = useOrders({
        page: currentPage,
        limit
    });
    const updateStatusMutation = useUpdateOrderStatus();
    const deleteOrderMutation = useDeleteOrder();

    const orders = ordersResponse?.data || [];

    const {
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting }
    } = useForm<OrderStatusData>();

    const handleEditStatus = (order: any) => {
        setCurrentOrder(order);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this order record permanently?")) {
            try {
                await deleteOrderMutation.mutateAsync(id);
                toast.success("Order deleted");
            } catch (error) {
                toast.error("Failed to delete order");
            }
        }
    };

    const onSubmit = async (data: OrderStatusData) => {
        if (!currentOrder) return;
        try {
            await updateStatusMutation.mutateAsync({ id: currentOrder._id, status: data.status });
            toast.success("Order status updated");
            setIsDialogOpen(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Status update failed");
        }
    };

    const COLUMNS = [
        { id: "_id", header: "Order ID", cell: (val: any, row: any) => <span className="font-mono font-bold text-primary">{row._id.slice(-8)}</span>, className: "w-24" },
        {
            id: "customer",
            header: "Customer",
            cell: (value: any, row: any) => (
                <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{row.user?.name || "Guest"}</span>
                    <span className="text-xs text-zinc-500 font-medium tracking-tight">{row.user?.email || "No Email"}</span>
                </div>
            )
        },
        { id: "total", header: "Total Price", cell: (val: any, row: any) => <span className="font-black text-zinc-900">${row.totalOrderPrice}</span> },
        {
            id: "status",
            header: "Status",
            cell: (value: any, row: any) => {
                const status = row.isDelivered ? "Delivered" : row.isPaid ? "Paid" : "Pending";
                const colors: Record<string, string> = {
                    "Delivered": "bg-emerald-100 text-emerald-700 border-emerald-200",
                    "Paid": "bg-blue-100 text-blue-700 border-blue-200",
                    "Pending": "bg-amber-100 text-amber-700 border-amber-200",
                };
                const StatusIcon = row.isDelivered ? CheckCircle2 : row.isPaid ? Truck : Clock;

                return (
                    <span className={cn(
                        "flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border",
                        colors[status]
                    )}>
                        <StatusIcon className="size-3" />
                        {status}
                    </span>
                );
            }
        },
        { id: "date", header: "Created At", cell: (val: any, row: any) => <span className="text-xs text-zinc-500">{new Date(row.createdAt).toLocaleDateString()}</span> },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Eye} onClick={() => console.log("View", row._id)} />
                    <ActionButton icon={Pencil} onClick={() => handleEditStatus(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => handleDelete(row._id)} />
                </ActionCell>
            ),
            headerClassName: "justify-center text-center",
            className: "justify-center text-center"
        }
    ];

    const filteredOrders = orders.filter((o: any) =>
        o._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <ShoppingBag className="size-4" />
                        <span>Sales Pipeline</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Orders Management</h2>
                    <p className="text-zinc-500">Track receipts, payments and logistical status.</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {isOrdersLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200">
                        <Loader2 className="size-10 text-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Syncing transactions...</p>
                    </div>
                ) : (
                    <UniTable
                        data={filteredOrders}
                        columns={COLUMNS}
                        enablePagination={true}
                        pageSize={limit}
                        serverPagination={{
                            currentPage,
                            totalPages: ordersResponse?.metadata?.numberOfPages || 1,
                            totalItems: ordersResponse?.results || 0,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                        itemLabel="orders"
                        className="rounded-3xl shadow-sm border border-zinc-50"
                    />
                )}
            </motion.div>

            {/* Edit Order Status Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-0 border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                            <DialogTitle className="text-2xl font-black">Update Shipment Status</DialogTitle>
                            <DialogDescription>
                                Set the current logistical stage for order {currentOrder?._id}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Order Status</Label>
                                <Select onValueChange={(val) => setValue("status", val)}>
                                    <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none">
                                        <SelectValue placeholder="Update stage..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paid">Mark as Paid</SelectItem>
                                        <SelectItem value="delivered">Mark as Delivered</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12">Discard</Button>
                            <Button type="submit" disabled={updateStatusMutation.isPending} className="rounded-xl h-12 px-8 font-black">
                                {updateStatusMutation.isPending ? <Loader2 className="animate-spin" /> : "Apply Status"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
