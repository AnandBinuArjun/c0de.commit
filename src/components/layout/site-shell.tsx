"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { InteractiveTerminal } from "@/components/terminal/interactive-terminal";
import { CommandPalette } from "@/components/layout/command-palette";
import { FloatingHudDock } from "@/components/layout/floating-hud-dock";
import { OrganizationJsonLd } from "@/components/seo/json-ld";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary selection:bg-brand-primary selection:text-background">
      <OrganizationJsonLd />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to main content
      </a>
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingHudDock
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        embedded={false}
      />
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
