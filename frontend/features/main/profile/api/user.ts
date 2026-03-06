import clientAxios from "@/lib/axios/clientAxios";
import { updatePasswordFormData } from "../schemas/user.schema";

export const updateProfile = async (formData: FormData) => {
  const res = await clientAxios.patch("user/updateMe", formData);
  return res.data;
};

export const updatePassword = async (data: updatePasswordFormData
) => {
  const res = await clientAxios.patch("user/changeMyPassword", data);
  return res.data;
};

