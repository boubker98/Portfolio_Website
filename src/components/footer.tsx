import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container max-w-4xl mx-auto px-8 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">Navigation</h3>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">Home</Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">Projects</Link>
            <Link href="/brain" className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">The Brain</Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">Connect</h3>
            <a 
                href="mailto:boubkerennajy@gmail.com" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
            >
                Email
            </a>
            <a 
                href="https://linkedin.com/in/b-ennajy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
            >
                LinkedIn
            </a>
            <a 
                href="https://github.com/boubker98" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
            >
                GitHub
            </a>
          </div>

          {/* Description/Context */}
           <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm font-semibold text-foreground">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Data Engineer building reliable systems and exploring second brain architectures.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
            <p>&copy; {currentYear} Boubker Ennajy. All rights reserved.</p>
            <p>
                Built with <a href="https://nextjs.org" target="_blank" className="hover:text-foreground underline underline-offset-2">Next.js</a> 
                <span> & </span> <a href="https://tailwindcss.com" target="_blank" className="hover:text-foreground underline underline-offset-2">Tailwind</a>.

            </p>
        </div>
      </div>
    </footer>
  );
}