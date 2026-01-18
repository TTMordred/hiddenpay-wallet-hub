import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Network, EyeOff, RefreshCw, Wallet, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Smart Routing",
    description:
      "Receive funds to your username. We route it to your default wallet automatically.",
  },
  {
    icon: EyeOff,
    title: "Privacy Control",
    description:
      "Keep your main vault private. Use a burner wallet for daily payments.",
  },
  {
    icon: RefreshCw,
    title: "Seamless Switching",
    description:
      "Switch wallets instantly in one tap.",
  },
  {
    icon: Wallet,
    title: "Multi-Wallet Support",
    description:
      "Connect and manage multiple wallets from one unified interface.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Built on Sui blockchain with enterprise-grade security protocols.",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description:
      "Near-instant transaction finality with sub-second confirmation times.",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10"
        >
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Features</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold text-left">
                Everything you need.
                <span className="text-muted-foreground"> Nothing you don't.</span>
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Simple, powerful tools to manage your crypto payments with complete privacy and control.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-2 group"
              >
                <div className="bg-muted rounded-md aspect-video mb-2 flex items-center justify-center group-hover:bg-foreground transition-colors duration-300">
                  <feature.icon className="w-12 h-12 text-muted-foreground group-hover:text-background transition-colors duration-300" />
                </div>
                <h3 className="text-xl tracking-tight font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
