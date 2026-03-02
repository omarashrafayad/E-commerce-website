"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    forgotPasswordSchema,
    ForgotPasswordFormData,
} from "@/schemas/auth.schema";
import { useState } from "react";
import { useForgotPassword } from "@/hooks/Auth";
import { useRouter } from "next/navigation";
import { AuthActionResult } from "@/types/auth.types";
import { motion } from "motion/react";
import { Mail, ArrowRight, Loader2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


export default function ForgotPasswordPage() {
    const router = useRouter();
    const { mutate, isPending, error } = useForgotPassword();
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        mutate(data, {
            onSuccess: (res: AuthActionResult) => {
                toast.success(res.message || "Check your email for reset link");
                setTimeout(() => {
                    router.push("/verify-code");
                }, 2000);
            },
            onError: (err: AuthActionResult) => {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                    <p className="text-gray-500">
                        Don't worry! It happens. Please enter the email associated with your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className={`h-12 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus:border-blue-500 focus-visible:ring-blue-500"}`}
                        />
                         {errors.email && (
                            <p className="text-red-500 text-xs flex items-center gap-1 mt-1 ml-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02]"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Sending Instructions...
                            </>
                        ) : (
                            <>
                                Send Reset Link
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                    
                    <div className="text-center mt-6">
                        <button 
                            type="button" 
                            onClick={() => router.push("/login")}
                            className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Login
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
