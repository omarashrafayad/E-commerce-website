"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SkeletonGrid from "@/components/shared/SkeletonGrid";
import { Category } from "@/features/main/home/types/home.types";
import PageHeader from "@/components/shared/PageHeader";
import { useCategories } from "@/features/dashboard/categories/hooks/useCategories";

export default function Categories() {
    const { data: categoriesData, isLoading } = useCategories();
    const categories = categoriesData?.data || [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <PageHeader
                    title="Browse Categories"
                    description="Explore our wide range of products across various categories. Find exactly what you are looking for."
                />
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
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-200">
                                <Image
                                    src={category.image || "https://images.unsplash.com/photo-1498049381145-06f402a5cf73?auto=format&fit=crop&q=80&w=600"}
                                    alt={category.name}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                </div>
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

