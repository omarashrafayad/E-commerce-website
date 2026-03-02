import mongoose, { Document } from 'mongoose';
export interface ICoupon extends Document {
    name: string;
    expire: Date;
    discount: number;
}
const couponSchema = new mongoose.Schema<ICoupon>(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Coupon name required'],
            unique: true,
        },
        expire: {
            type: Date,
            required: [true, 'Coupon expire time required'],
        },
        discount: {
            type: Number,
            required: [true, 'Coupon discount value required'],
        },
    },
    { timestamps: true }
);

const couponModel = mongoose.model<ICoupon>('Coupon', couponSchema);
export default couponModel