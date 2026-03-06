"use client";
import {  useQuery } from "@tanstack/react-query";
import { getProductById, getProducts, GetProductsParams } from "@/features/main/shop/api/productsApi";

export const useProducts = (params: GetProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};



export const useProductById = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => {
      if (!productId) return null;
      return getProductById(productId);
    },
    enabled: !!productId,
  });
};









