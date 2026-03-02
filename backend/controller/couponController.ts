import * as factory from './handleFactory';
import Coupon from '../model/couponModel';

export const getAllCoupones = factory.getAll(Coupon);
export const getCoupon = factory.getOne(Coupon);
export const createCoupon = factory.createOne(Coupon);
export const updateCoupon = factory.updateOne(Coupon);
export const deleteCoupon = factory.deleteOne(Coupon);