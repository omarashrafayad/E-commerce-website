
import asyncHandler from 'express-async-handler';
import User from '../model/userModel'
import ApiError from '../utils/apiError';
export const addAddress = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    const user = await User.findById(req.user._id);


    const exists = user?.addresses.some(addr =>
        addr.details === req.body.details &&
        addr.city === req.body.city &&
        addr.postalCode === req.body.postalCode
    );

    if (exists) {
        return next(new ApiError("Address already exists", 400));
    }

    user?.addresses.push(req.body);
    await user?.save();

    res.status(200).json({
        status: 'success',
        message: 'Address added successfully.',
        data: user?.addresses[user.addresses.length - 1],
    });
})

export const removeAddress = asyncHandler(async (req, res, next) => {
     if (!req.user?._id) {
            return next(new ApiError("User not authenticated", 401));
        }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { addresses: { _id: req.params.addressId } }
        },
        { new: true }
    )
    res.status(204).send();
})

export const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
     if (!req.user?._id) {
            return next(new ApiError("User not authenticated", 401));
        }
    const user = await User.findById(req.user._id)

    res.status(201).json({
        status: 'success',
        results: user?.addresses.length,
        data: user?.addresses,
    });
});