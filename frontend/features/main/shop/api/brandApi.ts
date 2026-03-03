import clientAxios from "@/lib/axios/clientAxios";

export const getBrands = async (params: { page?: number; limit?: number } = {}) => {
    const res = await clientAxios.get("brands", { params });
    return res.data;
};

export const createBrand = async (data: any) => {
    const res = await clientAxios.post("brands", data);
    return res.data;
};

export const updateBrand = async (id: string, data: any) => {
    const res = await clientAxios.patch(`brands/${id}`, data);
    return res.data;
};

export const deleteBrand = async (id: string) => {
    const res = await clientAxios.delete(`brands/${id}`);
    return res.data;
};
