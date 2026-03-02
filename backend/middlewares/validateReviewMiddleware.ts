import asyncHandler from 'express-async-handler';
import Review from '../model/reviewModel';
import Product from '../model/productsModel';
import ApiError from '../utils/apiError';

export const checkReviewExists = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
     const productId = req.body.product;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError('There is no product with this id', 404));
    }
    const review = await Review.findOne({
        user: req.user._id,
        product: req.body.product,
    });

    if (review) {
        return next(new ApiError('You already created a review before', 400));
    }
    next();
});

export const checkReviewOwnership = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const review = await Review.findById(req.params.id);
    if (!review) return next(new ApiError('There is no review with this id', 404));

    if (review.user.toString() !== req.user._id.toString()) {
        return next(new ApiError('You are not allowed to perform this action', 403));
    }

    next();
});

export const checkReviewDeletePermission = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const review = await Review.findById(req.params.id);
    if (!review) return next(new ApiError('There is no review with this id', 404));

    if (req.user.role === 'user' && review.user.toString() !== req.user._id.toString()) {
        return next(new ApiError('You are not allowed to perform this action', 403));
    }

    next();
});
