"use client";

import { useState, useEffect } from "react";
import {
    Package,
    Plus,
    Search,
    Filter,
    Pencil,
    Trash2,
    Eye,
    Download,
    AlertCircle,
    X,
    Camera,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UniTable, { ProductCell, ActionCell, ActionButton } from "@/components/shared/UniTable";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/features/main/shop/schemas/product.schema";
import { useAllProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/features/main/shop/hooks/useProducts";
import { useCategories } from "@/features/main/shop/hooks/useCategories";
import { toast } from "sonner";

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Data Fetching
    const { data: productsResponse, isLoading: isProductsLoading } = useAllProducts({
        page: currentPage,
        limit
    });
    const { data: categoriesResponse } = useCategories();

    // Mutations
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();

    const products = productsResponse?.data || [];
    const categories = categoriesResponse?.data || [];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            quantity: 0,
            price: 0,
            category: ""
        }
    });

    const selectedCategory = watch("category");

    const handleEdit = (product: any) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setPreview(product.imageCover);
        reset({
            title: product.title,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            priceAfterDiscount: product.priceAfterDiscount,
            category: typeof product.category === 'object' ? product.category._id : product.category,
            brand: product.brand,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProductMutation.mutateAsync(productId);
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    // Handle Create/Update
    const onSubmit = async (data: ProductFormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'imageCover') {
                if (value?.[0]) {
                    formData.append('imageCover', value[0]);
                }
            } else if (key === 'images') {
                if (value?.length) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append('images', value[i]);
                    }
                }
            } else if (value !== undefined && value !== null && value !== "") {
                formData.append(key, String(value));
            }
        });

        try {
            if (isEditing && currentProduct) {
                await updateProductMutation.mutateAsync({ productId: currentProduct._id, data: formData });
                toast.success("Product updated successfully");
            } else {
                await createProductMutation.mutateAsync(formData);
                toast.success("Product created successfully");
            }
            setIsDialogOpen(false);
            reset();
            setPreview(null);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleOpenDialog = () => {
        setIsEditing(false);
        setCurrentProduct(null);
        setPreview(null);
        reset({
            title: "",
            description: "",
            quantity: 0,
            price: 0,
            category: ""
        });
        setIsDialogOpen(true);
    };

    const COLUMNS = [
        {
            id: "name",
            header: "Product",
            cell: (value: any, row: any) => (
                <ProductCell
                    title={row.title}
                    subtitle={row._id}
                    image={row.imageCover}
                    imageSize="h-12 w-12"
                />
            ),
            className: "min-w-[280px]"
        },
        {
            id: "category",
            header: "Category",
            cell: (value: any, row: any) => (
                <span className="text-zinc-600 font-medium">
                    {row.category?.name || (typeof row.category === 'string' ? row.category : "N/A")}
                </span>
            )
        },
        { id: "price", header: "Price", cell: (val: any, row: any) => <span className="font-bold">${row.price}</span> },
        { id: "stock", header: "Stock", accessorKey: "quantity", className: "font-medium" },
        {
            id: "status",
            header: "Status",
            cell: (value: any, row: any) => {
                const status = row.quantity > 10 ? "Active" : row.quantity > 0 ? "Low Stock" : "Out of Stock";
                return (
                    <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        status === "Active" ? "bg-emerald-100 text-emerald-700" :
                            status === "Low Stock" ? "bg-orange-100 text-orange-700" :
                                "bg-red-100 text-red-700"
                    )}>
                        {status}
                    </span>
                );
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: (value: any, row: any) => (
                <ActionCell>
                    {/* <ActionButton icon={Eye} onClick={() => console.log("View", row._id)} /> */}
                    <ActionButton icon={Pencil} onClick={() => handleEdit(row)} />
                    <ActionButton icon={Trash2} variant="danger" onClick={() => handleDelete(row._id)} />
                </ActionCell>
            ),
            headerClassName: "justify-center text-center",
            className: "justify-center text-center"
        }
    ];

    const filteredProducts = products.filter((p: any) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p._id?.includes(searchTerm)
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <Package className="size-4" />
                        <span>Inventory Management</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Products Catalog</h2>
                    <p className="text-zinc-500">Manage your product listings, stock levels, and pricing.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl px-4 h-11 border-zinc-200">
                        <Download className="size-4 mr-2" /> Export CSV
                    </Button>
                    <Button onClick={handleOpenDialog} className="rounded-xl px-5 h-11 shadow-lg shadow-primary/20">
                        <Plus className="size-5 mr-2" /> Add New Product
                    </Button>
                </div>
            </div>

            {/* Filters & Search */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm"
            >
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name, ID or SKU..."
                        className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl px-4 h-11 border-zinc-200 group">
                        <Filter className="size-5 mr-2 text-zinc-400 group-hover:text-primary" /> Filter
                    </Button>
                    <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
                    <p className="text-sm font-medium text-zinc-500 hidden lg:block">Total {productsResponse?.results || 0} items</p>
                </div>
            </motion.div>

            {/* Products Table */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {isProductsLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200">
                        <Loader2 className="size-10 text-primary animate-spin mb-4" />
                        <p className="text-zinc-500 font-medium">Loading inventory...</p>
                    </div>
                ) : (
                    <UniTable
                        data={filteredProducts}
                        columns={COLUMNS}
                        enablePagination={true}
                        pageSize={limit}
                        serverPagination={{
                            currentPage,
                            totalPages: productsResponse?.paginationResult?.numberOfPages || 1,
                            totalItems: productsResponse?.results || 0,
                            onPageChange: (page) => setCurrentPage(page)
                        }}
                        itemLabel="products"
                        className="rounded-3xl"
                    />
                )}
            </motion.div>

            {/* Add/Edit Product Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit) as any} className="flex flex-col">
                        <DialogHeader className="p-8 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl z-10">
                            <DialogTitle className="text-2xl font-black text-zinc-900 dark:text-white">
                                {isEditing ? "Edit Product Details" : "Create New Product"}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-500 font-medium">
                                Fill in the details below to {isEditing ? "update the existing" : "add a new"} product to your inventory.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-8">
                            {/* Image Covering */}
                            <div className="flex flex-col items-center gap-4">
                                <Label className="text-sm font-bold uppercase tracking-widest text-zinc-400 self-start">Image Cover</Label>
                                <div className="relative group size-48 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all hover:border-primary/50">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-zinc-400">
                                            <Camera className="size-10" />
                                            <span className="text-xs font-bold">Upload Cover</span>
                                        </div>
                                    )}
                                    <Label htmlFor="imageCover" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="text-white size-8" />
                                    </Label>
                                    <Input
                                        id="imageCover"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        {...register("imageCover", {
                                            onChange: (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setPreview(URL.createObjectURL(file));
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Title</Label>
                                    <Input id="title" {...register("title")} className="h-12 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20" />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</Label>
                                    <Select
                                        onValueChange={(val) => setValue("category", val)}
                                        value={watch("category")}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat: any) => (
                                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Price ($)</Label>
                                    <Input id="price" type="number" step="0.01" {...register("price")} className="h-12 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20" />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Stock Quantity</Label>
                                    <Input id="quantity" type="number" {...register("quantity")} className="h-12 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20" />
                                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Description</Label>
                                <Textarea id="description" {...register("description")} className="min-h-[120px] rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 p-4" />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>
                        </div>

                        <DialogFooter className="p-8 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 backdrop-blur-xl sticky bottom-0 z-10">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold">Cancel</Button>
                            <Button
                                type="submit"
                                disabled={createProductMutation.isPending || updateProductMutation.isPending}
                                className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20"
                            >
                                {createProductMutation.isPending || updateProductMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    isEditing ? "Save Product Changes" : "Create Product"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

