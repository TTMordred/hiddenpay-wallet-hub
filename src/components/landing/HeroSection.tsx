import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const chaosWallets = [
  { address: "0x5f3a...2a9c", delay: 0, x: -20, y: -30, rotate: -8 },
  { address: "0x9c7b...b1e4", delay: 0.1, x: 40, y: 10, rotate: 5 },
  { address: "0x2d1e...f8a2", delay: 0.2, x: -10, y: 40, rotate: -3 },
];

const linkedWallets = [
  { name: "Trading", type: "trading" as const, address: "0x5f3a...2a9c" },
  { name: "Spending", type: "spending" as const, address: "0x9c7b...b1e4" },
  { name: "Savings", type: "savings" as const, address: "0x2d1e...f8a2" },
];

const walletBadgeStyles = {
  trading: "wallet-badge-trading",
  spending: "wallet-badge-spending",
  savings: "wallet-badge-savings",
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 bg-wallet-spending rounded-full animate-pulse" />
              Multi-Wallet Aggregation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Stop juggling{" "}
              <span className="font-mono text-muted-foreground">0x</span>{" "}
              addresses.
              <br />
              <span className="text-gradient">Start using your Name.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Link all your Sui wallets under one unique{" "}
              <span className="font-mono font-semibold text-foreground">@username</span>.
              Manage your Spending, Savings, and Trading assets in a single dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="glow-button text-lg px-8 py-6 rounded-xl">
                Reserve Username Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border-2"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Right: Chaos vs Order Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-6">
              {/* Chaos State */}
              <div className="relative w-48 h-64">
                <p className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">
                  Before
                </p>
                {chaosWallets.map((wallet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: wallet.x,
                      rotate: wallet.rotate,
                    }}
                    transition={{
                      delay: wallet.delay + 0.5,
                      duration: 0.5,
                    }}
                    className="absolute glass-card p-4 w-44 animate-float"
                    style={{
                      top: `${30 + i * 60}px`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">🔐</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground truncate">
                        {wallet.address}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="flex flex-col items-center gap-2"
              >
                <ArrowRight className="w-8 h-8 text-primary" />
                <span className="text-xs text-muted-foreground font-medium">Link</span>
              </motion.div>

              {/* Order State - Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="relative"
              >
                <p className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">
                  After
                </p>
                <div className="glass-card p-6 w-64 space-y-4 border-primary/20">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                      M
                    </div>
                    <div>
                      <p className="font-bold text-lg">@Mordred</p>
                      <p className="text-xs text-muted-foreground">3 wallets linked</p>
                    </div>
                  </div>

                  {/* Dropdown */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Linked Wallets</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>

                    {linkedWallets.map((wallet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + i * 0.15, duration: 0.3 }}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${walletBadgeStyles[wallet.type]}`}
                          >
                            {wallet.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {wallet.address}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
