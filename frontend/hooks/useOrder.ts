"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
    createOrder,
    CreateOrderPayload,
    getOrderById,
    getOrders,
    deleteOrder,
    updateOrderToPaid,
    updateOrderToDelivered
} from "@/api/orderApi";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] });
            queryClient.removeQueries({ queryKey: ["cart"] });
        },
    });
};

export const useOrders = (params: { page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: ["order", params],
        queryFn: () => getOrders(params),
    });
}

export const useOrderById = (orderId: string) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] });
        },
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => {
            if (status === "paid") {
                return updateOrderToPaid(id);
            } else if (status === "delivered") {
                return updateOrderToDelivered(id);
            }
            throw new Error(`Invalid status: ${status}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] });
        },
    });
};
