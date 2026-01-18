import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium">
            <Sparkles className="w-4 h-4 text-wallet-savings" />
            Limited Early Access
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Claim your unique{" "}
            <span className="font-mono text-gradient">@username</span>
            <br />
            before it's taken.
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of early adopters simplifying their crypto identity.
            Premium usernames are going fast.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="glow-button text-lg px-10 py-7 rounded-xl font-semibold"
            >
              Reserve Username Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <p className="text-sm text-muted-foreground">
            No credit card required • Free to claim • Instant setup
          </p>
        </motion.div>
      </div>
    </section>
  );
};
