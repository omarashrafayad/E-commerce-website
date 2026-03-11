
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { updatePasswordSchema, updatePasswordFormData } from "../schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordFormdata } from "../hooks/useUser";
import { Lock, ShieldCheck, AlertTriangle } from "lucide-react";
import { AuthActionResult } from "@/features/auth/types/auth.types";
import { AxiosError } from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { UniInput } from "@/components/shared/UniInput";
import { Form } from "@/components/ui/form";


export default function SecuritySection() {
  const { mutate: updatePassword, isPending } = useUpdatePasswordFormdata();
  const form = useForm<updatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "all",
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset
  } = form;

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
        <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">

            <UniInput
              control={control}
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              type="password"
              className="grid gap-2"
            />

            <Separator className="opacity-50" />

            <div className="grid gap-4 sm:grid-cols-2">

              <UniInput
                control={control}
                name="password"
                label="New Password"
                placeholder="Enter your new password"
                type="password"
                className="grid gap-2"
              />

              <UniInput
                control={control}
                name="passwordConfirm"
                label="Confirm New Password"
                placeholder="Enter your confirm new password"
                type="password"
                className="grid gap-2"
              />
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
        </Form>
      </Card>
    </div>
  );
}
