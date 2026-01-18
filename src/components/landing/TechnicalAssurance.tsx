import { motion } from "framer-motion";
import { Shield, Key, Lock, CheckCircle2 } from "lucide-react";

const assurances = [
  "Non-custodial architecture",
  "No private keys stored",
  "Full ownership retained",
  "Open source verification",
];

export const TechnicalAssurance = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Central shield */}
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <Shield className="w-24 h-24 text-primary-foreground" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-card p-3 rounded-xl"
              >
                <Key className="w-6 h-6 text-wallet-trading" />
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl"
              >
                <Lock className="w-6 h-6 text-wallet-spending" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Your Keys, <span className="text-gradient">Your Control</span>.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Linking wallets is purely for convenience. We never hold your
              private keys. You retain full non-custodial control over every
              linked address.
            </p>

            <div className="space-y-4 pt-4">
              {assurances.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-wallet-spending/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-wallet-spending" />
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
