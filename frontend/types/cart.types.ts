import { Product } from "./product.types";

export interface ICartItem {
  _id: string;
  product: string | Product;
  quantity: number;
  color?: string;
  price: number;
}

export interface ICart {
  _id: string;
  cartItems: ICartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: ICart;
}

export interface CartItemProps {
  item: ICartItem;
  readOnly?: boolean;
}