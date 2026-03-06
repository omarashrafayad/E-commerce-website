"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
    createOrder,
    getOrderById,
} from "@/features/main/orders/api/orderApi";

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


export const useOrderById = (orderId: string) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
    });
};


