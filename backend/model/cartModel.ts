import mongoose, { Document, Types } from "mongoose";

export interface ICartItem {
    _id?: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    color: string;
    price: number;
}
export interface ICart extends Document {
    cartItems: ICartItem[];
    totalCartPrice: number;
    totalPriceAfterDiscount?: number| string;
    user: Types.ObjectId;
}
const cartSchema = new mongoose.Schema<ICart>(
    {
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                color: String,
                price: Number,
            },
        ],
        totalCartPrice: Number,
        totalPriceAfterDiscount: Number,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const cartModel = mongoose.model<ICart>('Cart', cartSchema);
export default cartModel;