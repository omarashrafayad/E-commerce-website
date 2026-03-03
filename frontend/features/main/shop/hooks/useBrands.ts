"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
} from "@/features/main/shop/api/brandApi";

export const useBrands = (params: { page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: ["brands", params],
        queryFn: () => getBrands(params),
        staleTime: 1000 * 60 * 10,
    });
};

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createBrand(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
    });
};

export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateBrand(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
    });
};

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteBrand(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brands"] });
        },
    });
};

