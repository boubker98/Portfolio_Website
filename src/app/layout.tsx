import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Portfolio | Digital Garden",
  description: "A showcase of work and thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> 
      <body className={cn(inter.variable, outfit.variable, "font-sans bg-background text-foreground antialiased min-h-screen flex flex-col")}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
