"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileFilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function MobileFilterSheet({ isOpen, onClose, children }: MobileFilterSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 h-full w-[300px] bg-background p-6 shadow-xl lg:hidden overflow-y-auto border-l border-border"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-foreground">Filters</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close filters"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
