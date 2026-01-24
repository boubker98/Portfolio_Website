import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:max-w-screen-2xl px-8 md:px-12 lg:px-24">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js and Tailwind. The source code is available on{" "}
          <a
            href="https://github.com/boubker/portfolio"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
             <Link href="https://twitter.com" target="_blank" className="hover:text-foreground">
                Twitter
             </Link>
             <Link href="https://github.com" target="_blank" className="hover:text-foreground">
                GitHub
             </Link>
        </div>
      </div>
    </footer>
  );
}
