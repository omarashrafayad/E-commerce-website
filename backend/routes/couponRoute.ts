import express  from "express";
import { createCoupon, deleteCoupon, getAllCoupones, getCoupon, updateCoupon } from "../controller/couponController";
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from "../utils/validator/couponValidator";


const router = express.Router();

router.route('/').get(getAllCoupones).post(createCouponValidator,createCoupon);
router.route('/:id').get(getCouponValidator,getCoupon)
.patch(updateCouponValidator,updateCoupon)
.delete(deleteCouponValidator,deleteCoupon)
export default router;