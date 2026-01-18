import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  CodeBlock,
  Callout,
  Endpoint,
  ParameterTable,
  ResponseExample,
  DocsBadge,
} from "@/components/docs/DocsComponents";
import { Shield, Key, Globe, CheckCircle, XCircle } from "lucide-react";

const DocsAuthentication = () => {
  return (
    <DocsLayout
      title="Authentication"
      description="Secure your API requests with wallet signatures or zkLogin."
      lastUpdated="January 2026"
    >
      {/* Overview */}
      <section className="mb-12">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Method</th>
                <th className="py-3 px-4 text-left font-medium">Best For</th>
                <th className="py-3 px-4 text-left font-medium">Complexity</th>
                <th className="py-3 px-4 text-left font-medium">User Experience</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">
                  <DocsBadge variant="success">Wallet Signature</DocsBadge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">Web3 apps, dApps</td>
                <td className="py-3 px-4 text-muted-foreground">Low</td>
                <td className="py-3 px-4 text-muted-foreground">"Connect Wallet" button</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">
                  <DocsBadge variant="outline">zkLogin (Google)</DocsBadge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">Web2 apps, mobile</td>
                <td className="py-3 px-4 text-muted-foreground">Medium</td>
                <td className="py-3 px-4 text-muted-foreground">"Sign in with Google"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Wallet Signature Auth */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border flex items-center gap-3">
          <Key className="w-6 h-6" />
          Wallet Signature Authentication
        </h2>

        <p className="text-muted-foreground mb-6">
          The simplest authentication method for Web3 applications. Users prove wallet ownership
          by signing a message with their private key.
        </p>

        {/* Step 1: Get Challenge */}
        <h3 className="text-lg font-semibold mb-3">Step 1: Request Challenge</h3>
        <Endpoint method="GET" path="/auth/challenge" description="Request a login challenge nonce" />

        <ParameterTable
          title="Query Parameters"
          parameters={[
            {
              name: "address",
              type: "string",
              required: true,
              description: "Sui wallet address (0x-prefixed, 66 characters)",
            },
          ]}
        />

        <ResponseExample status={200} description="Success">
{`{
  "nonce": "a1b2c3d4e5f67890abcdef1234567890",
  "expiresAt": "2026-01-18T12:05:00.000Z",
  "domain": "hiddenpay.xyz"
}`}
        </ResponseExample>

        {/* Step 2: Sign Message */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 2: Sign Message</h3>
        <p className="text-muted-foreground mb-4">
          Construct and sign the authentication message with your wallet.
        </p>

        <CodeBlock language="javascript" title="Message Construction">
{`const message = \`Sign in to \${domain}

Address: \${address}
Nonce: \${nonce}
Issued At: \${new Date().toISOString()}
Expiration Time: \${expiresAt}\`;

// Sign with @mysten/sui
const { signature } = await keypair.signPersonalMessage(
  new TextEncoder().encode(message)
);`}
        </CodeBlock>

        <Callout type="warning" title="Supported Signature Schemes">
          <div className="mt-2 space-y-1">
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> ED25519
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Secp256k1
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Secp256r1
            </p>
            <p className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" /> MultiSig (not supported)
            </p>
            <p className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" /> zkLogin signatures (use zkLogin flow)
            </p>
          </div>
        </Callout>

        {/* Step 3: Verify */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 3: Verify Signature</h3>
        <Endpoint method="POST" path="/auth/verify" description="Verify signature and receive JWT token" />

        <ParameterTable
          title="Request Body"
          parameters={[
            { name: "address", type: "string", required: true, description: "Wallet address" },
            { name: "domain", type: "string", required: true, description: "Domain from challenge" },
            { name: "nonce", type: "string", required: true, description: "Nonce from challenge" },
            { name: "issuedAt", type: "string", required: true, description: "ISO timestamp when message was created" },
            { name: "expirationTime", type: "string", required: true, description: "Expiration from challenge" },
            { name: "message", type: "string", required: true, description: "Full signed message" },
            { name: "signature", type: "string", required: true, description: "Base64-encoded signature" },
          ]}
        />

        <ResponseExample status={200} description="Success">
{`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "needsOnboarding": true
}`}
        </ResponseExample>

        <ResponseExample status={401} description="Invalid Signature">
{`{
  "error_code": "INVALID_SIGNATURE",
  "message": "Signature verification failed"
}`}
        </ResponseExample>
      </section>

      {/* zkLogin Auth */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border flex items-center gap-3">
          <Globe className="w-6 h-6" />
          zkLogin Authentication (Google OAuth)
        </h2>

        <p className="text-muted-foreground mb-6">
          zkLogin combines Google OAuth with zero-knowledge proofs to derive a Sui wallet address
          from your Google account. No wallet extension required.
        </p>

        <Callout type="info" title="zkLogin Benefits">
          <ul className="mt-2 space-y-1">
            <li>• No wallet extension required</li>
            <li>• Familiar "Sign in with Google" UX</li>
            <li>• Deterministic address: Same Google = Same Sui address</li>
            <li>• Privacy: Google doesn't know your blockchain address</li>
          </ul>
        </Callout>

        {/* Step 1: Get zkLogin Challenge */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 1: Get zkLogin Challenge</h3>
        <Endpoint method="GET" path="/auth/zklogin/challenge" description="Get zkLogin challenge parameters" />

        <ResponseExample status={200} description="Success">
{`{
  "maxEpoch": "125",
  "domain": "hiddenpay.xyz",
  "expirationTime": "2026-01-18T12:05:00.000Z"
}`}
        </ResponseExample>

        {/* Step 2: Google OAuth */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 2: Google OAuth Flow</h3>
        <CodeBlock language="javascript" title="Redirect to Google">
{`const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
googleAuthUrl.searchParams.set('redirect_uri', YOUR_REDIRECT_URI);
googleAuthUrl.searchParams.set('response_type', 'id_token');
googleAuthUrl.searchParams.set('scope', 'openid email profile');
googleAuthUrl.searchParams.set('nonce', generateRandomNonce());

window.location.href = googleAuthUrl.toString();`}
        </CodeBlock>

        {/* Step 3: Get Salt */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 3: Get Salt (Derive Address)</h3>
        <Endpoint method="POST" path="/auth/zklogin/salt" description="Get salt and derive Sui address from Google ID token" />

        <ParameterTable
          title="Request Body"
          parameters={[
            { name: "idToken", type: "string", required: true, description: "Google OAuth ID token" },
          ]}
        />

        <ResponseExample status={200} description="Success">
{`{
  "salt": "base64EncodedSalt...",
  "address": "0xDerivedSuiAddress..."
}`}
        </ResponseExample>

        {/* Step 4: Register Nonce */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 4: Register Nonce</h3>
        <Endpoint method="POST" path="/auth/zklogin/register" description="Register nonce for zkLogin verification" />

        <ParameterTable
          title="Request Body"
          parameters={[
            { name: "nonce", type: "string", required: true, description: "Random nonce used in OAuth" },
          ]}
        />

        {/* Step 5: Verify */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Step 5: Verify & Get Token</h3>
        <Endpoint method="POST" path="/auth/zklogin/verify" description="Verify zkLogin proof and get JWT" />

        <ParameterTable
          title="Request Body"
          parameters={[
            { name: "idToken", type: "string", required: true, description: "Google OAuth ID token" },
            { name: "nonce", type: "string", required: true, description: "Registered nonce" },
            { name: "proof", type: "object", required: true, description: "Zero-knowledge proof from prover service" },
          ]}
        />

        <ResponseExample status={200} description="Success">
{`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}`}
        </ResponseExample>
      </section>

      {/* JWT Token Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border flex items-center gap-3">
          <Shield className="w-6 h-6" />
          Using JWT Tokens
        </h2>

        <p className="text-muted-foreground mb-4">
          All protected endpoints require a valid JWT token in the Authorization header.
        </p>

        <CodeBlock language="bash" title="Authorization Header">
{`curl -X GET "https://api.hiddenpay.xyz/api/users/profile" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mt-6 mb-3">Token Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">Expiration</td>
                <td className="py-3 px-4 text-muted-foreground">7 days from issuance</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">Algorithm</td>
                <td className="py-3 px-4 text-muted-foreground">HS256</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium">Payload</td>
                <td className="py-3 px-4 text-muted-foreground">
                  <code className="px-1 py-0.5 bg-secondary rounded text-xs">sub</code> (user ID or Google sub),{" "}
                  <code className="px-1 py-0.5 bg-secondary rounded text-xs">address</code> (wallet, optional)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="warning" title="Token Expiration">
          When a token expires, the API returns a 401 Unauthorized response.
          Your application should handle this by re-authenticating the user.
        </Callout>

        <CodeBlock language="javascript" title="Handle Token Expiration">
{`async function apiCall(endpoint) {
  const token = localStorage.getItem('jwt_token');
  const response = await fetch(endpoint, {
    headers: { 'Authorization': \`Bearer \${token}\` },
  });

  if (response.status === 401) {
    // Token expired - re-authenticate
    await reAuthenticate();
    return apiCall(endpoint); // Retry
  }

  return response.json();
}`}
        </CodeBlock>
      </section>

      {/* Security Best Practices */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Security Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10">
            <h4 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> DO
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Store tokens in httpOnly cookies or secure storage</li>
              <li>• Use HTTPS for all API calls</li>
              <li>• Validate token expiration client-side</li>
              <li>• Implement automatic re-authentication</li>
              <li>• Clear tokens on logout</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> DON'T
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Store tokens in localStorage (XSS risk)</li>
              <li>• Share tokens between users</li>
              <li>• Hardcode tokens in source code</li>
              <li>• Ignore 401 responses</li>
              <li>• Use expired tokens</li>
            </ul>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsAuthentication;
