import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { updatePasswordSchema, updatePasswordFormData } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordFormdata } from "@/hooks/useUser";
import { Spinner } from "./ui/spinner";
import { Lock, ShieldCheck, AlertTriangle } from "lucide-react";
import { AuthActionResult } from "@/types/auth.types";
import { AxiosError } from "axios";

export default function SecuritySection() {
  const { mutate: updatePassword, isPending } = updatePasswordFormdata();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<updatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = (data: updatePasswordFormData) => {
    updatePassword(data, {
      onSuccess: (res: AuthActionResult) => {
        toast.success(res.message || "Password updated successfully!");
        reset();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to update password. Please check your current password.");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Security Settings</h2>
        <p className="text-muted-foreground">Manage your account security and authentication methods.</p>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Change Password</CardTitle>
              <CardDescription>We recommend using a strong password that you don't use elsewhere.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="current" className="font-semibold">Current Password</Label>
              <Input 
                id="current" 
                type="password" 
                placeholder="••••••••" 
                className={errors.currentPassword ? "border-destructive" : ""}
                {...register("currentPassword")} 
              />
              {errors.currentPassword && (
                <p className="text-xs text-destructive font-medium">{errors.currentPassword.message}</p>
              )}
            </div>

            <Separator className="opacity-50" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="new" className="font-semibold">New Password</Label>
                <Input 
                  id="new" 
                  type="password" 
                  placeholder="••••••••" 
                  className={errors.password ? "border-destructive" : ""}
                  {...register("password")} 
                />
                {errors.password && (
                  <p className="text-xs text-destructive font-medium">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm" className="font-semibold">Confirm New Password</Label>
                <Input 
                  id="confirm" 
                  type="password" 
                  placeholder="••••••••" 
                  className={errors.passwordConfirm ? "border-destructive" : ""}
                  {...register("passwordConfirm")} 
                />
                {errors.passwordConfirm && (
                  <p className="text-xs text-destructive font-medium">{errors.passwordConfirm.message}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t px-6 py-4 flex justify-end">
            <Button 
              type="submit" 
              disabled={isPending}
              className="gap-2 px-8 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              {isPending ? <Spinner className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              Update Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
