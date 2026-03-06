import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Category } from "@/features/main/home/types/home.types";
import SkeletonGrid from "@/components/shared/SkeletonGrid";
import GlobalError from "@/components/shared/globalerror";

interface Props {
  categories: Category[];
  isPending: boolean;
  error: Error | null;
}

export default function ShopByCategory({ categories, isPending, error }: Props) {
  if (error) {
    return <GlobalError error = {error}/>
  }
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="left">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Shop by Category</h2>
              <p className="mt-2 text-muted-foreground">Browse our curated collections.</p>
            </div>
            <Link href="/categories" className="hidden sm:flex items-center gap-1 text-primary hover:text-indigo-500 transition-colors font-medium">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

        {isPending ? (
          <SkeletonGrid count={3} type="category" />
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {categories.map((category, index) => (
              <ScrollReveal key={category._id} direction="up" delay={index * 0.2}>
                <Link href={`/shop?category=${category.name}`} className="group relative overflow-hidden rounded-lg block h-full">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:opacity-75 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                      <span className="text-sm text-zinc-200">Shop Now</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}


        <div className="mt-8 text-center sm:hidden">
          <Link href="/categories" className="text-primary font-medium">
            View all categories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

