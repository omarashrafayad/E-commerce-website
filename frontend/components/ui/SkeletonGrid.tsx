"use client";

import { motion } from "framer-motion";

interface SkeletonGridProps {
  count: number;
  className?: string;
  itemClassName?: string;
  type?: "category" | "product";
  variant?: "overlay" | "stacked";
}

export default function SkeletonGrid({ 
  count, 
  className = "grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8",
  itemClassName = "",
  type = "category",
  variant = "overlay"
}: SkeletonGridProps) {
  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className={`animate-pulse ${itemClassName}`}
        >
          {type === "category" ? (
            variant === "overlay" ? (
              <div className="aspect-[4/3] w-full bg-muted rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 space-y-2">
                  <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
                  <div className="h-4 w-20 bg-muted-foreground/10 rounded" />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border overflow-hidden bg-muted/30">
                <div className="aspect-[16/9] w-full bg-muted relative" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
                    <div className="h-6 w-16 bg-muted-foreground/10 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
                  </div>
                  <div className="h-4 w-24 bg-primary/20 rounded" />
                </div>
              </div>
            )
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-square w-full bg-muted relative">
                 <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                     <div className="h-10 flex-1 bg-muted-foreground/10 rounded-md" />
                     <div className="h-10 w-10 bg-muted-foreground/10 rounded-md" />
                 </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-muted-foreground/20 rounded" />
                  <div className="h-4 w-10 bg-muted-foreground/20 rounded" />
                </div>
                <div className="h-6 w-full bg-muted-foreground/20 rounded" />
                <div className="h-6 w-24 bg-muted-foreground/20 rounded" />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
