import z from 'zod'
import { createEntityValidators } from "./createEntityValidators";
import zodValidator from '../../middlewares/validatorMiddleware';

const validators = createEntityValidators({ entityName: "User" });

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid product ID format"
});

export const createUserSchema = z.object({
    body: z
        .object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(6),
            passwordConfirm: z.string(),
            phone: z.string().optional(),
        })
        .refine((data) => data.password === data.passwordConfirm, {
            path: ['passwordConfirm'],
            message: 'Password Confirmation incorrect',
        }),
});

export const updateUserSchema = z.object({
    params: z.object({
        id: mongoId,
    }),
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string()
            .optional()
            .refine(
                (val) =>
                    !val ||
                    /^(\+20|0)?1[0125][0-9]{8}$/.test(val) ||
                    /^(\+966|0)?5[0-9]{8}$/.test(val),
                'Invalid phone number only accepted Egy and SA Phone numbers'
            ),
        profileImg: z.string().optional(),
        role: z.string().optional(),
    }),
});


export const changeUserPasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(1, 'You must enter your current password'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        passwordConfirm: z.string(),
    }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Password Confirmation incorrect',
})
})


export const updateLoggedUserSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string()
            .optional()
            .refine(
                (val) =>
                    !val ||
                    /^(\+20|0)?1[0125][0-9]{8}$/.test(val) ||
                    /^(\+966|0)?5[0-9]{8}$/.test(val),
                'Invalid phone number only accepted Egy and SA Phone numbers'
            ),
    }),
});

export const createUserValidator = zodValidator(createUserSchema)
export const updateUserValidator = zodValidator(updateUserSchema)
export const updateLoggedUserValidator = zodValidator(updateLoggedUserSchema)
export const changeUserPasswordValidator = zodValidator(changeUserPasswordSchema)
export const getUserValidator = validators.getValidator
export const deleteUserValidator = validators.deleteValidator
