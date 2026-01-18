import { Link } from "react-router-dom";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { Callout, CodeBlock, DocsBadge } from "@/components/docs/DocsComponents";
import {
  ArrowRight,
  Wallet,
  CreditCard,
  Users,
  RefreshCw,
  Trophy,
  QrCode,
  Building,
} from "lucide-react";

const DocsCoreConceptsIndex = () => {
  const concepts = [
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Prefund Payment Model",
      description: "How crypto converts to fiat - user sends USDC first, then bank payout initiates",
      href: "/docs/core-concepts/prefund-model",
      color: "text-blue-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Identity Resolution",
      description: "Transfer using @usernames instead of complex wallet addresses",
      href: "/docs/core-concepts/identity",
      color: "text-purple-500",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallet System",
      description: "Hybrid architecture supporting both blockchain and bank accounts",
      href: "/docs/core-concepts/wallets",
      color: "text-green-500",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Loyalty & Referrals",
      description: "4-tier loyalty program with commission-based referral rewards",
      href: "/docs/core-concepts/loyalty",
      color: "text-yellow-500",
    },
  ];

  return (
    <DocsLayout
      title="Core Concepts"
      description="Deep understanding of HiddenPay's business logic and domain-specific mechanisms."
      lastUpdated="January 2026"
    >
      {/* Overview */}
      <section className="mb-12">
        <p className="text-lg text-muted-foreground mb-6">
          HiddenPay operates at the intersection of <strong>blockchain technology</strong> and{" "}
          <strong>traditional banking</strong>. Understanding these core concepts is essential for
          successful integration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((concept) => (
            <Link
              key={concept.title}
              to={concept.href}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg transition-all group"
            >
              <div className={`${concept.color} mt-1`}>{concept.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {concept.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{concept.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Prefund Model Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Prefund Payment Model
        </h2>
        <p className="text-muted-foreground mb-4">
          The <strong>Prefund Model</strong> is HiddenPay's core mechanism for converting cryptocurrency
          (USDC) into fiat currency (VND, PHP) with instant bank transfers.
        </p>

        <div className="p-6 rounded-xl bg-secondary/30 border border-border mb-6">
          <h4 className="font-semibold mb-4">Payment Flow</h4>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1 text-center p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500 font-bold">1</span>
              </div>
              <p className="text-sm font-medium">User sends USDC</p>
              <p className="text-xs text-muted-foreground">to Partner wallet</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
            <div className="flex-1 text-center p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-500 font-bold">2</span>
              </div>
              <p className="text-sm font-medium">Backend verifies</p>
              <p className="text-xs text-muted-foreground">on Sui blockchain</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
            <div className="flex-1 text-center p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-500 font-bold">3</span>
              </div>
              <p className="text-sm font-medium">Bank payout</p>
              <p className="text-xs text-muted-foreground">via Gaian API</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90 md:rotate-0" />
            <div className="flex-1 text-center p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-500 font-bold">4</span>
              </div>
              <p className="text-sm font-medium">Recipient gets</p>
              <p className="text-xs text-muted-foreground">local currency</p>
            </div>
          </div>
        </div>

        <Callout type="info" title="Key Points">
          <ul className="space-y-1 mt-2">
            <li>• Crypto is sent FIRST, then fiat payout is initiated</li>
            <li>• Exchange rates are locked at order creation</li>
            <li>• Fee structure: Gaian fees + HiddenPay commission (0.2%)</li>
          </ul>
        </Callout>
      </section>

      {/* Wallet System Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Hybrid Wallet System
        </h2>
        <p className="text-muted-foreground mb-4">
          HiddenPay supports both blockchain wallets and traditional bank accounts in a unified system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">Onchain Wallets</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Blockchain addresses for receiving crypto
            </p>
            <div className="text-xs space-y-1">
              <p className="flex items-center gap-2">
                <DocsBadge variant="outline">sui</DocsBadge>
                <span className="text-muted-foreground">Primary chain</span>
              </p>
              <p className="flex items-center gap-2">
                <DocsBadge variant="outline">ethereum</DocsBadge>
                <span className="text-muted-foreground">EVM support</span>
              </p>
              <p className="flex items-center gap-2">
                <DocsBadge variant="outline">polygon</DocsBadge>
                <span className="text-muted-foreground">Layer 2</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">Offchain Wallets</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Bank accounts for receiving fiat
            </p>
            <div className="text-xs space-y-1">
              <p className="flex items-center gap-2">
                <DocsBadge variant="success">VND</DocsBadge>
                <span className="text-muted-foreground">Vietnam banks via VietQR</span>
              </p>
              <p className="flex items-center gap-2">
                <DocsBadge variant="success">PHP</DocsBadge>
                <span className="text-muted-foreground">Philippines banks</span>
              </p>
            </div>
          </div>
        </div>

        <Callout type="note" title="Default Wallet">
          Each user has ONE default wallet across all types. This is used as the default
          destination when receiving payments via username lookup.
        </Callout>
      </section>

      {/* Identity Resolution Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Identity Resolution
        </h2>
        <p className="text-muted-foreground mb-4">
          HiddenPay's Smart QR Scanner automatically detects and resolves various identifier types.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Input Type</th>
                <th className="py-3 px-4 text-left font-medium">Example</th>
                <th className="py-3 px-4 text-left font-medium">Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">
                  <DocsBadge variant="outline">Username</DocsBadge>
                </td>
                <td className="py-3 px-4 font-mono text-xs">@alice</td>
                <td className="py-3 px-4 text-muted-foreground">
                  User profile + default wallet
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">
                  <DocsBadge variant="outline">Wallet Address</DocsBadge>
                </td>
                <td className="py-3 px-4 font-mono text-xs">0x1234...abcd</td>
                <td className="py-3 px-4 text-muted-foreground">
                  User profile (if registered)
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">
                  <DocsBadge variant="outline">VietQR</DocsBadge>
                </td>
                <td className="py-3 px-4 font-mono text-xs">00020101021138...</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Bank info + user (if linked)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Domain Terms */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Domain Terms Glossary
        </h2>

        <div className="space-y-3">
          {[
            { term: "Prefund", definition: "Payment model where crypto is sent before fiat payout" },
            { term: "Transfer Wallet", definition: "User's primary Sui wallet for sending payments (set at signup, immutable)" },
            { term: "Receive Wallet", definition: "User's default wallet for receiving payments" },
            { term: "QR String", definition: "VietQR-formatted bank account identifier" },
            { term: "Client Request ID", definition: "Unique identifier for idempotent operations" },
            { term: "HiddenWallet Fee", definition: "Platform commission (0.2% on top of Gaian fees)" },
            { term: "Loyalty Points", definition: "Gamification points earned from transactions" },
            { term: "Commission Balance", definition: "Earnings from referral program (withdrawable)" },
          ].map((item) => (
            <div key={item.term} className="flex gap-4 p-3 rounded-lg border border-border">
              <div className="font-mono text-sm font-semibold min-w-[160px]">{item.term}</div>
              <div className="text-sm text-muted-foreground">{item.definition}</div>
            </div>
          ))}
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsCoreConceptsIndex;
