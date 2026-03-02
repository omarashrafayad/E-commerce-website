import asyncHandler from 'express-async-handler';
import User from '../model/userModel'
import createToken from '../utils/createToken';
import bcrypt from 'bcryptjs'
import ApiError from '../utils/apiError';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail';
export const signUp = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const token = createToken(user._id.toString())

    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
    res.status(201).json({
        message: 'signUp successfully',
        data: user,
        token

    })
})

export const login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }
    
    const token = createToken(user._id.toString())
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
    res.status(200).json({
        message: 'login successfully',
        data: user,
        token
    })
})

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ApiError('You are not login, Please login to get access this route', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload

    const currentUser = await User.findById(decoded.userId)

    if (!currentUser) {
        return next(new ApiError('The user that belong to this token does no longer exist', 401));
    }

    if (currentUser.passwordChangedAt) {
        const passChangedTimestamp = Math.floor(currentUser.passwordChangedAt.getTime() / 1000);

        if (!decoded.iat) {
            return next(new ApiError('Token invalid', 401));
        }
        if (passChangedTimestamp > decoded.iat) {
            return next(new ApiError('User recently changed his password. please login again..', 401))
        }
    }

    req.user = currentUser
    next()
});

export const allowedTo = (...roles: string[]) => {
    asyncHandler(async (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError('You are not allowed to access this route', 403));
        }
        next()
    })
}

export const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ApiError(`There is no user with that email ${req.body.email}`, 404));
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedRestCode = crypto.createHash('sha256').update(resetCode).digest('hex');

    await User.updateOne(
        { _id: user._id },
        {
            passwordResetCode: hashedRestCode,
            passwordResetExpires: Date.now() + 10 * 60 * 1000,
            passwordResetVerified: false,
        }
    );

    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
    }

    res
        .status(200)
        .json({ status: 'Success', message: 'Reset code sent to email' });
});

export const verifyPassResetCode = asyncHandler(async (req, res, next) => {
    const hashedRestCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');

    const user = await User.findOne({
        passwordResetCode: hashedRestCode,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ApiError('Reset code invalid or expired', 400));
    }

    await User.updateOne(
        { _id: user._id },
        { passwordResetVerified: true }
    );

    res.status(200).json({
        status: 'Success',
    });
})

export const resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(
            new ApiError(`There is no user with email ${req.body.email}`, 404)
        );
    }

    if (!user.passwordResetVerified) {
        return next(new ApiError('Reset code not verified', 400));
    }

    await User.updateOne(
        { _id: user._id },
        {
            password: await bcrypt.hash(req.body.newPassword, 12),
            passwordResetCode: undefined,
            passwordResetExpires: undefined,
            passwordResetVerified: undefined,
            passwordChangedAt: Date.now(),
        }
    );

    const token = createToken(user._id.toString());

    res.status(200).json({ token });
});
