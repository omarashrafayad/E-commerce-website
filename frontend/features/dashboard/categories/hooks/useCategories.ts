"use client";
import { createCategory, deleteCategory, updateCategory } from "@/features/dashboard/categories/api/categoryApi";
import { CategoryPayload } from "@/features/dashboard/categories/types/category.type";
import { getCategories } from "@/features/main/category/api/categoryApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CategoryResponse } from "@/features/dashboard/categories/types/category.type";

export const useCategories = (params: { page?: number; limit?: number } = {}) => {
  return useQuery<CategoryResponse>({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

