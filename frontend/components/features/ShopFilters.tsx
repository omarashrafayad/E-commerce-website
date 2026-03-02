"use client";

import { Star } from 'lucide-react';
import { useCategories } from "@/hooks/useCategories";
import { Spinner } from '../ui/spinner';
import { Category } from '@/types/home.types';

interface ShopFiltersProps {
  onCategoryChange: (category: string | undefined) => void;
  selectedCategory?: string;
  selectedRating?: number;
  onRatingChange: (rating: number | undefined) => void;
}

export default function ShopFilters({
  onCategoryChange,
  selectedCategory,
  selectedRating,
  onRatingChange,
}: ShopFiltersProps) {
    const { data: categoriesData, isLoading } = useCategories();
    const categories = categoriesData?.data || [];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                    Categories
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            id="category-all"
                            name="category"
                            type="checkbox"
                            checked={selectedCategory === undefined}
                            onChange={() => onCategoryChange(undefined)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                            htmlFor="category-all"
                            className="ml-3 text-sm text-zinc-600 dark:text-zinc-400 flex flex-1 justify-between cursor-pointer"
                        >
                            All Categories
                        </label>
                    </div>
                    {isLoading ? (
                        <div className="text-sm text-muted-foreground">
                            <Spinner/>
                        </div>
                    ) : (
                        categories.map((category: Category) => (
                            <div key={category._id} className="flex items-center">
                                <input
                                    id={`category-${category._id}`}
                                    name="category"
                                    type="checkbox"
                                    checked={selectedCategory === category._id}
                                    onChange={() => onCategoryChange(category._id)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                    htmlFor={`category-${category._id}`}
                                    className="ml-3 text-sm text-zinc-600 dark:text-zinc-400 flex flex-1 justify-between cursor-pointer"
                                >
                                    {category.name}
                                </label>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Rating */}
            <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                    Rating
                </h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <input
                                id={`rating-${rating}`}
                                name="rating"
                                value={rating}
                                type="checkbox"
                                checked={selectedRating === rating}
                                onChange={() => onRatingChange(selectedRating === rating ? undefined : rating)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`rating-${rating}`} className="ml-3 text-sm flex items-center gap-1 cursor-pointer">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-3 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
                                    />
                                ))}
                                <span className="ml-1 text-zinc-500 text-xs dark:text-zinc-400">& Up</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
