import { Link } from "react-router-dom";
import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  CodeBlock,
  Callout,
  Step,
  DocsBadge,
} from "@/components/docs/DocsComponents";
import { ArrowRight, Terminal, Key, Wallet } from "lucide-react";

const DocsGettingStarted = () => {
  return (
    <DocsLayout
      title="Getting Started"
      description="Quick setup guide and your first API integration with HiddenPay."
      lastUpdated="January 2026"
    >
      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Prerequisites
        </h2>
        <p className="text-muted-foreground mb-4">
          Before you begin, ensure you have:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <strong>Development Environment</strong>
              <p className="text-sm text-muted-foreground">
                Node.js 18+ or equivalent HTTP client
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Wallet className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <strong>Sui Wallet</strong> (for wallet signature auth)
              <p className="text-sm text-muted-foreground">
                Sui Wallet browser extension or any Sui-compatible wallet
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Key className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <strong>API Access</strong>
              <p className="text-sm text-muted-foreground">
                No API key required. JWT token needed for protected endpoints.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Authentication Methods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Choose Your Authentication Method
        </h2>
        <p className="text-muted-foreground mb-6">
          HiddenPay supports two authentication methods:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl border border-border bg-card">
            <DocsBadge variant="success">Recommended</DocsBadge>
            <h3 className="text-lg font-semibold mt-3 mb-2">Wallet Signature</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Best for Web3 apps and dApps. Users connect their Sui wallet and sign a message.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Simple implementation</p>
              <p>✓ No external dependencies</p>
              <p>✓ Full Web3 experience</p>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card">
            <DocsBadge variant="outline">Alternative</DocsBadge>
            <h3 className="text-lg font-semibold mt-3 mb-2">zkLogin (Google)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Best for Web2 apps. Users sign in with Google, no wallet required.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Familiar UX for non-crypto users</p>
              <p>✓ No wallet extension needed</p>
              <p>○ Requires prover service setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Quick Start (Wallet Signature)
        </h2>

        <Step number={1} title="Request a Challenge">
          <p className="mb-3">
            Get a unique nonce for your wallet address. This nonce expires in 5 minutes.
          </p>
          <CodeBlock language="bash" title="Request">
{`curl -X GET "https://api.hiddenpay.xyz/api/auth/challenge?address=0xYOUR_WALLET_ADDRESS"`}
          </CodeBlock>
          <CodeBlock language="json" title="Response">
{`{
  "nonce": "a1b2c3d4e5f67890abcdef1234567890",
  "expiresAt": "2026-01-18T12:05:00.000Z",
  "domain": "hiddenpay.xyz"
}`}
          </CodeBlock>
        </Step>

        <Step number={2} title="Sign the Challenge Message">
          <p className="mb-3">
            Construct the authentication message and sign it with your wallet.
          </p>
          <CodeBlock language="javascript" title="Sign Message">
{`import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

// Construct the exact message format
const message = \`Sign in to hiddenpay.xyz

Address: \${address}
Nonce: \${nonce}
Issued At: \${new Date().toISOString()}
Expiration Time: \${expiresAt}\`;

// Sign with your wallet
const messageBytes = new TextEncoder().encode(message);
const signature = await keypair.signPersonalMessage(messageBytes);
const serializedSignature = signature.signature; // Base64`}
          </CodeBlock>
          <Callout type="warning" title="Message Format">
            The message format must match exactly, including newlines and spacing.
            Any mismatch will result in signature verification failure.
          </Callout>
        </Step>

        <Step number={3} title="Verify and Get JWT Token">
          <p className="mb-3">
            Submit the signed message to receive your JWT access token.
          </p>
          <CodeBlock language="bash" title="Request">
{`curl -X POST "https://api.hiddenpay.xyz/api/auth/verify" \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "0xYOUR_WALLET_ADDRESS",
    "domain": "hiddenpay.xyz",
    "nonce": "a1b2c3d4e5f67890abcdef1234567890",
    "issuedAt": "2026-01-18T12:00:00.000Z",
    "expirationTime": "2026-01-18T12:05:00.000Z",
    "message": "Sign in to hiddenpay.xyz...",
    "signature": "YOUR_BASE64_SIGNATURE"
  }'`}
          </CodeBlock>
          <CodeBlock language="json" title="Response">
{`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "needsOnboarding": true
}`}
          </CodeBlock>
        </Step>

        <Step number={4} title="Make Authenticated Requests">
          <p className="mb-3">
            Use the JWT token in the Authorization header for all protected endpoints.
          </p>
          <CodeBlock language="bash" title="Example: Get Profile">
{`curl -X GET "https://api.hiddenpay.xyz/api/users/profile" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}
          </CodeBlock>
        </Step>
      </section>

      {/* Environment Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Environment Configuration
        </h2>
        <CodeBlock language="bash" title=".env">
{`# API Configuration
HIDDENPAY_API_URL=https://api.hiddenpay.xyz/api
HIDDENPAY_ENV=production  # or 'development'

# Sui Configuration
SUI_NETWORK=mainnet  # or 'testnet'
SUI_RPC_URL=https://fullnode.mainnet.sui.io:443

# Optional: zkLogin
GOOGLE_CLIENT_ID=your-google-oauth-client-id`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Next Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/docs/getting-started/quick-start"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors group"
          >
            <div>
              <h4 className="font-semibold">Full Quick Start Guide</h4>
              <p className="text-sm text-muted-foreground">Detailed walkthrough</p>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/docs/core-concepts"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors group"
          >
            <div>
              <h4 className="font-semibold">Core Concepts</h4>
              <p className="text-sm text-muted-foreground">Understand the system</p>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/docs/authentication"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors group"
          >
            <div>
              <h4 className="font-semibold">Authentication Deep Dive</h4>
              <p className="text-sm text-muted-foreground">All auth methods</p>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/docs/api"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors group"
          >
            <div>
              <h4 className="font-semibold">API Reference</h4>
              <p className="text-sm text-muted-foreground">All endpoints</p>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsGettingStarted;
