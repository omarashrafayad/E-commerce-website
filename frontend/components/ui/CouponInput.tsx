"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApplyCoupon } from "@/hooks/useCart";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function CouponInput() {
  const [code, setCode] = useState("");
  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    applyCoupon(code.trim(), {
      onSuccess: () => {
        toast.success("Coupon applied successfully");
        setCode("");
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Invalid coupon code");
        setCode("");
      },
    });
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 w-full">
        <Input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleApply(e as any);
            }
          }}
          placeholder="Enter coupon code"
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleApply}
          disabled={!code.trim() || isPending}
        >
          {isPending ? "Applying..." : "Apply"}
        </Button>
      </div>
    </div>
  );
}
