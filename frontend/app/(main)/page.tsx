"use client";

import Hero from "@/features/main/home/components/Hero";
import FeaturedCategories from "@/features/main/home/components/FeaturedCategories";
import FeaturedProducts from "@/features/main/home/components/FeaturedProducts";
import BenefitsSection from "@/features/main/home/components/BenefitsSection";
import Testimonials from "@/features/main/home/components/Testimonials";
import NewCollections from "@/features/main/home/components/NewCollections";
import { useHome } from "@/features/main/home/hooks/useHome";

export default function Home() {
  const { data, isPending, error } = useHome();
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeaturedCategories categories={data?.shopByCategory || []} isPending={isPending} error={error} />
      <NewCollections products={data?.newCollections || []} isPending={isPending} error={error} />
      <FeaturedProducts products={data?.trendingNow || []} isPending={isPending} error={error} />
      <BenefitsSection />
      <Testimonials />
    </div>
  );
}

