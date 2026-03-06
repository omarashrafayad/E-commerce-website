"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Globe, Tag, Loader2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand, Brand } from "@/features/dashboard/brands/hooks/useBrands";
import { toast } from "sonner";
import { BrandFormData, brandFormSchema } from "../schemas/brand.schema";
import { AxiosError } from "axios";



export default function BrandsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);

    const { data: brandsResponse, isLoading: isBrandsLoading } = useBrands({
        page: currentPage,
        limit
    });
    const createBrandMutation = useCreateBrand();
    const updateBrandMutation = useUpdateBrand();
    const deleteBrandMutation = useDeleteBrand();
    const brands = brandsResponse?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<BrandFormData>({
        resolver: zodResolver(brandFormSchema),
    });

    const handleEdit = (brand: Brand) => {
        setIsEditing(true);
        setCurrentBrand(brand);
        reset({
            name: brand.name,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            try {
                await deleteBrandMutation.mutateAsync(id);
                toast.success("Brand deleted successfully");
            } catch (error) {
                toast.error("Failed to delete brand");
            }
        }
    };

    const onSubmit = async (data: BrandFormData) => {
        try {
            if (isEditing && currentBrand) {
                await updateBrandMutation.mutateAsync({ id: currentBrand._id, data });
                toast.success("Brand updated successfully");
            } else {
                await createBrandMutation.mutateAsync(data);
                toast.success("Brand created successfully");
            }
            setIsDialogOpen(false);
            reset();
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError.response?.data?.message || "Failed to remove product from wishlist");
        }
    };

    const handleOpenDialog = () => {
        setIsEditing(false);
        setCurrentBrand(null);
        reset({ name: "" });
        setIsDialogOpen(true);
    };

    const COLUMNS = [
        {
            id: "name",
            header: "Brand Identity",
            cell: (_: unknown, row: Brand) => (
                <ProductCell
                    title={row.name}
                    imageSize="h-10 w-10"
                    className="gap-4"
                />
            ),
            className: "min-w-[250px]"
        },
        {
            id: "status",
            header: "Visibility",
            cell: (_: unknown, row: Brand) => (
                <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    row.active !== false ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-zinc-100 text-zinc-500 font-medium"
                )}>
                    {row.active !== false ? "Active" : "Hidden"}
                </span>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (_: unknown, row: Brand) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => handleDelete(row._id)} />
                </ActionCell>
            ),
            headerClassName: "justify-center text-center",
            className: "justify-center text-center"
        }
    ];

    const filteredBrands = brands.filter((b: Brand) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <Tag className="size-4" />
                        <span>Brand Catalog</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Partners & Brands</h2>
                    <p className="text-zinc-500">Manage brand identities and their associated products.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleOpenDialog} className="rounded-xl px-5 h-11 shadow-lg shadow-primary/20">
                        <Plus className="size-5 mr-2" /> Register Brand
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {isBrandsLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200">
                        <Loader2 className="size-10 text-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Tracking assets...</p>
                    </div>
                ) : (
                    <UniTable
                        data={filteredBrands}
                        columns={COLUMNS}
                        enablePagination={true}
                        pageSize={limit}
                        serverPagination={{
                            currentPage,
                            totalPages: brandsResponse?.paginationResult?.numberOfPages || 1,
                            totalItems: brandsResponse?.results || 0,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                        itemLabel="brands"
                        className="rounded-3xl"
                    />
                )}
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-0 border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                            <DialogTitle className="text-2xl font-black">{isEditing ? "Update Brand" : "New Brand Registration"}</DialogTitle>
                            <DialogDescription>
                                Set official brand identity details and web address.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Brand Name</Label>
                                <Input id="name" {...register("name")} className="h-12 rounded-xl bg-zinc-50 border-none px-4" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-100 dark:border-zinc-800">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12">Cancel</Button>
                            <Button type="submit" disabled={createBrandMutation.isPending || updateBrandMutation.isPending} className="rounded-xl h-12 px-8 font-black">
                                {createBrandMutation.isPending || updateBrandMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Save Brand Info" : "Register Brand")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

