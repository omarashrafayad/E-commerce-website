import mongoose, { Document, Types } from 'mongoose';

interface IOrderItem {
    _id?: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    color: string;
    price: number;
}

interface IShippingAddress {
    details?: string;
    phone?: string;
    city?: string;
    postalCode?: string;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    cartItems: IOrderItem[];
    taxPrice: number;
    shippingAddress?: IShippingAddress;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: 'card' | 'cash';
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date ;
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Order must belong to a user'],
        },

        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                color: String,
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        taxPrice: {
            type: Number,
            default: 0,
        },

        shippingAddress: {
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },

        shippingPrice: {
            type: Number,
            default: 0,
        },

        totalOrderPrice: {
            type: Number,
            required: true,
        },

        paymentMethodType: {
            type: String,
            enum: ['card', 'cash'],
            default: 'cash',
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: Date,

        isDelivered: {
            type: Boolean,
            default: false,
        },

        deliveredAt: Date,
    },
    { timestamps: true }
);

orderSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'user',
        select: 'name -_id',
    });
});

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
