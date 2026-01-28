"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Home, 
  FolderOpen, 
  FileText,
  Menu,
  X,
  Brain
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  type: 'file' | 'directory';
  children?: NavItem[];
}

interface SidebarProps {
  navTree: NavItem[];
}

export function Sidebar({ navTree }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({
    '/projects': true,
    '/brain': true,
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved) setIsCollapsed(JSON.parse(saved));
  }, []);

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleDir = (href: string) => {
    setExpandedDirs(prev => ({ ...prev, [href]: !prev[href] }));
  };

  const getIcon = (item: NavItem) => {
    if (item.href === '/') return <Home className="w-4 h-4" />;
    if (item.href === '/brain') return <Brain className="w-4 h-4" />;
    if (item.type === 'directory') return <FolderOpen className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    const isExpanded = expandedDirs[item.href];
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.href}>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer group",
            isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            depth > 0 && "ml-4"
          )}
          onClick={() => hasChildren && toggleDir(item.href)}
        >
          {getIcon(item)}
          
          {!isCollapsed && (
            <>
              <Link 
                href={item.href} 
                className="flex-1 truncate"
                onClick={(e) => hasChildren && e.stopPropagation()}
              >
                {item.label}
              </Link>
              
              {hasChildren && (
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isExpanded && "rotate-180"
                  )} 
                />
              )}
            </>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Mobile Header
  const MobileHeader = () => (
    <header className="md:hidden sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7 overflow-hidden rounded-sm">
            <Image src="/images/logo.png" alt="Logo" fill className="object-cover" priority />
          </div>
        </Link>
        
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-background border-b border-border/50 p-4 shadow-lg">
          <nav className="space-y-1">
            {navTree.map(item => renderNavItem(item))}
          </nav>
        </div>
      )}
    </header>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7 overflow-hidden rounded-sm">
            <Image src="/images/logo.png" alt="Logo" fill className="object-cover" priority />
          </div>
          {!isCollapsed && <span className="font-semibold text-sm">Digital Garden</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navTree.map(item => renderNavItem(item))}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center h-12 border-t border-border/50 hover:bg-muted transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );

  return (
    <>
      <MobileHeader />
      <DesktopSidebar />
    </>
  );
}
