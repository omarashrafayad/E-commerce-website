"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/features/main/shop/api/wishlistApi";


export const useWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
        retry:false
    });
};


export const useAddToWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWishlist,

        onMutate: async (productId: string) => {
            await queryClient.cancelQueries({ queryKey: ["wishlist"] });

            const previousWishlist = queryClient.getQueryData<any>(["wishlist"]);

            queryClient.setQueryData(["wishlist"], (old: any) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: [...old.data, { _id: productId, id: productId }], // simplified temp item
                };
            });

            return { previousWishlist };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["wishlist"], context?.previousWishlist);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlist,

        onMutate: async (productId: string) => {
            await queryClient.cancelQueries({ queryKey: ["wishlist"] });

            const previousWishlist = queryClient.getQueryData<any>(["wishlist"]);

            queryClient.setQueryData(["wishlist"], (old: any) => {
                if (!old || !old.data) return old;

                return {
                    ...old,
                    data: old.data.filter((item: any) => (item._id || item.id || item) !== productId),
                };
            });

            return { previousWishlist };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["wishlist"], context?.previousWishlist);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
};

