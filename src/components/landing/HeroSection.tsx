import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

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
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["organized", "unified", "secure", "simple", "seamless"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-[hsl(var(--wallet-spending))] rounded-full" />
              Multi-Wallet Aggregation
            </div>

            <h1 className="heading-xl">
              <span className="block text-muted-foreground font-medium text-2xl md:text-3xl mb-4">
                Stop juggling <span className="font-mono">0x</span> addresses.
              </span>
              <span className="block">Make crypto</span>
              <span className="relative flex h-[1.2em] overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute"
                    initial={{ opacity: 0, y: 100 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -100 : 100, opacity: 0 }
                    }
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  >
                    {title}.
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Link all your Sui wallets under one unique{" "}
              <span className="font-mono font-semibold text-foreground">@username</span>.
              Manage everything in a single dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary inline-flex items-center justify-center gap-2">
                Reserve Username
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">
                See How It Works
              </button>
            </div>
          </motion.div>

          {/* Right: Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Floating chaos wallets */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: -12 }}
                animate={{ opacity: 0.6, x: 0, rotate: -12 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -left-16 top-8 card-modern p-3 text-xs font-mono text-muted-foreground hidden lg:block"
              >
                0x5f3a...2a9c
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 8 }}
                animate={{ opacity: 0.6, x: 0, rotate: 8 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -right-12 top-4 card-modern p-3 text-xs font-mono text-muted-foreground hidden lg:block"
              >
                0x9c7b...b1e4
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -6 }}
                animate={{ opacity: 0.6, y: 0, rotate: -6 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-8 -bottom-8 card-modern p-3 text-xs font-mono text-muted-foreground hidden lg:block"
              >
                0x2d1e...f8a2
              </motion.div>

              {/* Main Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="card-modern p-8 w-80 space-y-6 relative z-10"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background font-bold text-2xl">
                    M
                  </div>
                  <div>
                    <p className="font-bold text-xl">@Mordred</p>
                    <p className="text-sm text-muted-foreground">3 wallets linked</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Dropdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium">Linked Wallets</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>

                  {linkedWallets.map((wallet, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary"
                    >
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${walletBadgeStyles[wallet.type]}`}
                      >
                        {wallet.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {wallet.address}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
