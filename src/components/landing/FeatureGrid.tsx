import { motion } from "framer-motion";
import { Network, EyeOff, RefreshCw, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Smart Routing",
    description:
      "Receive funds to your username. We route it to your default wallet automatically.",
    number: "01",
  },
  {
    icon: EyeOff,
    title: "Privacy Control",
    description:
      "Keep your main vault private. Use a burner wallet for daily payments.",
    number: "02",
  },
  {
    icon: RefreshCw,
    title: "Seamless Switching",
    description:
      "Switch wallets in one tap at checkout. Savings to Spending, instantly.",
    number: "03",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Features
          </p>
          <h2 className="heading-lg">
            Everything you need.
            <br />
            <span className="text-muted-foreground">Nothing you don't.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="card-modern p-8 h-full bg-background">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {feature.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
