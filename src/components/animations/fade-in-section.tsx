"use client";

import React from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * SSR-safe FadeInSection:
 * - Always renders the identical `<motion.div>` DOM node on both server and client to prevent
 *   React hydration mismatches when `prefers-reduced-motion` is enabled in the user's OS.
 * - Uses `initial={false}` so critical content is immediately visible in SSR HTML without
 *   `style={{ opacity: 0, transform: "translateY(...)" }}` diffing errors, and smoothly animates
 *   hover/scroll elevation on the client.
 */
export function FadeInSection({
  children,
  delay = 0,
  className,
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
