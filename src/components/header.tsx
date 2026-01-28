"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/brain", label: "Brain" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-6 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="relative w-7 h-7 overflow-hidden rounded-sm">
            <Image 
              src="/images/logo.png" 
              alt="Boubker Ennajy" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
      </div>
    </header>
  );
}
