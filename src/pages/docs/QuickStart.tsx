import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  CodeBlock,
  Callout,
  Step,
  ResponseExample,
} from "@/components/docs/DocsComponents";

const DocsQuickStart = () => {
  return (
    <DocsLayout
      title="Quick Start"
      description="Get your first HiddenPay API call working in under 5 minutes."
      lastUpdated="January 2026"
    >
      <Callout type="info" title="Time to Complete">
        This guide takes approximately 5 minutes to complete.
      </Callout>

      {/* Step 1 */}
      <section className="mb-10">
        <Step number={1} title="Request a Challenge">
          <p className="mb-4">
            First, request a login challenge (nonce) for your Sui wallet address.
            The nonce is valid for 5 minutes.
          </p>

          <CodeBlock language="bash" title="cURL Request">
{`curl -X GET "https://api.hiddenpay.xyz/api/auth/challenge?address=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"`}
          </CodeBlock>

          <ResponseExample status={200} description="Success">
{`{
  "nonce": "a1b2c3d4e5f67890abcdef1234567890",
  "expiresAt": "2026-01-18T12:05:00.000Z",
  "domain": "hiddenpay.xyz"
}`}
          </ResponseExample>

          <Callout type="note">
            Save the <code className="px-1 py-0.5 bg-secondary rounded text-sm">nonce</code> and <code className="px-1 py-0.5 bg-secondary rounded text-sm">expiresAt</code> values - you'll need them for the next step.
          </Callout>
        </Step>
      </section>

      {/* Step 2 */}
      <section className="mb-10">
        <Step number={2} title="Sign the Challenge Message">
          <p className="mb-4">
            Construct the authentication message using the exact format below, then sign it with your wallet.
          </p>

          <h4 className="font-semibold mb-2">Message Format</h4>
          <CodeBlock language="text" title="Message Template">
{`Sign in to hiddenpay.xyz

Address: 0xYOUR_WALLET_ADDRESS
Nonce: a1b2c3d4e5f67890abcdef1234567890
Issued At: 2026-01-18T12:00:00.000Z
Expiration Time: 2026-01-18T12:05:00.000Z`}
          </CodeBlock>

          <h4 className="font-semibold mt-6 mb-2">JavaScript Implementation</h4>
          <CodeBlock language="javascript" title="Sign with @mysten/sui" showLineNumbers>
{`import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

// Your wallet keypair (DO NOT hardcode in production!)
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);
const address = keypair.getPublicKey().toSuiAddress();

// Challenge data from Step 1
const nonce = "a1b2c3d4e5f67890abcdef1234567890";
const expiresAt = "2026-01-18T12:05:00.000Z";
const issuedAt = new Date().toISOString();

// Construct the message (EXACT format required)
const message = \`Sign in to hiddenpay.xyz

Address: \${address}
Nonce: \${nonce}
Issued At: \${issuedAt}
Expiration Time: \${expiresAt}\`;

// Sign the message
const messageBytes = new TextEncoder().encode(message);
const { signature } = await keypair.signPersonalMessage(messageBytes);

console.log('Message:', message);
console.log('Signature:', signature);`}
          </CodeBlock>

          <Callout type="warning" title="Important">
            The message format must be exact, including the blank line after "Sign in to hiddenpay.xyz".
            Any mismatch will cause signature verification to fail.
          </Callout>
        </Step>
      </section>

      {/* Step 3 */}
      <section className="mb-10">
        <Step number={3} title="Verify Signature & Get JWT Token">
          <p className="mb-4">
            Submit the signed message to receive your JWT access token.
          </p>

          <CodeBlock language="bash" title="cURL Request">
{`curl -X POST "https://api.hiddenpay.xyz/api/auth/verify" \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "domain": "hiddenpay.xyz",
    "nonce": "a1b2c3d4e5f67890abcdef1234567890",
    "issuedAt": "2026-01-18T12:00:00.000Z",
    "expirationTime": "2026-01-18T12:05:00.000Z",
    "message": "Sign in to hiddenpay.xyz\\n\\nAddress: 0x...\\nNonce: ...\\nIssued At: ...\\nExpiration Time: ...",
    "signature": "YOUR_BASE64_SIGNATURE"
  }'`}
          </CodeBlock>

          <ResponseExample status={200} description="Success">
{`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweDEyMzQ...",
  "tokenType": "Bearer",
  "needsOnboarding": true
}`}
          </ResponseExample>

          <p className="mt-4 text-sm text-muted-foreground">
            <strong>needsOnboarding</strong>: If <code className="px-1 py-0.5 bg-secondary rounded">true</code>,
            the user hasn't set a username yet. Call the onboarding endpoint to complete setup.
          </p>
        </Step>
      </section>

      {/* Step 4 */}
      <section className="mb-10">
        <Step number={4} title="Make Your First Authenticated Request">
          <p className="mb-4">
            Use the JWT token to fetch your user profile.
          </p>

          <CodeBlock language="bash" title="Get Profile">
{`curl -X GET "https://api.hiddenpay.xyz/api/users/profile" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
          </CodeBlock>

          <ResponseExample status={200} description="Success">
{`{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": null,
  "walletAddress": "0x1234567890abcdef...",
  "email": null,
  "kycStatus": "not started",
  "canTransfer": false,
  "isActive": true,
  "loyaltyPoints": 0,
  "commissionBalance": 0,
  "onchainWallets": [],
  "offchainWallets": [],
  "createdAt": "2026-01-18T12:00:00.000Z",
  "updatedAt": "2026-01-18T12:00:00.000Z"
}`}
          </ResponseExample>
        </Step>
      </section>

      {/* Step 5 - Optional */}
      <section className="mb-10">
        <Step number={5} title="Complete Onboarding (Optional)">
          <p className="mb-4">
            If <code className="px-1 py-0.5 bg-secondary rounded">needsOnboarding</code> is true,
            set your username to unlock full platform features.
          </p>

          <CodeBlock language="bash" title="Complete Onboarding">
{`curl -X POST "https://api.hiddenpay.xyz/api/users/onboarding" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "alice",
    "email": "alice@example.com",
    "referralUsername": "bob"
  }'`}
          </CodeBlock>

          <ResponseExample status={200} description="Success">
{`{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "email": "alice@example.com",
  "referrerId": "660e8400-e29b-41d4-a716-446655440001",
  "isActive": true
}`}
          </ResponseExample>

          <Callout type="success" title="You're all set!">
            You've successfully authenticated and set up your profile.
            You can now explore the full API capabilities.
          </Callout>
        </Step>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border">
          Troubleshooting
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border">
            <h4 className="font-semibold text-red-500">NONCE_NOT_FOUND</h4>
            <p className="text-sm text-muted-foreground mt-1">
              The nonce has expired (5-minute TTL) or was already used. Request a new challenge.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border">
            <h4 className="font-semibold text-red-500">INVALID_SIGNATURE</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Verify the message format exactly matches (including newlines). Check that your
              signature scheme is ED25519, Secp256k1, or Secp256r1.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border">
            <h4 className="font-semibold text-red-500">MESSAGE_EXPIRED</h4>
            <p className="text-sm text-muted-foreground mt-1">
              The <code className="px-1 py-0.5 bg-secondary rounded text-sm">expirationTime</code> has passed.
              Request a new challenge.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border">
            <h4 className="font-semibold text-red-500">WALLET_ALREADY_REGISTERED</h4>
            <p className="text-sm text-muted-foreground mt-1">
              This wallet address is already linked to another user account.
              Use a different wallet or contact support.
            </p>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsQuickStart;
