import z from "zod";
import zodValidator from "../../middlewares/validatorMiddleware";
const sighUpSchema = z.object({
    body:z.object({
        name:z.string()
        .nonempty('Name is required')
        .min(3,'Too short User name'),
        email:z
        .email('Invalid email address').nonempty('Email is required'),
        password:z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
        passwordConfirm: z.string().nonempty('passwordConfirm is required'),
    }).refine((data)=>data.password === data.passwordConfirm,{
        message: 'Password Confirmation incorrect',
        path: ['passwordConfirm'],
    })
})
const loginSchem = z.object({
    body:z.object({
        email:z
        .email('Invalid email address').nonempty('Email is required'),
        password:z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
        
    })
})
const forgootPasswordSchem = z.object({
    body:z.object({
        email:z
        .email('Invalid email address').nonempty('Email is required'),        
    })
})
const resetCodeSchema = z.object({
    body:z.object({
        resetCode:z.string().min(6,'resetCode must be at least 6 characters')     
    })
})
const resetPasswordSchema = z.object({
    body:z.object({
        newPassword:z.string().min(6,'Password must be at least 6 characters'),
        email:z.email('Invalid email address')
    })
})

export const signUpValidator = zodValidator(sighUpSchema)
export const loginValidator = zodValidator(loginSchem)
export const forgotPasswordValidator = zodValidator(forgootPasswordSchem)
export const resetCodeValidator = zodValidator(resetCodeSchema)
export const resetPasswordValidator = zodValidator(resetPasswordSchema)