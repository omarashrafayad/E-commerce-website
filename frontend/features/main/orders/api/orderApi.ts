import clientAxios from "@/lib/axios/clientAxios";
import { SingleOrderResponse } from "@/features/main/orders/types/order.types";
import { CreateOrderPayload } from "@/features/dashboard/orders/types/order.types";


export const createOrder = async ({
    cartId,
    shippingAddress,
}: CreateOrderPayload): Promise<SingleOrderResponse> => {
    const res = await clientAxios.post<SingleOrderResponse>(`order/${cartId}`, {
        shippingAddress,
    });

    return res.data;
};

export const getOrderById = async (orderId: string): Promise<SingleOrderResponse> => {
    const res = await clientAxios.get<SingleOrderResponse>(`order/${orderId}`);
    return res.data;
};


