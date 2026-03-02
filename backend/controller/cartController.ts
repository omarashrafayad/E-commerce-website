// import { ICart } from './../model/cartModel';
// import asyncHandler from 'express-async-handler';
// import Product from '../model/productsModel';
// import Cart from '../model/cartModel';
// import Coupon from '../model/couponModel';
// import ApiError from '../utils/apiError';


// const calcTotalCartPrice = (cart: ICart) => {
//     let totalPrice = 0;
//     cart.cartItems.forEach((item) => {
//         totalPrice += item.quantity * item.price
//     })
//     cart.totalCartPrice = totalPrice;
//     cart.totalPriceAfterDiscount = undefined;
//     return totalPrice;
// }
// export const addProductToCart = asyncHandler(async (req, res, next) => {
//     const { productId, color } = req.body

//     const product = await Product.findById(productId)

//     if (!product) {
//         return next(new ApiError('Product not found', 404));
//     }

//     let cart = await Cart.findOne({ user: req.user?._id })

//     if (!cart) {
//         cart = await Cart.create({
//             user: req.user?._id,
//             cartItems: [{ product: product.id, color, price: product.price, quantity: 1 }]
//         })
//     }

//     else {
//         const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId && item.color === color)

//         if (productIndex > -1) {
//             const cartItem = cart.cartItems[productIndex]
//             cartItem.quantity += 1
//         }
//         else {
//             cart.cartItems.push({ product: productId, color, price: product?.price, quantity: 1 })
//         }
//     }
//     calcTotalCartPrice(cart)
//     await cart.save();
//     res.status(200).json({
//         status: 'success',
//         message: 'Product added to cart successfully',
//         numOfCartItems: cart.cartItems.length,
//         data: cart
//     })
// })

// export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
//     if (!req.user?._id) {
//         return next(new ApiError("User not authenticated", 401));
//     }
//     const cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//         return next(
//             new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
//         );
//     }

//     res.status(200).json({
//         status: 'success',
//         numOfCartItems: cart.cartItems.length,
//         data: cart,
//     });
// });

// export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
//     if (!req.user?._id) {
//         return next(new ApiError("User not authenticated", 401));
//     }
//     const cart = await Cart.findOneAndUpdate(
//         { user: req.user._id },
//         {
//             $pull: { cartItems: { _id: req.params.itemId } },
//         },
//         { new: true }
//     );
//     if (!cart) {
//         return next(
//             new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
//         );
//     }

//     calcTotalCartPrice(cart);
//         cart.save();

//     res.status(200).json({
//         status: 'success',
//         numOfCartItems: cart.cartItems.length,
//         data: cart,
//     });
// });

// export const clearCart = asyncHandler(async (req, res, next) => {
//     if (!req.user?._id) {
//         return next(new ApiError("User not authenticated", 401));
//     }
//     await Cart.findOneAndDelete({ user: req.user._id });
//     res.status(204).send();
// });

// export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {

//     const { quantity } = req.body

//     const cart = await Cart.findOne({ user: req.user?._id })

//     if (!cart) {
//         return next(new ApiError(`there is no cart for user ${req.user?._id}`, 404));
//     }

//     const itemIndex = cart.cartItems.findIndex((item) => item._id?.toString() === req.params.itemId)

//     if (itemIndex > -1) {
//         const cartItem = cart.cartItems[itemIndex];
//         cartItem.quantity = quantity;
//         cart.cartItems[itemIndex] = cartItem;
//     } else {
//         return next(
//             new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
//         );
//     }

//     calcTotalCartPrice(cart);

//     await cart.save();

//     res.status(200).json({
//         status: 'success',
//         numOfCartItems: cart.cartItems.length,
//         data: cart,
//     });
// });

// export const applyCoupon = asyncHandler(async (req, res, next) => {

//     const coupon = await Coupon.findOne({
//         name: req.body.coupon,
//         expire: { $gt: Date.now() },
//     });

//     if (!coupon) {
//         return next(new ApiError(`Coupon is invalid or expired`, 400));
//     }


//     const cart = await Cart.findOne({ user: req.user?._id });

//     if (!cart) {
//         return next(new ApiError(`there is no cart for user ${req.user?._id}`, 404));
//     }
//     const totalPrice = cart.totalCartPrice;


//     const totalPriceAfterDiscount = (
//         totalPrice -
//         (totalPrice * coupon.discount) / 100).toFixed(2); // 99.23

//     cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
//     await cart.save();

//     res.status(200).json({
//         status: 'success',
//         numOfCartItems: cart.cartItems.length,
//         data: cart,
//     });
// });

import { ICart } from './../model/cartModel';
import asyncHandler from 'express-async-handler';
import Product from '../model/productsModel';
import Cart from '../model/cartModel';
import Coupon from '../model/couponModel';
import ApiError from '../utils/apiError';

// حساب السعر الكلي للـ cart
const calcTotalCartPrice = (cart: ICart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};

// إضافة منتج للكارت
export const addProductToCart = asyncHandler(async (req, res, next) => {
    const { productId, color } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError('Product not found', 404));
    }

    let cart = await Cart.findOne({ user: req.user?._id });

    // إنشاء cart تلقائيًا لو مش موجود
    if (!cart) {
        cart = await Cart.create({
            user: req.user?._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex > -1) {
        cart.cartItems[productIndex].quantity += 1;
    } else {
        cart.cartItems.push({ product: productId, color, price: product.price, quantity: 1 });
    }

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'success',
        message: 'Product added to cart successfully',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// الحصول على cart الخاص باليوزر
export const getLoggedUserCart = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // إنشاء cart فارغ تلقائيًا لو مش موجود
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// إزالة عنصر معين من الكارت
export const removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        // إنشاء cart فارغ لو مش موجود
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    } else {
        cart.cartItems = cart.cartItems.filter(
            (item) => item._id?.toString() !== req.params.itemId
        );
        calcTotalCartPrice(cart);
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// مسح كل عناصر الكارت
export const clearCart = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    } else {
        cart.cartItems = [];
        cart.totalCartPrice = 0;
        cart.totalPriceAfterDiscount = undefined;
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// تعديل كمية عنصر في الكارت
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user?._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    const itemIndex = cart.cartItems.findIndex((item) => item._id?.toString() === req.params.itemId);
    if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity = quantity;
    } else {
        return next(new ApiError(`There is no item for this id: ${req.params.itemId}`, 404));
    }

    calcTotalCartPrice(cart);
    await cart.save();

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});

// تطبيق كوبون
export const applyCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await Coupon.findOne({
        name: req.body.coupon,
        expire: { $gt: Date.now() },
    });

    if (!coupon) {
        return next(new ApiError(`Coupon is invalid or expired`, 400));
    }

    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
        cart = await Cart.create({
            user: req.user?._id,
            cartItems: [],
            totalCartPrice: 0,
        });
    }

    const totalPrice = cart.totalCartPrice;
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    await cart.save();

    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
    });
});