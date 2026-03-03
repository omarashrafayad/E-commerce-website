"use client";

import {
    BarChart3,
    Users,
    ShoppingBag,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    Package,
    Eye,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { motion } from "motion/react";
import UniTable from "@/components/shared/UniTable";
import { Button } from "@/components/ui/button";

const STATS = [
    {
        label: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1%",
        trend: "up",
        icon: DollarSign,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
        label: "Active Orders",
        value: "+2350",
        change: "+180.1%",
        trend: "up",
        icon: ShoppingBag,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        label: "Sales Count",
        value: "+12,234",
        change: "+19%",
        trend: "up",
        icon: BarChart3,
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-950/30"
    },
    {
        label: "Active Users",
        value: "+573",
        change: "-4.5%",
        trend: "down",
        icon: Users,
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-50 dark:bg-orange-950/30"
    },
];

const RECENT_ORDERS = [
    { id: "ORD-7321", customer: "Amr Ahmed", product: "Glow Skin Serum", date: "2 mins ago", amount: "$59.00", status: "Completed" },
    { id: "ORD-7322", customer: "Sarah Mohamed", product: "Moisturizing Cream", date: "5 mins ago", amount: "$89.00", status: "Processing" },
    { id: "ORD-7323", customer: "Khaled Ali", product: "Sunscreen SPF 50", date: "12 mins ago", amount: "$45.00", status: "Pending" },
    { id: "ORD-7324", customer: "Mona Hassan", product: "Cleaning Milk", date: "24 mins ago", amount: "$32.00", status: "Completed" },
    { id: "ORD-7325", customer: "Tarek Ibrahim", product: "Eye Rescue Gel", date: "1 hour ago", amount: "$78.00", status: "Shipped" },
];

const COLUMNS = [
    { id: "id", header: "Order ID", accessorKey: "id", className: "font-mono font-medium text-primary" },
    { id: "customer", header: "Customer", accessorKey: "customer", className: "font-medium" },
    { id: "product", header: "Product", accessorKey: "product" },
    { id: "date", header: "Date", accessorKey: "date", className: "text-zinc-500" },
    { id: "amount", header: "Amount", accessorKey: "amount", className: "font-semibold" },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (value: any) => (
            <span className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider",
                value === "Completed" ? "bg-emerald-100 text-emerald-700" :
                    value === "Processing" ? "bg-blue-100 text-blue-700" :
                        value === "Shipped" ? "bg-violet-100 text-violet-700" :
                            "bg-orange-100 text-orange-700"
            )}>
                {value}
            </span>
        )
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Dashboard Overview</h2>
                <p className="text-zinc-500">Welcome back, Mostafa! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn("p-3 rounded-xl transition-colors duration-300", stat.bg)}>
                                        <stat.icon className={cn("size-6", stat.color)} />
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                        stat.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"
                                    )}>
                                        {stat.trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-500 mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{stat.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Main Chart Placeholder */}
                <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-zinc-900 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <CardTitle className="text-xl font-bold mb-1">Sales Performance</CardTitle>
                            <CardDescription>Visualizing revenue growth over the last 7 days</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl px-4 h-9">Weekly</Button>
                            <Button size="sm" className="rounded-xl px-4 h-9">Monthly</Button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full bg-linear-to-b from-zinc-50 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden group">
                        {/* Simple mock chart bars */}
                        <div className="flex items-end gap-4 h-1/2">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                                    className="w-8 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative group"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        ${h * 123}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="absolute bottom-6 text-xs text-zinc-400 font-medium">Interactive Chart Visual (Coming Soon)</p>
                    </div>
                </Card>

                {/* Sidebar Activity */}
                <Card className="lg:col-span-3 border-none shadow-sm bg-white dark:bg-zinc-900 rounded-3xl p-8 overflow-hidden">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
                        <CardDescription>Track latest updates and changes</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-6">
                            {[
                                { icon: CheckCircle2, title: "New order #8921", time: "2 mins ago", desc: "Mostafa Badr bought Glow Skin Serum", color: "text-emerald-500", bg: "bg-emerald-50" },
                                { icon: Package, title: "Product Stock Warning", time: "15 mins ago", desc: "Moisturizing Cream is running low (5 left)", color: "text-red-500", bg: "bg-red-50" },
                                { icon: Users, title: "New user registered", time: "1 hour ago", desc: "Sarah Mohamed joined the community", color: "text-blue-500", bg: "bg-blue-50" },
                                { icon: Clock, title: "System Update", time: "5 hours ago", desc: "Successfully upgraded to Version 2.4.0", color: "text-zinc-500", bg: "bg-zinc-100" },
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== 3 && <div className="absolute left-5 top-10 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800" />}
                                    <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0 z-10", activity.bg)}>
                                        <activity.icon className={activity.color} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{activity.title}</h4>
                                        <p className="text-xs text-zinc-500 mt-0.5">{activity.desc}</p>
                                        <span className="text-[10px] text-zinc-400 font-medium mt-1 inline-block uppercase tracking-wider">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-8 rounded-xl border-zinc-200 font-semibold">View All Activities</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Table */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight">Recent Orders</h3>
                        <p className="text-zinc-500">Fast overview of the latest transactions</p>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-xl px-4 flex gap-2">
                        <Eye className="size-4" /> View All Orders
                    </Button>
                </div>

                <UniTable
                    data={RECENT_ORDERS}
                    columns={COLUMNS}
                    className="rounded-3xl"
                />
            </div>
        </div>
    );
}
