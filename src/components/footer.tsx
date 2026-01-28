import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto py-8">
      <div className="container max-w-4xl mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
        <p>&copy; {currentYear} Boubker Ennajy</p>
        <div className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="/brain" className="hover:text-primary transition-colors">Brain</Link>
        </div>
      </div>
    </footer>
  );
}