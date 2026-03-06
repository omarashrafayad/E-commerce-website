import clientAxios from "@/lib/axios/clientAxios";
import { OrdersResponse } from "@/features/main/orders/types/order.types";


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

