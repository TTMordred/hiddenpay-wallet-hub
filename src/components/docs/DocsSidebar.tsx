import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Rocket,
  Shield,
  Layers,
  Code,
  Webhook,
  AlertCircle,
  ChevronRight,
  Home,
  Key,
  Wallet,
  CreditCard,
  Users,
  QrCode,
  FileCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Introduction",
    href: "/docs",
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    icon: <Rocket className="w-4 h-4" />,
    items: [
      { title: "Quick Start", href: "/docs/getting-started/quick-start" },
      { title: "Environment Setup", href: "/docs/getting-started/environment" },
      { title: "Authentication", href: "/docs/getting-started/auth" },
    ],
  },
  {
    title: "Core Concepts",
    href: "/docs/core-concepts",
    icon: <Layers className="w-4 h-4" />,
    items: [
      { title: "Architecture", href: "/docs/core-concepts/architecture" },
      { title: "Prefund Model", href: "/docs/core-concepts/prefund-model" },
      { title: "Identity Resolution", href: "/docs/core-concepts/identity" },
      { title: "Wallet System", href: "/docs/core-concepts/wallets" },
      { title: "Loyalty & Referrals", href: "/docs/core-concepts/loyalty" },
    ],
  },
  {
    title: "Authentication",
    href: "/docs/authentication",
    icon: <Key className="w-4 h-4" />,
    items: [
      { title: "Wallet Signature", href: "/docs/authentication/wallet-signature" },
      { title: "zkLogin (Google)", href: "/docs/authentication/zklogin" },
      { title: "JWT Tokens", href: "/docs/authentication/jwt" },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/api",
    icon: <Code className="w-4 h-4" />,
    items: [
      { title: "Authentication", href: "/docs/api/auth" },
      { title: "Users & Profile", href: "/docs/api/users" },
      { title: "Onchain Wallets", href: "/docs/api/wallets-onchain" },
      { title: "Offchain Wallets", href: "/docs/api/wallets-offchain" },
      { title: "Payments", href: "/docs/api/payments" },
      { title: "Transfer & QR", href: "/docs/api/transfer" },
      { title: "KYC", href: "/docs/api/kyc" },
    ],
  },
  {
    title: "Webhooks",
    href: "/docs/webhooks",
    icon: <Webhook className="w-4 h-4" />,
  },
  {
    title: "Error Codes",
    href: "/docs/errors",
    icon: <AlertCircle className="w-4 h-4" />,
  },
];

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DocsSidebar = ({ isOpen = true, onClose }: DocsSidebarProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/docs") {
      return location.pathname === "/docs";
    }
    return location.pathname.startsWith(href);
  };

  const isExactActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-background border-r border-border overflow-y-auto",
          "lg:sticky lg:top-16",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.href}>
              <Link
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.items && (
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 ml-auto transition-transform",
                      isActive(item.href) && "rotate-90"
                    )}
                  />
                )}
              </Link>

              {/* Sub-items */}
              {item.items && isActive(item.href) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 mt-1 space-y-1 border-l border-border pl-4"
                >
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      to={subItem.href}
                      onClick={onClose}
                      className={cn(
                        "block px-3 py-1.5 rounded-lg text-sm transition-colors",
                        isExactActive(subItem.href)
                          ? "text-foreground font-medium bg-secondary/50"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Version badge */}
        <div className="p-4 border-t border-border mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Book className="w-3 h-3" />
            <span>API Version 1.0</span>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
