import asyncHandler from 'express-async-handler';
import User from '../model/userModel'
import ApiError from '../utils/apiError';

export const addProductToWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishlist: req.body.productId },
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Product added successfully to your wishlist.',
        data: user?.wishlist,
    });
});


export const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { wishlist: req.params.productId },
        },
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Product removed successfully from your wishlist.',
        data: user?.wishlist,
    });
});

export const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findById(req.user._id).populate({
  path: 'wishlist',
  select: '_id title price imageCover quantity'
});

    res.status(200).json({
        status: 'success',
        results: user?.wishlist.length,
        data: user?.wishlist,
    });
});