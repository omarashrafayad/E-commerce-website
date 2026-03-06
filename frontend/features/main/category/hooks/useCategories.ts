"use client";
import {  useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";

export const useCategories = (params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};