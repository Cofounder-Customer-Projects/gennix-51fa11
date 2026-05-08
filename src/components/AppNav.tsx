"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Wand2, Package, ShoppingBag } from "lucide-react";

const navItems = [
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Create", href: "/create", icon: Wand2 },
  { label: "Products", href: "/products", icon: Package },
  { label: "Sell", href: "/sell", icon: ShoppingBag },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-sand border-b border-stone">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/discover" className="flex-shrink-0">
          <span className="font-display font-black text-xl tracking-tight text-midnight">
            Genni
            <span className="gradient-accent-text">x</span>
          </span>
        </Link>

        {/* Segmented nav */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-body font-medium",
                  "transition-colors duration-150 relative",
                  isActive
                    ? "text-midnight"
                    : "text-fg-muted hover:text-midnight hover:bg-midnight/5",
                ].join(" ")}
              >
                <Icon size={15} strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="tracking-[0.02em] uppercase text-[11px] font-semibold">
                  {label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-energy rounded-pill" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <Link
          href="/create"
          className="flex-shrink-0 inline-flex items-center gap-1.5 h-8 px-4 bg-midnight text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          Create blueprint
        </Link>
      </div>
    </header>
  );
}
