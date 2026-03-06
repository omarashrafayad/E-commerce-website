import clientAxios from "@/lib/axios/clientAxios";

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


