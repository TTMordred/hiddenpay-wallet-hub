import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="heading-lg text-background">
            Claim your{" "}
            <span className="font-mono">@username</span>
            <br />
            before it's taken.
          </h2>

          <p className="text-lg text-background/70 max-w-xl mx-auto">
            Join thousands of early adopters simplifying their crypto identity.
            Premium usernames are going fast.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="pt-4"
          >
            <a href="https://hiddenpay.xyz" className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-semibold px-10 py-5 rounded-full text-lg hover:bg-background/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Reserve Username Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <p className="text-sm text-background/50">
            No credit card required · Free to claim · Instant setup
          </p>
        </motion.div>
      </div>
    </section>
  );
};
