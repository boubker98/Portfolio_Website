import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium font-mono ring-1 ring-inset transition-colors",
        {
          "bg-secondary/50 text-secondary-foreground ring-border/50 hover:bg-secondary hover:text-primary hover:ring-primary/40": variant === "default",
          "bg-transparent text-foreground ring-border hover:ring-foreground": variant === "outline",
           "bg-primary/10 text-primary ring-primary/20": variant === "secondary",
        },
        className
      )}
    >
      {String(children).startsWith("#") ? children : `#${children}`}
    </span>
  );
}
