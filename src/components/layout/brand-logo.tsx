"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/config/site";

interface BrandLogoProps {
  variant?: "horizontal" | "compact" | "stacked";
  className?: string;
}

/**
 * BrandLogo renders the official supplied CODE.COMMIT brand assets:
 * - Dragon-head + circular lock emblem (`/brand/code-commit-mark.png`)
 * - Official `CODE.COMMIT` wordmark (`/brand/code-commit-wordmark.png`)
 * - Full stacked emblem + wordmark (`/brand/code-commit-logo.png`)
 * Preserves the exact proportions and neon-green appearance of the original artwork.
 */
export function BrandLogo({
  variant = "horizontal",
  className,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md",
        className
      )}
      aria-label="CODE.COMMIT — Security x Software Home"
    >
      {variant === "compact" && (
        <img
          src={SITE_CONFIG.brandAssets.compactMarkPath}
          alt="CODE.COMMIT Dragon & Lock Emblem"
          className="h-11 w-11 object-contain drop-shadow-[0_0_10px_rgba(0,245,138,0.35)] transition-transform group-hover:scale-105"
        />
      )}

      {variant === "stacked" && (
        <img
          src={SITE_CONFIG.brandAssets.horizontalLogoPath}
          alt="CODE.COMMIT Official Logo"
          className="h-24 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,245,138,0.3)]"
        />
      )}

      {variant === "horizontal" && (
        <div className="flex items-center gap-3">
          <img
            src={SITE_CONFIG.brandAssets.compactMarkPath}
            alt="CODE.COMMIT Dragon & Lock Emblem"
            className="h-11 w-11 object-contain drop-shadow-[0_0_10px_rgba(0,245,138,0.35)] transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center">
            <img
              src={SITE_CONFIG.brandAssets.wordmarkPath}
              alt="CODE.COMMIT"
              className="h-5 w-auto object-contain object-left"
            />
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-text-secondary">
              SECURITY × SOFTWARE
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

interface ProductLogoProps {
  productName: string;
  assetPath: string;
  className?: string;
}

/**
 * ProductLogo renders the official CloudSentinel logo from /products/cloudsentinel-logo.png.
 */
export function ProductLogo({ productName, assetPath, className }: ProductLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <img
        src={assetPath}
        alt={`${productName} Official Logo`}
        className="h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,245,138,0.2)]"
      />
    </div>
  );
}
