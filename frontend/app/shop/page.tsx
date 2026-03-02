"use client";

import { useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import ShopFilters from "../../components/features/ShopFilters";
import MobileFilterSheet from "../../components/ui/MobileFilterSheet";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import SkeletonGrid from "@/components/ui/SkeletonGrid";
import EmptyState from "@/components/ui/EmptyState";
import { SearchX } from "lucide-react";
import { Product } from "@/types/product.types";

export default function Shop() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();
  const [sort, setSort] = useState<string | undefined>();
  const [rating, setRating] = useState<number | undefined>();

  const handleCategoryChange = (newCategory: string | undefined) => {
    setCategory(newCategory);
    setPage(1);
  };
  const handleRatingChange = (newRating: number | undefined) => {
    setRating(newRating);
    setPage(1);
  };

  const clearFilters = () => {
    setCategory(undefined);
    setRating(undefined);
    setSort(undefined);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  const { data, isLoading } = useProducts({
    page,
    limit: 6,
    category,
    sort,
    ratingsAverage: rating ? { gte: rating } : undefined,
  });

  const products = data?.data || [];
  const pagination = data?.paginationResult;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col gap-8 pb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Shop All Products
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <ShopFilters
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            selectedRating={rating}
            onRatingChange={handleRatingChange}
          />
        </aside>

        <MobileFilterSheet
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
        >
          <ShopFilters
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            selectedRating={rating}
            onRatingChange={handleRatingChange}
          />
        </MobileFilterSheet>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border pb-6 mb-6">
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 text-sm font-medium bg-accent/50 px-3 py-2 rounded-md"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
            </div>

            <p className="hidden sm:block text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {products.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {pagination?.numberOfPages * 6 || 0}
              </span>{" "}
              results
            </p>

            <select
              onChange={handleSortChange}
              className="text-sm font-medium bg-transparent outline-none"
            >
              <option value="">Most Popular</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>

          {isLoading ? (
            <SkeletonGrid 
              count={6} 
              type="product" 
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
            />
          ) : products.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No products found"
              description="We couldn't find any products matching your current filters. Try adjusting them or clear all filters."
              actionLabel="Clear all filters"
              onAction={clearFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      id: product._id,
                      name: product.title,
                      price: product.price,
                      originalPrice: product.priceAfterDiscount,
                      rating: product.ratingsAverage,
                      brand: product.category?.name || "Brand",
                      imageSrc: product.imageCover,
                      isNew: product.new,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center mt-12 gap-2">
                <button
                  disabled={!pagination?.prev}
                  onClick={() => setPage((p) => p - 1)}
                  className={`p-2 border rounded-md transition-colors ${
                    !pagination?.prev
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent"
                  }`}
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="hidden sm:flex gap-1">
                  {Array.from(
                    { length: pagination?.numberOfPages || 1 },
                    (_, i) => i + 1
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <span className="text-sm font-medium sm:hidden">
                  Page {page} of {pagination?.numberOfPages || 1}
                </span>

                <button
                  disabled={!pagination?.next}
                  onClick={() => setPage((p) => p + 1)}
                  className={`p-2 border rounded-md transition-colors ${
                    !pagination?.next
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent"
                  }`}
                  aria-label="Next"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
