import { User } from "@/features/auth/types/auth.types";
import clientAxios from "@/lib/axios/clientAxios";




export const getUsers = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("user", { params });
  return res.data;
};

export const deleteUser = async (userId: string) => {
  const res = await clientAxios.delete(`user/${userId}`);
  return res.data;
};

export const createUser = async (data: User) => {
  const res = await clientAxios.post("user", data);
  return res.data;
};

export const updateUser = async (userId: string, data: User) => {
  const res = await clientAxios.patch(`user/${userId}`, data);
  return res.data;
};
