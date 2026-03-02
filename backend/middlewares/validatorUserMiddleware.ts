import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';
import User from '../model/userModel';
import bcrypt from 'bcryptjs';


export const checkEmailExists = asyncHandler(async (req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({ email });
    if (user) {
        return next(new ApiError('E-mail already in use', 400));
    }

    next();
});

export const checkCurrentPassword = asyncHandler(async (req, res, next) => {
    const { currentPassword } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) return next(new ApiError('User not found', 404));

    const isCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrect) {
        return next(new ApiError('Incorrect current password', 400));
    }

    next();
});
