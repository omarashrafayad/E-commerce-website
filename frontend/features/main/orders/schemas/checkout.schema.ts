import * as z from "zod";

export const checkoutSchema = z.object({
    details: z.string().min(1, "Address details are required").min(5, "Address details must be at least 5 characters"),
    phone: z.string().min(1, "Phone number is required").regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number (e.g., 01012345678)"),
    city: z.string().min(1, "City is required").min(2, "City name is too short"),
    postalCode: z.string().min(1, "Postal code is required").length(5, "Postal code must be exactly 5 digits"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
