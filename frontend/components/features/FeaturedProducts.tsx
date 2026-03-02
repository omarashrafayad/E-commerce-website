import ProductCard from "../ui/ProductCard";
import ScrollReveal from "../ui/ScrollReveal";
import { Product } from "@/types/home.types";
import SkeletonGrid from "../ui/SkeletonGrid";

interface Props {
  products: Product[];
  isPending: boolean;
  error: Error | null;
}

export default function TrendingNow({ products, isPending, error }: Props) {
  if (error) {
    return (
      <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="left">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trending Now</h2>
                <p className="mt-2 text-muted-foreground">The most popular items this week.</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="text-center text-red-500">Error: {error.message}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="left">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trending Now</h2>
              <p className="mt-2 text-muted-foreground">The most popular items this week.</p>
            </div>
          </div>
        </ScrollReveal>

        {isPending ? (
          <SkeletonGrid 
            count={4} 
            type="product" 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" 
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(products || []).map((product, index) => (
              <ScrollReveal key={product._id} direction="up" delay={index * 0.1}>
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
      </div>
    </section>
  );
}
