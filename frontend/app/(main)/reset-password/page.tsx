"use client";

import { useForm } from "react-hook-form";
import { useResetPassword } from "@/features/auth/hooks/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResetPasswordFormData, resetPasswordSchema } from "@/features/auth/schemas/auth.schema";
import { AuthActionResult } from "@/features/auth/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { LockKeyhole, Loader2, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const { mutate, isPending, error } = useResetPassword();
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        mutate(data, {
            onSuccess: (res: AuthActionResult) => {
                toast.success(res.message || "Password reset successfully!");

                setTimeout(() => {
                    router.push("/login");
                }, 1500);
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
                        <LockKeyhole className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-500">
                        Create a new strong password for your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">
                             Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                             className={`h-12 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        />
                         {errors.email && (
                            <p className="text-red-500 text-xs flex items-center gap-1 mt-1 ml-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                         <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 ml-1">
                             New Password
                         </label>
                         <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...register("newPassword")}
                                className={`h-12 pr-10 ${errors.newPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                         </div>
                          {errors.newPassword && (
                            <p className="text-red-500 text-xs flex items-center gap-1 mt-1 ml-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.newPassword.message}
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
                                Resetting Password...
                            </>
                        ) : (
                            <>
                                Reset Password
                                <CheckCircle className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}

