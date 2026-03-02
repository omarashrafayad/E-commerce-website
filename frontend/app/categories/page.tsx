"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import SkeletonGrid from "@/components/ui/SkeletonGrid";
import { Category } from "@/types/home.types";

export default function Categories() {
    const { data: categoriesData, isLoading } = useCategories();
    const categories = categoriesData?.data || [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Browse Categories</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Explore our wide range of products across various categories. Find exactly what you are looking for.
                </p>
            </div>

            {isLoading ? (
                <SkeletonGrid 
                    count={6} 
                    type="category" 
                    variant="stacked"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category: Category) => (
                        <Link 
                            key={category._id} 
                            href={`/shop?category=${category._id}`} 
                            className="group relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-border transition-all hover:shadow-lg"
                        >
                            <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-200">
                                <img
                                    src={category.image || "https://images.unsplash.com/photo-1498049381145-06f402a5cf73?auto=format&fit=crop&q=80&w=600"}
                                    alt={category.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    {/* {category.productsCount && (
                                         <span className="text-xs font-medium bg-white/90 dark:bg-black/50 backdrop-blur px-2 py-1 rounded-full text-foreground border border-black/5 dark:border-white/10">
                                            {category.productsCount} Products
                                        </span>
                                    )} */}
                                </div>

                                {/* <p className="text-muted-foreground text-sm mb-4">
                                    {category.description || "Explore products in this category."}
                                </p> */}
                                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                    Shop Now <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
