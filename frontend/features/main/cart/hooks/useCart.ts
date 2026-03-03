"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, applyCoupon, clearCart, deleteCartItem, getCart, updateCartQuantity } from "@/features/main/cart/api/cartApi";
import { CartResponse, ICartItem } from "@/features/main/cart/types/cart.types";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,

        onMutate: async (productId: string) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });

            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData(["cart"], (old: CartResponse | undefined) => {
                if (!old || !old.data) return old;

                const existingItemIndex = old.data.cartItems.findIndex(
                    (item: ICartItem) => {
                        const currentProductId = typeof item.product === "string" ? item.product : item.product._id;
                        return currentProductId === productId;
                    }
                );

                const newCart = { ...old };

                if (existingItemIndex > -1) {
                    const updatedItems = [...old.data.cartItems];
                    const item = updatedItems[existingItemIndex];
                    updatedItems[existingItemIndex] = {
                        ...item,
                        quantity: item.quantity + 1,
                    };

                    newCart.data = {
                        ...old.data,
                        cartItems: updatedItems,
                        totalCartPrice: old.data.totalCartPrice + (item.price || 0),
                    };
                } else {
                    newCart.numOfCartItems = old.numOfCartItems + 1;
                    newCart.data = {
                        ...old.data,
                        cartItems: [
                            ...old.data.cartItems,
                            {
                                _id: "temp-" + Date.now(),
                                product: productId,
                                quantity: 1,
                                price: 0, // We don't know the price yet, but at least quantity is handled
                            },
                        ],
                    };
                }

                return newCart;
            });

            return { previousCart };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["cart"], context?.previousCart);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useCart = () => {
    return useQuery<CartResponse>({
        queryKey: ["cart"],
        queryFn: getCart,
        retry: false,
    });
};


export const useUpdateQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCartQuantity,

        onMutate: async ({ cartItemId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });

            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData(["cart"], (old: CartResponse | undefined) => {
                if (!old || !old.data) return old;

                const itemToUpdate = old.data.cartItems.find((item: ICartItem) => item._id === cartItemId);
                if (!itemToUpdate) return old;

                const quantityDiff = quantity - itemToUpdate.quantity;
                const priceDiff = quantityDiff * (itemToUpdate.price || 0);

                return {
                    ...old,
                    data: {
                        ...old.data,
                        totalCartPrice: old.data.totalCartPrice + priceDiff,
                        cartItems: old.data.cartItems.map((item: ICartItem) =>
                            item._id === cartItemId ? { ...item, quantity } : item
                        ),
                    },
                };
            });

            return { previousCart };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["cart"], context?.previousCart);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCartItem,

        onMutate: async (cartItemId: string) => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });

            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData(["cart"], (old: CartResponse | undefined) => {
                if (!old || !old.data) return old;

                const itemToRemove = old.data.cartItems.find((item: ICartItem) => item._id === cartItemId);
                if (!itemToRemove) return old;

                const priceToSubtract = (itemToRemove.price || 0) * itemToRemove.quantity;

                return {
                    ...old,
                    numOfCartItems: Math.max(0, old.numOfCartItems - 1),
                    data: {
                        ...old.data,
                        totalCartPrice: Math.max(0, old.data.totalCartPrice - priceToSubtract),
                        cartItems: old.data.cartItems.filter(
                            (item: ICartItem) => item._id !== cartItemId
                        ),
                    },
                };
            });

            return { previousCart };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["cart"], context?.previousCart);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["cart"] });

            const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

            queryClient.setQueryData(["cart"], (old: CartResponse | undefined) => {
                if (!old) return old;

                return {
                    ...old,
                    numOfCartItems: 0,
                    data: {
                        ...old.data,
                        cartItems: [],
                        totalCartPrice: 0,
                        totalPriceAfterDiscount: 0,
                    },
                };
            });

            return { previousCart };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(["cart"], context?.previousCart);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

export const useApplyCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: applyCoupon,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};



