import * as z from "zod";

export const checkoutSchema = z.object({
    details: z.string().min(5, "Address details must be at least 5 characters"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number (e.g., 01012345678)"),
    city: z.string().min(2, "City name is too short"),
    postalCode: z.string().length(5, "Postal code must be exactly 5 digits"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
