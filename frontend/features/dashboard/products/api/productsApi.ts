import clientAxios from "@/lib/axios/clientAxios";
import { Product } from "../types/product.types";

export const getProducts = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("/products", { params });
  return res.data;
};
export const deleteProduct = async (productId: string) => {
  const res = await clientAxios.delete(`/products/${productId}`);
  return res.data;
};
export const updateProduct = async (productId: string, data: Product | FormData) => {
  const res = await clientAxios.patch(`/products/${productId}`, data);
  return res.data;
};
export const createProduct = async (data: Product | FormData) => {
  const res = await clientAxios.post("/products", data);
  return res.data;
};

