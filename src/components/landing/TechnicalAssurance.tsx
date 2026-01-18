import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";

const assurances = [
  "Non-custodial architecture",
  "No private keys stored",
  "Full ownership retained",
  "Open source verification",
];

export const TechnicalAssurance = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-3xl bg-foreground flex items-center justify-center">
                <Shield className="w-32 h-32 text-background" strokeWidth={1} />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[hsl(var(--wallet-spending))]" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-2xl border-4 border-foreground" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Security
              </p>
              <h2 className="heading-lg">
                Your keys.
                <br />
                Your control.
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Linking wallets is purely for convenience. We never hold your
              private keys. You retain full non-custodial control over every
              linked address.
            </p>

            <div className="space-y-4">
              {assurances.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-background" strokeWidth={3} />
                  </div>
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
