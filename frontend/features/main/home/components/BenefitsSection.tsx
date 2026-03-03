import { Truck, ShieldCheck, Headphones, RefreshCw } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const benefits = [
    {
        icon: Truck,
        title: "Fast & Free Shipping",
        description: "Free shipping on all orders over $100. Fast delivery to your doorstep."
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "Your payment information is handled with the highest security standards."
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Dedicated support team available 24/7 to assist you with any queries."
    },
    {
        icon: RefreshCw,
        title: "Easy Returns",
        description: "Not satisfied? Return your purchase within 30 days for a full refund."
    }
];

export default function BenefitsSection() {
    return (
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="left">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                            Why Choose Us
                        </h2>
                        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
                            We provide the best experience for our customers.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                        <ScrollReveal key={index} direction="up" delay={index * 0.2}>
                            <div
                                className="relative flex flex-col items-center p-6 text-center bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                                    <benefit.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                    {benefit.title}
                                </h3>
                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    {benefit.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
