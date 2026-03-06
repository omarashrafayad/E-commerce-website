import clientAxios from "@/lib/axios/clientAxios";

export const getCategories = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("/categories", { params });
  return res.data;
};

