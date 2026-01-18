import { motion } from "framer-motion";
import { Network, EyeOff, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Smart Routing",
    description:
      "Receive funds to your username, and we route it to your default wallet automatically.",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: EyeOff,
    title: "Privacy Control",
    description:
      "Keep your main vault private. Link a 'Burner Wallet' for daily coffee payments via QR.",
    gradient: "from-wallet-spending/10 to-wallet-savings/10",
  },
  {
    icon: RefreshCw,
    title: "Seamless Switching",
    description:
      "Paying for lunch? Switch from your 'Savings Wallet' to 'Spending Wallet' in 1 tap at checkout.",
    gradient: "from-wallet-savings/10 to-wallet-trading/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const FeatureGrid = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything in <span className="text-gradient">One Place</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage multiple wallets without the complexity. HiddenPay brings
            order to your crypto life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              <div
                className={`glass-card p-8 h-full transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 bg-gradient-to-br ${feature.gradient}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
