import clientAxios from "./clientAxios";

export const getWishlist = async () => {
    const res = await clientAxios.get("wishlist");
    return res.data;
};

export const addToWishlist = async (productId: string) => {
    const res = await clientAxios.post("wishlist", { productId });
    return res.data;
};

export const removeFromWishlist = async (productId: string) => {
    const res = await clientAxios.delete(`wishlist/${productId}`);
    return res.data;
};
