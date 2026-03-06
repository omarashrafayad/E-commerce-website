import z from "zod";

export const brandFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;