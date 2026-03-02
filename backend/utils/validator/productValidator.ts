import { z } from "zod";
import { createEntityValidators } from "./createEntityValidators";
import zodValidator from "../../middlewares/validatorMiddleware";
const validators = createEntityValidators({ entityName: "Product" });

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid product ID format"
});

export const createProductSchema = z.object({
    body: z.object({
        title: z.string().min(3),
        description: z.string().min(20).max(2000),
        quantity: z.coerce.number(),
        sold: z.number().optional(),
        price: z.coerce.number(),
        priceAfterDiscount: z.coerce.number().optional(),
        colors: z.array(z.string()).optional(),
        imageCover: z.string(),
        images: z.array(z.string()).optional(),
        category: mongoId,
        subcategories: z.array(mongoId).optional(),
        brand: mongoId.optional(),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: mongoId,
    }),

    body: z.object({
        title: z.string().min(3).optional(),
        slug: z.string().optional(),
        description: z.string().max(2000).optional(),
        quantity: z.coerce.number().optional(),
        sold: z.number().optional(),
        price: z.coerce.number().optional(),
        priceAfterDiscount: z.coerce.number().optional(),
        colors: z.array(z.string()).optional(),
        imageCover: z.string().optional(),
        images: z.array(z.string()).optional(),

        category: mongoId.optional(),
        subcategories: z.array(mongoId).optional(),
        brand: mongoId.optional(),

        ratingsAverage: z.number().min(1).max(5).optional(),
        ratingsQuantity: z.number().optional(),
    }),
});

export const updateProductValidator = zodValidator(updateProductSchema)

export const createProductValidator = zodValidator(createProductSchema)

export const getProductValidator = validators.getValidator;

export const deleteProductValidator = validators.deleteValidator;

