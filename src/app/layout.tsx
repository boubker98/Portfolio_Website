import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; 
import "./globals.css";
import "./theme.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { getNavigationTree } from "@/lib/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Portfolio | Digital Garden",
  description: "A showcase of work and thoughts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navTree = await getNavigationTree();

  return (
    <html lang="en" className="dark"> 
      <body className={cn(inter.variable, outfit.variable, "font-sans bg-background text-foreground antialiased min-h-screen")}>
        <Sidebar navTree={navTree} />
        
        {/* Main Content Area - offset for sidebar on desktop */}
        <div className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
