"use client";

import React from "react";
import { motion, Variants } from "motion/react";

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "left" | "right" | "up" | "down";
    delay?: number;
    className?: string;
    staggerChildren?: number;
}

export default function ScrollReveal({
    children,
    direction = "left",
    delay = 0,
    className = "",
    staggerChildren = 0
}: ScrollRevealProps) {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: "easeOut",
                staggerChildren: staggerChildren
            }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
