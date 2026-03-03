import clientAxios from "@/lib/axios/clientAxios";
import { IOrder, OrdersResponse, SingleOrderResponse } from "@/features/main/orders/types/order.types";

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
    postalCode: number;
}

export interface CreateOrderPayload {
    cartId: string;
    shippingAddress: ShippingAddress;
}

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

export const getOrders = async (params: { page?: number; limit?: number } = {}): Promise<OrdersResponse> => {
    const res = await clientAxios.get<OrdersResponse>("order", { params });
    return res.data;
};

export const deleteOrder = async (orderId: string) => {
    const res = await clientAxios.delete(`order/${orderId}`);
    return res.data;
};

export const updateOrderToPaid = async (orderId: string) => {
    const res = await clientAxios.patch(`order/${orderId}/pay`);
    return res.data;
};

export const updateOrderToDelivered = async (orderId: string) => {
    const res = await clientAxios.patch(`order/${orderId}/deliver`);
    return res.data;
};

