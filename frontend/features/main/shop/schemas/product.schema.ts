import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    quantity: z.coerce.number().min(0, "Quantity cannot be negative").default(0),
    price: z.coerce.number().min(0, "Price cannot be negative").default(0),
    priceAfterDiscount: z.coerce.number().min(0).optional(),
    category: z.string().min(1, "Category is required"),
    brand: z.string().optional(),
    imageCover: z.any().optional(),
    images: z.any().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
