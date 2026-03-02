import mongoose, { Types, Model, Document } from 'mongoose';
import Product from './productsModel';

export interface IReview extends Document {
    title?: string;
    ratings: number;
    user: Types.ObjectId;
    product: Types.ObjectId;
}

interface ReviewModel extends Model<IReview> {
    calcAverageRatingsAndQuantity(productId: Types.ObjectId): Promise<void>;
}

const reviewSchema = new mongoose.Schema<IReview>(
    {
        title: {
            type: String,
        },
        ratings: {
            type: Number,
            min: [1, 'Min ratings value is 1.0'],
            max: [5, 'Max ratings value is 5.0'],
            required: [true, 'review ratings required'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to user'],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Review must belong to product'],
        },
    },
    { timestamps: true }
);

reviewSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'user',
        select: 'name -_id',
    });
});
reviewSchema.pre(/^find/, function () {
    (this as any).populate({
        path: 'product',
        select: 'title -_id',
    });
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
    productId: Types.ObjectId
) {
    const result = await this.aggregate([
        {
            $match: { product: productId },
        },
        {
            $group: {
                _id: '$product',
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 },
            },
        },
    ]);

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};


reviewSchema.post('save', async function () {
    const reviewModel = this.constructor as ReviewModel;
    await reviewModel.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('findOneAndDelete', async function (doc: any) {
    if (doc) {
        const reviewModel = this.model as ReviewModel;
        await reviewModel.calcAverageRatingsAndQuantity(doc.product);
    }
});

const reviewModel = mongoose.model<IReview>('Review', reviewSchema);
export default reviewModel;
