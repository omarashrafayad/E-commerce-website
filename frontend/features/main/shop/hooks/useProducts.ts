"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProducts, GetProductsParams, updateProduct } from "@/features/main/shop/api/productsApi";

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

export const useAllProducts = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: any }) => updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};





