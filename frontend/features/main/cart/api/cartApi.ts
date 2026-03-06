import clientAxios from "@/lib/axios/clientAxios";

export interface UpdateQuantityPayload {
  cartItemId: string;
  quantity: number;
}
export const addToCart = async (productId: string) => {
  const res = await clientAxios.post("cart", { productId });
  return res.data;
};

export const getCart = async () => {
  const res = await clientAxios.get("cart");
  return res.data;
};



export const updateCartQuantity = async ({
  cartItemId,
  quantity,
}: UpdateQuantityPayload) => {
  const res = await clientAxios.patch(`cart/${cartItemId}`, {
    quantity,
  });

  return res.data;
};

export const deleteCartItem = async (cartItemId: string) => {
  const res = await clientAxios.delete(`cart/${cartItemId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await clientAxios.delete("cart");
  return res.data;
};

export const applyCoupon = async (coupon: string) => {
  const res = await clientAxios.patch("cart/applyCoupon", {
    coupon,
  });

  return res.data;
};



