import asyncHandler from 'express-async-handler';
import Cart from '../model/cartModel';
import ApiError from '../utils/apiError';
import Order from '../model/orderModel';
import Product from '../model/productsModel';
import * as factory from './handleFactory';

export const createCashOrder = asyncHandler(async (req, res, next) => {

    const taxPrice = 0;
    const shippingPrice = 0;

    const cart = await Cart.findById(req.params.cartId);

    if (!cart) {
        return next(
            new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
        );
    }

    const cartPrice = cart.totalPriceAfterDiscount
        ? cart.totalPriceAfterDiscount
        : cart.totalCartPrice;

    const totalOrderPrice = Number(cartPrice) + Number(taxPrice) + shippingPrice;

    const order = await Order.create({
        user: req.user?._id,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,
        cartItems: cart.cartItems
    })
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
            },
        }));
        await Product.bulkWrite(bulkOption, {});

        await Cart.findByIdAndDelete(req.params.cartId);
    }
    res.status(201).json({ status: 'success', data: order });
})


export const filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (!req.user?._id) {
        return next(new ApiError("User not authenticated", 401));
    }
    if (req.user.role === 'user') req.filterObj = { user: req.user._id };
    next();
});

export const findAllOrders = factory.getAll(Order);

export const findSpecificOrder = factory.getOne(Order);
export const deleteOrder = factory.deleteOne(Order);

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(
                `There is no such a order with this id:${req.params.id}`,
                404
            )
        );
    }


    order.isPaid = true;
    order.paidAt = new Date(Date.now());

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
});

export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(
                `There is no such a order with this id:${req.params.id}`,
                404
            )
        );
    }


    order.isDelivered = true;
    order.deliveredAt = new Date(Date.now());

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
});
