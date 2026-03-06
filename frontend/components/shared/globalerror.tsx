import Link from "next/link";
import ScrollReveal from "../ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export default function GlobalError({ error }: GlobalErrorProps) {
    return (
        <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="left">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                New Collections
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Fresh styles dropped this week.
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="hidden sm:flex items-center gap-1 text-primary hover:text-indigo-500 transition-colors font-medium"
                        >
                            View all <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </ScrollReveal>
                <div className="text-center text-red-500">Error: {error.message}</div>
            </div>
        </section>
    );
}
