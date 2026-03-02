import clientAxios from "./clientAxios";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
  sort?: string;
  price?: { lte?: number };
  ratingsAverage?: { gte?: number };
}

export const getProducts = async (params: GetProductsParams) => {
  const res = await clientAxios.get("/products", { params });
  return res.data;
};

export const getProductById = async (productId: string) => {
  const res = await clientAxios.get(`/products/${productId}`);
  return res.data;
};

// admin 
export const getAllProducts = async (params: { page?: number; limit?: number } = {}) => {
  const res = await clientAxios.get("products", { params });
  return res.data;
};
export const deleteProduct = async (productId: string) => {
  const res = await clientAxios.delete(`/products/${productId}`);
  return res.data;
};
export const updateProduct = async (productId: string, data: any) => {
  const res = await clientAxios.patch(`/products/${productId}`, data);
  return res.data;
};
export const createProduct = async (data: any) => {
  const res = await clientAxios.post("/products", data);
  return res.data;
};

