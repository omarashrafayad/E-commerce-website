import asyncHandler from 'express-async-handler';
import multer from 'multer';
import sharp from 'sharp';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';
import * as factory from './handleFactory';
import User from '../model/userModel'
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken';
import { uploadSingleImage } from '../middlewares/uploadImageMiddleware';

export const uploadUserImage = uploadSingleImage('profileImg');


export const resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${crypto.randomUUID()}-${Date.now()}.jpeg`;

    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${filename}`);

        req.body.profileImg = filename;
    }

    next();
});



export const resizeUserImage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) return next();

        const filename = `product-${crypto.randomUUID()}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${filename}`);

        req.body.profileImg = filename;

        next();
    }
);


export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const updateData: any = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role,
    };

    if (req.body.profileImg) {
        updateData.profileImg = req.body.profileImg;
    }

    const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
    if (!user) {
        return next(new ApiError(`No document for this id ${id}`, 404))
    }

    res.status(200).json({ data: user });
});

export const changeUserPassword = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(
        id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now()
        },
        { new: true }
    )
    if (!user) {
        return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({
        data: user
    })
})

export const getLoggedUserData = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    req.params.id = req.user._id.toString();
    next();
});

export const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError("User not authenticated", 401));
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        {
            new: true
        }
    )
    if (!user) {
        return next(new Error("User not found"));
    }
    const token = createToken(user._id.toString());

    res.status(200).json({ data: user, token });
})

export const updateLoggedUserData = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError("User not authenticated", 401));
    }
    const updateData: any = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    };

    if (req.body.profileImg) {
        updateData.profileImg = req.body.profileImg;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true }
    );

    res.status(200).json({ data: updatedUser });
});

export const deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError("User not authenticated", 401));
    }
    await User.findByIdAndUpdate(
        req.user._id,
        {
            active: false
        }
    )
    res.status(204).json({ status: 'Success' });
})

export const getAllUers = factory.getAll(User)
export const getUser = factory.getOne(User)
export const deleteUser = factory.deleteOne(User)
export const createUser = factory.createOne(User)