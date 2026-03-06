"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ShoppingBag, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] pb-16 pt-16 md:pt-24 lg:pb-32 xl:pb-36 min-h-[600px] flex items-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-40"></div>
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-40"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="text-center lg:text-left space-y-8">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm mb-6 backdrop-blur-sm">
                                #1 E-Commerce Platform
                            </span>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
                                <span className="block text-indigo-400">Online Store</span>
                                Shop Mobile Application
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-indigo-100/80 max-w-xl mx-auto lg:mx-0">
                                Experience the future of internet shopping.
                                Groceries, Electronics, and fashion at your fingertips with our 24-hour service.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-yellow-500/20 rounded-full">
                                    <Clock className="size-5 text-yellow-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-indigo-200 font-medium">Service</p>
                                    <p className="text-sm font-semibold text-white">24 Hour Support</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-green-500/20 rounded-full">
                                    <ShoppingBag className="size-5 text-green-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-indigo-200 font-medium">Shopping</p>
                                    <p className="text-sm font-semibold text-white">Online Ordering</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-pink-500/20 rounded-full">
                                    <Zap className="size-5 text-pink-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-indigo-200 font-medium">Delivery</p>
                                    <p className="text-sm font-semibold text-white">Fast & Secure</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link
                                href="/shop"
                                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Start Shopping <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="/about"
                                className="w-full sm:w-auto px-8 py-4 rounded-full border border-indigo-400/30 text-sm font-semibold text-white hover:bg-white/5 hover:border-indigo-400/50 transition-all flex items-center justify-center"
                            >
                                View Catalog
                            </Link>
                        </div>
                    </div>

                    <div className="relative transform lg:translate-x-10">
                        <div className="relative mx-auto max-w-[500px] lg:max-w-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

                            <Image
                                src="/hero-3d-removebg-preview.png"
                                alt="E-commerce Mobile Experience" 
                                width={800}
                                height={800}
                                priority
                                className="relative z-10 w-full h-auto drop-shadow-2xl animate-[float_6s_ease-in-out_infinite] max-md:hidden"
                            />
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl animate-bounce delay-700"></div>
                            <div className="absolute bottom-10 -left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-xl animate-bounce delay-1000"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </section>
    );
}
