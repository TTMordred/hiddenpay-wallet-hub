import { Wallet } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">HiddenPay</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Twitter
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 HiddenPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
