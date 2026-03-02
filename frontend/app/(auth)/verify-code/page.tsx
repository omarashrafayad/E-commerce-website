"use client";

import { useForm } from "react-hook-form";
import { useVerifyCode } from "@/hooks/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetCodeSchema, VerifyResetCodeFormData } from "@/schemas/auth.schema";
import { AuthActionResult } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VerifyCodePage() {
  const { mutate, isPending, error } = useVerifyCode();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(resetCodeSchema),
});

  const onSubmit = (data: VerifyResetCodeFormData) => {
    mutate(data, {
      onSuccess: (res: AuthActionResult) => {
        toast.success(res.message || "Code verified successfully");
        setTimeout(() => {
          router.push("/reset-password");
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
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
               <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Code</h1>
            <p className="text-gray-500">
               Enter the 6-digit code sent to your email.
            </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           <div className="space-y-2">
                <label htmlFor="resetCode" className="text-sm font-medium text-gray-700 ml-1">
                    Verification Code
                </label>
                <Input
                    id="resetCode"
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    className={`h-12 text-center text-2xl tracking-[0.5em] font-mono ${
                         errors.resetCode ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    {...register("resetCode")}
                    required
                />
                {errors.resetCode && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1 ml-1">
                        <AlertCircle className="w-3 h-3" />
                         {errors.resetCode.message}
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
                    Verifying...
                </>
            ) : (
                <>
                    Verify Code
                    <ArrowRight className="ml-2 h-5 w-5" />
                </>
            )}
          </Button>

            <div className="text-center mt-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            </div>
        </form>
      </motion.div>
    </div>
  );
}
