"use client";

import { Star } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const testimonials = [
    {
        id: 1,
        content: "The quality of the clothes is absolutely amazing. I've never felt fabric this comfortable before. Highly recommended!",
        author: "Sarah Johnson",
        role: "Fashion Blogger",
        rating: 5,
        avatar: "S"
    },
    {
        id: 2,
        content: "Fast shipping and excellent customer service. This app has changed how I shop for groceries and essentials.",
        author: "Michael Chen",
        role: "Verified Buyer",
        rating: 5,
        avatar: "M"
    },
    {
        id: 3,
        content: "The best online shopping experience I've had. The 3D view of products is a game changer for online retail.",
        author: "Emma Davis",
        role: "Interior Designer",
        rating: 4,
        avatar: "E"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 overflow-hidden bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal direction="left">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                            What Our Customers Say
                        </h2>
                        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
                            Don't just take our word for it. Read reviews from satisfied customers.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <ScrollReveal key={testimonial.id} direction="up" delay={index * 0.2}>
                            <div
                                className="flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-indigo-500/50 transition-all hover:shadow-lg dark:hover:shadow-indigo-500/10"
                            >
                                <div className="flex gap-x-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${i < testimonial.rating ? "fill-current" : "text-zinc-300 dark:text-zinc-700 fill-none"}`}
                                        />
                                    ))}
                                </div>

                                <blockquote className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    "{testimonial.content}"
                                </blockquote>

                                <div className="mt-8 flex items-center gap-x-4">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-zinc-900 dark:text-white">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-zinc-500 dark:text-zinc-500 text-sm">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
