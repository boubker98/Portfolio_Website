import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export type BentoCardProps = {
  children: ReactNode;
  className?: string;
  colSpan?: number; // Default 1
  rowSpan?: number; // Default 1
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-secondary/30 border border-white/5 p-6 backdrop-blur-sm transition-all hover:bg-secondary/50",
        // Dynamic column/row spans
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        colSpan === 4 && "md:col-span-4",
        rowSpan === 2 && "md:row-span-2",
        rowSpan === 3 && "md:row-span-3",
        className
      )}
    >
      {children}
    </div>
  );
}
