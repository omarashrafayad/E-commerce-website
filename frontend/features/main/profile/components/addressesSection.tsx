
import { Plus, Edit2, Trash2, MapPin, Phone, Home, Building2, Map, Navigation } from "lucide-react";
import { toast } from "sonner";
import { useAddresses } from "@/features/main/profile/hooks/useAddresses";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {  DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { addAddressFormData, addAddressSchema } from "@/features/main/profile/schemas/addresses.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAddress, useDeleteAddress } from "@/features/main/profile/hooks/useAddresses";
import { motion, AnimatePresence } from "framer-motion";
import { IAddress } from "@/features/main/profile/types/address.types";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/ui/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddressesSection() {
  const { data, isPending } = useAddresses();
  const { mutate: addAddress, isPending: isAdding } = useAddAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<addAddressFormData>({
    resolver: zodResolver(addAddressSchema),
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Spinner className="w-8 h-8 text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading your addresses...</p>
      </div>
    );
  }

  const onSubmit = (data: addAddressFormData) => {
    addAddress(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Address added successfully!");
        reset();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to add address!");
      }
    });
  };
  const handleDelete = (id: string) => {
    deleteAddress(id, {
      onSuccess: (res) => {
        toast.success(res.message || "Address deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to delete address!");
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Saved Addresses</h2>
          <p className="text-muted-foreground mt-1">Manage your delivery locations for faster checkout.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add New Address</DialogTitle>
              <DialogDescription>
                Fill in the details below to save a new delivery location.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="alias" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">alias</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="alias" placeholder="Home" className="pl-10" {...register("alias")} />
                    </div>
                    {errors.alias && <p className="text-[10px] text-destructive font-medium">{errors.alias.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10" {...register("phone")} />
                    </div>
                    {errors.phone && <p className="text-[10px] text-destructive font-medium">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address Details</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input id="details" placeholder="Street address, apartment, suite, etc." className="pl-10 pb-2" {...register("details")} />
                  </div>
                  {errors.details && <p className="text-[10px] text-destructive font-medium">{errors.details.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">City</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="city" placeholder="New York" className="pl-10" {...register("city")} />
                    </div>
                    {errors.city && <p className="text-[10px] text-destructive font-medium">{errors.city.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postalCode" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Postal Code</Label>
                    <div className="relative">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="postalCode" placeholder="10001" className="pl-10" {...register("postalCode")} />
                    </div>
                    {errors.postalCode && <p className="text-[10px] text-destructive font-medium">{errors.postalCode.message}</p>}
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full sm:w-auto max-md:mt-2">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="w-full sm:w-auto" disabled={isAdding}>
                  {isAdding ? <Spinner className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  Save Address
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {data?.data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <EmptyState
            title="No Addresses Found"
            description="You haven't saved any addresses yet. Add one to speed up your checkout process."
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {data?.data.map((addr: IAddress, index: number) => (
              <motion.div
                key={addr._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group relative overflow-hidden h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 bg-gradient-to-br from-card to-muted/30">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge
                        variant="secondary"
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors`}
                      >
                        {addr.alias}
                      </Badge>

                      <div className="flex gap-1">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-9 w-9 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                          onClick={() => handleDelete(addr._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Navigation className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-foreground text-base tracking-tight">{addr.details}</p>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{addr.city}, {addr.postalCode}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-muted-foreground/10 transition-colors duration-300">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Contact Number</p>
                          <p className="font-semibold text-foreground">{addr.phone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

