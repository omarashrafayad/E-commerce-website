
import React from 'react';
import { Tag, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface CouponCardProps {
    code: string;
    discount: string;
    description: string;
    expiryDate: string;
    color?: "blue" | "purple" | "green" | "orange";
}

export default function CouponCard({ code, discount, description, expiryDate, color = "blue" }: CouponCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const colors = {
        blue: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
        purple: "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-100",
        green: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100",
        orange: "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-100",
    };

    const btnColors = {
        blue: "text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/40",
        purple: "text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/40",
        green: "text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/40",
        orange: "text-orange-600 hover:bg-orange-100 dark:text-orange-400 dark:hover:bg-orange-900/40",
    };

    const themeClass = colors[color] || colors.blue;
    const btnClass = btnColors[color] || btnColors.blue;

    return (
        <div className={`relative rounded-xl border-2 border-dashed p-6 transition-transform hover:-translate-y-1 ${themeClass}`}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-5 h-5 shrink-0" />
                        <span className="font-bold text-lg tracking-wide uppercase">{code}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{discount}</h3>
                    <p className="text-sm opacity-90 mb-3">{description}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium opacity-75">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Expires: {expiryDate}</span>
                    </div>
                </div>

                <div className="flex items-center sm:border-l border-current/20 sm:pl-6">
                    <Button
                        onClick={handleCopy}
                        variant="ghost"
                        className={`w-full sm:w-auto bg-white dark:bg-zinc-800 shadow-xs ${btnClass}`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Code
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Decorative circles for coupon look */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-zinc-950 rounded-full" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-zinc-950 rounded-full" />
        </div>
    );
}
