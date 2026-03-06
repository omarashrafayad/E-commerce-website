import ScrollReveal from "@/components/ui/ScrollReveal";
import { Product } from "@/features/main/home/types/home.types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkeletonGrid from "@/components/shared/SkeletonGrid";
import ProductCard from "@/features/main/shop/components/ProductCard";
import GlobalError from "@/components/shared/globalerror";

interface Props {
  products: Product[];
  isPending: boolean;
  error: Error | null;
}

export default function NewCollections({ products, isPending, error }: Props) {
  if (error) {
    return <GlobalError error = {error}/>
  }
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="left">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">New Collections</h2>
              <p className="mt-2 text-muted-foreground">Fresh styles dropped this week.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-primary hover:text-indigo-500 transition-colors font-medium">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

        {isPending ? (
          <SkeletonGrid count={3} type="product" />
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product, index) => (
              <ScrollReveal key={product._id} direction="up" delay={index * 0.2}>
                <ProductCard product={{
                  id: product._id,
                  name: product.title,
                  price: product.priceAfterDiscount || product.price,
                  originalPrice: product.priceAfterDiscount ? product.price : undefined,
                  discount: product.priceAfterDiscount ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100) : 0,
                  rating: product.ratingsAverage,
                  brand: product.category.name,
                  isNew: product.new,
                  imageSrc: product.imageCover,
                }} />
              </ScrollReveal>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="text-primary font-medium flex items-center justify-center gap-1">
            View all collections <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

