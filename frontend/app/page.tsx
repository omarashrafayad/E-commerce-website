"use client"
import Hero from "../components/features/Hero";
import FeaturedCategories from "../components/features/FeaturedCategories";
import FeaturedProducts from "../components/features/FeaturedProducts";
import BenefitsSection from "../components/features/BenefitsSection";
import Testimonials from "../components/features/Testimonials";
import NewCollections from "../components/features/NewCollections";
import { useHome } from "@/hooks/useHome";

export default function Home() {
  const { data, isPending, error } = useHome();

  
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeaturedCategories categories={data?.shopByCategory || []} isPending={isPending} error={error}  />
      <NewCollections products={data?.newCollections || []} isPending={isPending} error={error} />
      <FeaturedProducts products={data?.trendingNow || []} isPending={isPending} error={error} />
      <BenefitsSection />
      <Testimonials />
    </div>
  );
}
