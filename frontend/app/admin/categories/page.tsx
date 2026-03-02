"use client";

import { useState } from "react";
import {
    Layers,
    Plus,
    Search,
    Pencil,
    Trash2,
    Loader2,
    Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UniTable, { ActionCell, ActionButton, ProductCell } from "@/components/shared/UniTable";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useCategories";
import { toast } from "sonner";

const categoryFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

export default function CategoriesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories({
        page: currentPage,
        limit
    });
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();
    const deleteCategoryMutation = useDeleteCategory();

    const categories = categoriesResponse?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (category: any) => {
        setIsEditing(true);
        setCurrentCategory(category);
        reset({ name: category.name });
        setImageFile(null);
        // If category has an existing image, we could show it as preview
        setImagePreview(category.image ? category.image : null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategoryMutation.mutateAsync(id);
                toast.success("Category deleted successfully");
            } catch (error) {
                toast.error("Failed to delete category");
            }
        }
    };

    const onSubmit = async (data: CategoryFormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (isEditing && currentCategory) {
                await updateCategoryMutation.mutateAsync({ id: currentCategory._id, data: formData });
                toast.success("Category updated successfully");
            } else {
                await createCategoryMutation.mutateAsync(formData);
                toast.success("Category created successfully");
            }
            setIsDialogOpen(false);
            reset();
            setImageFile(null);
            setImagePreview(null);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleOpenDialog = () => {
        setIsEditing(false);
        setCurrentCategory(null);
        setImageFile(null);
        setImagePreview(null);
        reset({ name: "" });
        setIsDialogOpen(true);
    };

    const COLUMNS = [
        {
            id: "name",
            header: "Category Identity",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.name}
                    subtitle={row.slug}
                    image={row.image}
                    imageSize="h-12 w-12"
                    className="gap-4"
                />
            ),
            className: "min-w-[250px]"
        },
        { id: "products", header: "Inventory Count", accessorKey: "products", className: "text-zinc-600 font-bold" },
        {
            id: "status",
            header: "Presence",
            cell: (value: any, row: any) => (
                <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    row.active !== false ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                )}>
                    {row.active !== false ? "Active" : "Hidden"}
                </span>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => handleDelete(row._id)} />
                </ActionCell>
            ),
            headerClassName: "justify-center text-center",
            className: "justify-center text-center"
        }
    ];

    const filteredCategories = categories.filter((c: any) =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <Layers className="size-4" />
                        <span>Taxonomy</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Product Categories</h2>
                    <p className="text-zinc-500">Group your products for better store organization.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleOpenDialog} className="rounded-xl px-5 h-11 shadow-lg shadow-primary/20 cursor-pointer">
                        <Plus className="size-5 mr-2" /> Add Category
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {isCategoriesLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200">
                        <Loader2 className="size-10 text-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Loading classifications...</p>
                    </div>
                ) : (
                    <UniTable
                        data={filteredCategories}
                        columns={COLUMNS}
                        enablePagination={true}
                        pageSize={limit}
                        serverPagination={{
                            currentPage,
                            totalPages: categoriesResponse?.paginationResult?.numberOfPages || 1,
                            totalItems: categoriesResponse?.results || 0,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                        itemLabel="categories"
                        className="rounded-3xl"
                    />
                )}
            </motion.div>

            {/* Add/Edit Category Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-0 border-none bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800">
                            <DialogTitle className="text-2xl font-black">{isEditing ? "Edit Category" : "New Classification"}</DialogTitle>
                            <DialogDescription>
                                Set the name and appearance for this classification.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-4">
                                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Category Visual</Label>
                                <div className="flex flex-col items-center">
                                    <div
                                        onClick={() => document.getElementById('category-image')?.click()}
                                        className="relative group cursor-pointer"
                                    >
                                        <div className="size-32 rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-primary transition-all duration-300">
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview.startsWith('data:') ? imagePreview : (currentCategory?.image ? (currentCategory.image.startsWith('http') ? currentCategory.image : `http://localhost:5000/uploads/categories/${currentCategory.image}`) : imagePreview)}
                                                    alt="Preview"
                                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-zinc-400 group-hover:text-primary transition-colors">
                                                    <Camera className="size-8" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">Upload Image</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Plus className="size-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        id="category-image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <p className="text-[10px] text-zinc-400 mt-3 text-center">
                                        PNG, JPG or WebP. Max 2MB.<br />Recommended size: 512x512px.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Category Name</Label>
                                <Input id="name" {...register("name")} placeholder="e.g. Smartphones, Clothing..." className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none px-4" />
                                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 cursor-pointer">Cancel</Button>
                            <Button type="submit" disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending} className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20 cursor-pointer">
                                {createCategoryMutation.isPending || updateCategoryMutation.isPending ? <Loader2 className="animate-spin" /> : (isEditing ? "Update Category" : "Create Category")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
