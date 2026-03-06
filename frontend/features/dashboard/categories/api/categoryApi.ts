import clientAxios from "@/lib/axios/clientAxios";
import { CategoryPayload } from "../types/category.type";

export const createCategory = async (data: any) => {
  const res = await clientAxios.post("categories", data);
  return res.data;
};

export const updateCategory = async (id: string, data: any) => {
  const res = await clientAxios.patch(`categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await clientAxios.delete(`categories/${id}`);
  return res.data;
};