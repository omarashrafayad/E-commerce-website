"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteOrder, getOrders, updateOrderToDelivered, updateOrderToPaid } from "../api/orderApi";


export const useOrders = (params: { page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: ["order", params],
        queryFn: () => getOrders(params),
    });
}

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

