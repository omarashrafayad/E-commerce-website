"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Package,
    Users,
    ShoppingBag,
    LayoutDashboard,
    Settings,
    Layers,
    Tag,
    LogOut,
    Bell,
    Search,
    Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useAuthStore } from "@/stores/useAuthStore";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Products", icon: Package, href: "/dashboard/products" },
    { label: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { label: "Users", icon: Users, href: "/dashboard/users" },
    { label: "Categories", icon: Layers, href: "/dashboard/categories" },
    { label: "Brands", icon: Tag, href: "/dashboard/brands" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-zinc-950 font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-50 hidden lg:block overflow-y-auto">
                <div className="flex h-20 items-center px-8 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <ShoppingBag className="size-6" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                            Glow Admin
                        </span>
                    </div>
                </div>

                <div className="flex flex-col p-6 gap-8">
                    <div>
                        <p className="px-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4">
                            Main Menu
                        </p>
                        <nav className="flex flex-col gap-1.5">
                            {NAV_ITEMS.slice(0, 6).map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/10"
                                                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn("size-5", isActive ? "text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-primary")} />
                                            {item.label}
                                        </div>
                                        {isActive && (
                                            <motion.div layoutId="sidebar-active" className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">
                            System
                        </p>
                        <nav className="flex flex-col gap-1.5">
                           
                            <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 cursor-pointer">
                                <LogOut className="size-5" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-auto p-6">
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{user?.name}</span>
                                <span className="text-[10px] text-zinc-500">{user?.role}</span>
                            </div>
                        </div>
                        <Link href="/profile">
                        <Button variant="outline" size="sm" className="w-full rounded-lg cursor-pointer h-9 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                            View Profile
                        </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72 flex-1 flex flex-col">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 h-20 px-4 md:px-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="size-6" />
                        </Button>
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 h-11 w-11">
                            <Bell className="size-5 text-zinc-600 dark:text-zinc-400" />
                            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950" />
                        </Button>

                        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

                        <div className="flex items-center gap-3 pl-2">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user?.name}</span>
                                <span className="text-[10px] text-zinc-500 font-medium">Dashboard Access</span>
                            </div>
                            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

