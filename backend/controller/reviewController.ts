import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';
import * as factory from './handleFactory';
import Review from '../model/reviewModel';

export const createFilterObj = asyncHandler(async (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId }

    req.filterObj = filterObject
    next()
})

export const setProductIdAndUserIdToBody = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    if (!req.body.product) req.body.product = req.params.productId
    if (!req.body.user) req.body.user = req.user._id
    next()
})

export const getReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const updateReview = factory.updateOne(Review);
export const deleteReview = factory.deleteOne(Review);