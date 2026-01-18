import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  CodeBlock,
  Callout,
  Endpoint,
  ParameterTable,
  ResponseExample,
  Step,
  DocsBadge,
} from "@/components/docs/DocsComponents";
import {
  Rocket,
  Shield,
  Code,
  Layers,
  ArrowRight,
  Wallet,
  CreditCard,
  Users,
  Zap,
  Globe,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Getting Started",
    description: "Quick setup guide and first API call walkthrough",
    href: "/docs/getting-started",
    color: "text-blue-500",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Core Concepts",
    description: "Understand the prefund model and identity resolution",
    href: "/docs/core-concepts",
    color: "text-purple-500",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Authentication",
    description: "Wallet signature and zkLogin authentication methods",
    href: "/docs/authentication",
    color: "text-green-500",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "API Reference",
    description: "Complete endpoint documentation with examples",
    href: "/docs/api",
    color: "text-orange-500",
  },
];

const highlights = [
  {
    icon: <Wallet className="w-5 h-5" />,
    title: "Hybrid Wallets",
    description: "Manage both blockchain and bank accounts",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Conversion",
    description: "Real-time crypto to fiat transfers",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Smart Identity",
    description: "Transfer using @usernames",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Southeast Asia",
    description: "VND, PHP support with local banks",
  },
];

const DocsIndex = () => {
  return (
    <DocsLayout>
      {/* Hero */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <DocsBadge variant="outline">API v1.0</DocsBadge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">
            HiddenPay API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build seamless crypto-to-fiat payment experiences with our PayFi infrastructure.
            Convert USDC to local currencies with instant bank transfers.
          </p>
        </motion.div>

        {/* Quick highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
        >
          {highlights.map((item) => (
            <div key={item.title} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="text-foreground">{item.icon}</div>
              <span>{item.title}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          >
            <Link
              to={feature.href}
              className="block p-6 rounded-xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg transition-all duration-200 group"
            >
              <div className={`mb-3 ${feature.color}`}>{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                {feature.title}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Start Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Start</h2>
        <p className="text-muted-foreground mb-6">
          Get your first API call working in under 5 minutes.
        </p>

        <Step number={1} title="Request a Challenge">
          <p className="mb-3">Request a login challenge (nonce) for your Sui wallet address.</p>
          <CodeBlock language="bash">
{`curl -X GET "https://api.hiddenpay.xyz/api/auth/challenge?address=0xYOUR_WALLET_ADDRESS"`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Sign the Challenge">
          <p className="mb-3">Sign the message with your wallet to prove ownership.</p>
          <CodeBlock language="javascript">
{`const message = \`Sign in to hiddenpay.xyz

Address: \${address}
Nonce: \${nonce}
Issued At: \${new Date().toISOString()}
Expiration Time: \${expiresAt}\`;

const signature = await keypair.signPersonalMessage(
  new TextEncoder().encode(message)
);`}
          </CodeBlock>
        </Step>

        <Step number={3} title="Get Your JWT Token">
          <p className="mb-3">Submit the signature to receive your access token.</p>
          <CodeBlock language="bash">
{`curl -X POST "https://api.hiddenpay.xyz/api/auth/verify" \\
  -H "Content-Type: application/json" \\
  -d '{"address": "0x...", "signature": "...", ...}'`}
          </CodeBlock>
        </Step>

        <div className="mt-6">
          <Link
            to="/docs/getting-started/quick-start"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            View full Quick Start guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* API Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-4">API Overview</h2>

        <Callout type="info" title="Base URL">
          All API requests should be made to: <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-sm">https://api.hiddenpay.xyz/api</code>
        </Callout>

        <h3 className="text-lg font-semibold mt-6 mb-3">Authentication Endpoints</h3>
        <div className="space-y-2">
          <Endpoint method="GET" path="/auth/challenge" description="Request login challenge nonce" />
          <Endpoint method="POST" path="/auth/verify" description="Verify wallet signature and get JWT" />
          <Endpoint method="GET" path="/auth/zklogin/challenge" description="Get zkLogin challenge" />
          <Endpoint method="POST" path="/auth/zklogin/verify" description="Verify zkLogin proof" />
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Core Endpoints</h3>
        <div className="space-y-2">
          <Endpoint method="GET" path="/users/profile" description="Get current user profile" />
          <Endpoint method="POST" path="/payments/orders" description="Create a new payment order" />
          <Endpoint method="POST" path="/transfer/scan-qr" description="Scan and resolve QR code" />
          <Endpoint method="GET" path="/wallets/onchain" description="List onchain wallets" />
        </div>

        <div className="mt-6">
          <Link
            to="/docs/api"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            View complete API Reference
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-4">Example Response</h2>
        <p className="text-muted-foreground mb-4">
          Here's what a typical user profile response looks like:
        </p>

        <ResponseExample status={200} description="Success">
{`{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "walletAddress": "0x1234567890abcdef...",
  "email": "alice@example.com",
  "kycStatus": "approved",
  "canTransfer": true,
  "isActive": true,
  "loyaltyPoints": 1250,
  "commissionBalance": 50000,
  "onchainWallets": [
    {
      "id": "wallet-123",
      "address": "0x...",
      "chain": "sui",
      "isDefault": true
    }
  ],
  "offchainWallets": [
    {
      "id": "bank-456",
      "bankName": "Vietcombank",
      "accountNumber": "****1234",
      "isDefault": false
    }
  ]
}`}
        </ResponseExample>
      </motion.div>

      {/* SDKs & Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-4">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://github.com/hiddenpay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">GitHub</h4>
              <p className="text-sm text-muted-foreground">View SDK and examples</p>
            </div>
          </a>
          <a
            href="https://api.hiddenpay.xyz/api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">Swagger UI</h4>
              <p className="text-sm text-muted-foreground">Interactive API explorer</p>
            </div>
          </a>
        </div>
      </motion.div>
    </DocsLayout>
  );
};

export default DocsIndex;
