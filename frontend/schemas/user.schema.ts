import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Too short User name'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    profileImg: z.any().optional(),
});

export type updateProfileFormData = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'You must enter your current password'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        passwordConfirm: z.string(),
    }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Password Confirmation incorrect',
});
export const userFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    role: z.string().min(1, "Role is required"),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
    passwordConfirm: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
});


export type updatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type updatePasswordActionResult = z.infer<typeof updatePasswordSchema>;
export type UserFormData = z.infer<typeof userFormSchema>;
