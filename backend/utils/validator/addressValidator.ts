
import { z } from "zod";
import zodValidator from "../../middlewares/validatorMiddleware";

const addAddressSchema = z.object({
    body: z.object({
        alias: z.string().optional(),
        details: z.string().min(5, "Details must be at least 5 characters"),
        phone: z.string().min(10, "Phone must be at least 10 digits"),
        city: z.string().min(2, "City name is too short"),
        postalCode: z.string().min(4, "Postal code is too short")
    })
});

export const addAddressValidator = zodValidator(addAddressSchema);
