import clientAxios from "./clientAxios";
import { updatePasswordFormData } from "@/schemas/user.schema";

export const updateProfile = async (formData: FormData) => {
  const res = await clientAxios.patch("user/updateMe", formData);
  return res.data;
};

export const updatePassword = async (data: updatePasswordFormData) => {
  const res = await clientAxios.patch("user/changeMyPassword", data);
  return res.data;
};
export const getUsers = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("user", { params });
  return res.data;
};

export const deleteUser = async (userId: string) => {
  const res = await clientAxios.delete(`user/${userId}`);
  return res.data;
};

export const createUser = async (data: any) => {
  const res = await clientAxios.post("user", data);
  return res.data;
};

export const updateUser = async (userId: string, data: any) => {
  const res = await clientAxios.patch(`user/${userId}`, data);
  return res.data;
};
