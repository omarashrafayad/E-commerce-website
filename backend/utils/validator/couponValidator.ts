import z from "zod";
import zodValidator from "../../middlewares/validatorMiddleware";
import { createEntityValidators } from "./createEntityValidators";

const validators = createEntityValidators({ entityName: "coupon" });

const createCouponSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        expire: z.coerce.date(),
        discount: z.number(),
    }),
});

const updateCouponSchema = z.object({
    body: z.object({
        name: z.string().min(3).optional(),
        expire: z.coerce.date().optional(),
        discount: z.number().optional(),
    }),
});
export const getCouponValidator = validators.getValidator;
export const createCouponValidator = zodValidator(createCouponSchema)
export const updateCouponValidator = zodValidator(updateCouponSchema)
export const deleteCouponValidator = validators.deleteValidator;