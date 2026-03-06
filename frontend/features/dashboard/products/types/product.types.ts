export interface Product {
    _id: string;
    title: string;
    description: string;
    quantity: number;
    sold: number;
    price: number;
    priceAfterDiscount?: number;
    colors: string[];
    imageCover: string;
    images: string[];
    category: { _id?: string; name: string };
    brand?: string;
    subcategories: { name: string }[];
    ratingsAverage: number;
    ratingsQuantity: number;
    new: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ICardProduct {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    brand: string;
    imageSrc: string;
    isNew?: boolean;
}