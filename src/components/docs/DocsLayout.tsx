import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ExternalLink, Github, Search } from "lucide-react";
import { useState } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { cn } from "@/lib/utils";

interface DocsLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  lastUpdated?: string;
}

export const DocsLayout = ({ children, title, description, lastUpdated }: DocsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Generate breadcrumbs from path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    href: "/" + pathSegments.slice(0, index + 1).join("/"),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                  <span className="text-background font-bold text-sm">H</span>
                </div>
                <span className="font-bold text-lg">HiddenPay</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              {/* Search button */}
              <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground text-sm hover:border-foreground/20 transition-colors">
                <Search className="w-4 h-4" />
                <span>Search docs...</span>
                <kbd className="ml-2 px-1.5 py-0.5 rounded bg-secondary text-xs">⌘K</kbd>
              </button>

              {/* External links */}
              <a
                href="https://github.com/PayTaskdz/Sui-Payment"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://app.hiddenpay.xyz"
                className="hidden sm:inline-flex bg-foreground text-background text-sm font-semibold px-4 py-2 rounded-full hover:bg-foreground/90 transition-colors"
              >
                Launch App
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:pl-72">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 1 && (
              <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.href} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="w-3 h-3" />}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-foreground">{crumb.label}</span>
                    ) : (
                      <Link to={crumb.href} className="hover:text-foreground transition-colors">
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {/* Page header */}
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold tracking-tight mb-3">{title}</h1>
                {description && (
                  <p className="text-lg text-muted-foreground">{description}</p>
                )}
                {lastUpdated && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Last updated: {lastUpdated}
                  </p>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              {children}
            </motion.div>

            {/* Page footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  <p>Was this page helpful?</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">
                      👍 Yes
                    </button>
                    <button className="px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">
                      👎 No
                    </button>
                  </div>
                </div>
                <a
                  href="https://github.com/PayTaskdz/Sui-Payment/edit/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Edit this page on GitHub
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Table of Contents (optional - for desktop) */}
        <aside className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-24 p-4">
            <h4 className="text-sm font-semibold mb-3">On this page</h4>
            {/* TOC would be dynamically generated */}
          </div>
        </aside>
      </div>
    </div>
  );
};
