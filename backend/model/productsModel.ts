import mongoose from "mongoose";
import { Types, Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    slug: string;
    description: string;
    quantity: number;
    sold?: number;
    price: number;
    priceAfterDiscount?: number;
    colors?: string[];
    imageCover: string;
    images?: string[];
    category: Types.ObjectId;
    subcategories?: Types.ObjectId[];
    brand?: Types.ObjectId;
    ratingsAverage?: number;
    ratingsQuantity?: number;
    new?: boolean;
}
const productSchema = new mongoose.Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Too short product title'],
            maxlength: [100, 'Too long product title'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            minlength: [20, 'Too short product description'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            max: [200000, 'Too long product price'],
        },
        priceAfterDiscount: Number,
        colors: [String],
        imageCover: {
            type: String,
            required: [true, 'Product Image cover is required'],
        },
        images: [String],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Product must belong to category'],
        },
        subcategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubCategory',
            },
        ],
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be >= 1.0'],
            max: [5, 'Rating must be <= 5.0'],
            default: 1,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        new: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// productSchema.pre(/^find/, function () {
//     (this as any).populate({
//         path: 'category',
//         select: 'name image _id',
//     });
// });

const setImageURL = (doc: IProduct) => {
    if (doc.imageCover) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        const imagesList: any = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.BASE_URL}/products/${image}`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};

productSchema.post('init', (doc) => {
    setImageURL(doc);
});


productSchema.post('save', (doc) => {
    setImageURL(doc);
});
const productModel = mongoose.model<IProduct>('Product', productSchema)
export default productModel
