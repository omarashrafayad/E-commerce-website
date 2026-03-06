import { ICartItem } from "../../cart/types/cart.types";
import { IAddress } from "../../profile/types/address.types";

export interface IOrder {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    } | string;
    cartItems: ICartItem[];
    shippingAddress: IAddress;
    totalOrderPrice: number;
    paymentMethodType: "card" | "cash";
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrdersResponse {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: IOrder[];
}

export interface SingleOrderResponse {
    status: string;
    session?: {
        url: string;
        orderId: string;
    };
    data: IOrder;
}
