import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Edit2, Camera } from "lucide-react";
import { Badge } from "./ui/badge";
import { AuthActionResult, User } from "@/types/auth.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, updateProfileFormData } from "@/schemas/user.schema";
import { useState } from "react";
import { updateProfileFormdata } from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";

export default function ProfileSection({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { setAuth } = useAuthStore();
  const { mutate } = updateProfileFormdata();
  const onSubmit = async (data: updateProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);

      if (data.email !== user.email) {
        formData.append("email", data.email);
      }

      if (data.profileImg && data.profileImg.length > 0) {
        formData.append("profileImg", data.profileImg[0]);
      }

      mutate(formData, {
        onSuccess: (res: AuthActionResult) => {
          if (res.data) {
            setAuth(res.data.data);
          }
          toast.success(res.message || "Profile updated successfully!");
          setIsOpen(false);
        },
        onError: (err: Error) => {
          const axiosError = err as AxiosError<{ message?: string }>;
          toast.error(axiosError.response?.data?.message || "Failed to update profile");
        }
      });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <Card className="border-none shadow-none bg-transparent lg:border lg:bg-card lg:shadow-sm">
      <CardHeader className="px-0 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-bold">Profile Information</CardTitle>
            <CardDescription className="text-sm">Manage your personal details and account settings.</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full sm:w-auto gap-2 bg-primary text-primary-foreground h-11 sm:h-9 rounded-xl shadow-lg shadow-primary/20 cursor-pointer">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-3xl p-0 border-none overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                  <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your account information below.
                  </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-6">
                  {/* Photo Upload */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                      <Avatar className="h-24 w-24 border-4 border-zinc-50 dark:border-zinc-900 shadow-xl">
                        <AvatarImage src={preview || user.profileImg} alt={user.name} className="object-cover" />
                        <AvatarFallback className="text-3xl font-black bg-primary/5 text-primary">
                          {user.name?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Label htmlFor="profileImg" className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-[2px]">
                        <Camera className="text-white w-7 h-7" />
                      </Label>
                      <Input
                        id="profileImg"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("profileImg", {
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPreview(URL.createObjectURL(file));
                            }
                          }
                        })}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Tap to change photo</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</Label>
                      <Input id="name" defaultValue={user.name} {...register("name")} className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none px-4" />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</Label>
                      <Input
                        id="email"
                        defaultValue={user.email}
                        readOnly
                        className="h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border-none px-4 opacity-70 cursor-not-allowed"
                        {...register("email")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone} {...register("phone")} className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none px-4" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                <DialogFooter className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
                  <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl h-12 max-md:mt-2">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="px-0 lg:px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Full Name</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">{user.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Email Address</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.email}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Phone Number</p>
            <p className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">{user.phone || "Not provided"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">Account Status</p>
            <div className="mt-1">
              <Badge className={cn(
                "rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase",
                user.active ? "bg-emerald-500 hover:bg-emerald-600" : "bg-zinc-500 hover:bg-zinc-600"
              )}>
                {user.active ? "Active Account" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}