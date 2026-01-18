import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  CodeBlock,
  Callout,
  Endpoint,
  ParameterTable,
  ResponseExample,
  DocsBadge,
} from "@/components/docs/DocsComponents";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DocsApiReference = () => {
  const [activeSection, setActiveSection] = useState("users");

  const sections = [
    { id: "users", label: "Users & Profile" },
    { id: "wallets", label: "Wallets" },
    { id: "payments", label: "Payments" },
    { id: "transfer", label: "Transfer & QR" },
    { id: "kyc", label: "KYC" },
  ];

  return (
    <DocsLayout
      title="API Reference"
      description="Complete endpoint documentation with request/response examples."
      lastUpdated="January 2026"
    >
      {/* Base URL */}
      <Callout type="info" title="Base URL">
        All API requests should be made to:{" "}
        <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-sm">
          https://api.hiddenpay.xyz/api
        </code>
      </Callout>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 my-6 pb-4 border-b border-border">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeSection === section.id
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Users Section */}
      {activeSection === "users" && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Users & Profile</h2>

          {/* Get Profile */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Get Current User Profile</h3>
            <Endpoint method="GET" path="/users/profile" description="Retrieve the authenticated user's complete profile" />

            <Callout type="note">
              Requires <DocsBadge variant="outline">Authorization: Bearer TOKEN</DocsBadge>
            </Callout>

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
  "loyaltyTier": "plus",
  "commissionBalance": 50000,
  "onchainWallets": [
    {
      "id": "wallet-123",
      "address": "0xabc...",
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
  ],
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-18T12:00:00.000Z"
}`}
            </ResponseExample>
          </div>

          {/* Onboarding */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Complete Onboarding</h3>
            <Endpoint method="POST" path="/users/onboarding" description="Set username and optional referral" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "username", type: "string", required: true, description: "Unique username (3-20 chars, alphanumeric + underscore)" },
                { name: "email", type: "string", required: false, description: "User email address" },
                { name: "referralUsername", type: "string", required: false, description: "Referrer's username" },
              ]}
            />

            <CodeBlock language="json" title="Request Body">
{`{
  "username": "alice",
  "email": "alice@example.com",
  "referralUsername": "bob"
}`}
            </CodeBlock>

            <ResponseExample status={200} description="Success">
{`{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "email": "alice@example.com",
  "referrerId": "660e8400-e29b-41d4-a716-446655440001"
}`}
            </ResponseExample>

            <ResponseExample status={409} description="Username Taken">
{`{
  "error_code": "USERNAME_ALREADY_EXISTS",
  "message": "Username 'alice' is already taken"
}`}
            </ResponseExample>
          </div>

          {/* Lookup User */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Lookup User by Username</h3>
            <Endpoint method="GET" path="/users/lookup/:username" description="Find a user by their username" />

            <ResponseExample status={200} description="Success">
{`{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "defaultWallet": {
    "id": "wallet-123",
    "type": "onchain",
    "address": "0xabc...",
    "chain": "sui"
  }
}`}
            </ResponseExample>

            <ResponseExample status={404} description="User Not Found">
{`{
  "error_code": "USER_NOT_FOUND",
  "message": "User with username 'nonexistent' not found"
}`}
            </ResponseExample>
          </div>
        </section>
      )}

      {/* Wallets Section */}
      {activeSection === "wallets" && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Wallets</h2>

          {/* Onchain Wallets */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">List Onchain Wallets</h3>
            <Endpoint method="GET" path="/wallets/onchain" description="Get all onchain wallets for the current user" />

            <ResponseExample status={200} description="Success">
{`{
  "wallets": [
    {
      "id": "wallet-123",
      "address": "0x1234567890abcdef...",
      "chain": "sui",
      "label": "Main Wallet",
      "isDefault": true,
      "createdAt": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": "wallet-456",
      "address": "0xeth...",
      "chain": "ethereum",
      "label": "ETH Wallet",
      "isDefault": false,
      "createdAt": "2026-01-15T00:00:00.000Z"
    }
  ]
}`}
            </ResponseExample>
          </div>

          {/* Add Onchain Wallet */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Add Onchain Wallet</h3>
            <Endpoint method="POST" path="/wallets/onchain" description="Register a new onchain wallet" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "address", type: "string", required: true, description: "Wallet address" },
                { name: "chain", type: "string", required: true, description: "Blockchain (sui, ethereum, polygon, etc.)" },
                { name: "label", type: "string", required: false, description: "Friendly label for the wallet" },
              ]}
            />

            <ResponseExample status={201} description="Created">
{`{
  "id": "wallet-789",
  "address": "0xnewwallet...",
  "chain": "polygon",
  "label": "Polygon Wallet",
  "isDefault": false
}`}
            </ResponseExample>
          </div>

          {/* Offchain Wallets */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">List Offchain Wallets (Bank Accounts)</h3>
            <Endpoint method="GET" path="/wallets/offchain" description="Get all bank accounts for the current user" />

            <ResponseExample status={200} description="Success">
{`{
  "wallets": [
    {
      "id": "bank-123",
      "bankCode": "VCB",
      "bankName": "Vietcombank",
      "accountNumber": "1234567890",
      "accountName": "NGUYEN VAN A",
      "qrString": "00020101021138...",
      "isDefault": true,
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}`}
            </ResponseExample>
          </div>

          {/* Add Offchain Wallet */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Add Offchain Wallet (Bank Account)</h3>
            <Endpoint method="POST" path="/wallets/offchain" description="Register a new bank account via VietQR" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "qrString", type: "string", required: true, description: "VietQR-formatted bank QR string" },
              ]}
            />

            <Callout type="info">
              The QR string is parsed to extract bank code, account number, and other details automatically.
            </Callout>

            <ResponseExample status={201} description="Created">
{`{
  "id": "bank-456",
  "bankCode": "TCB",
  "bankName": "Techcombank",
  "accountNumber": "0987654321",
  "accountName": "TRAN VAN B",
  "qrString": "00020101021138...",
  "isDefault": false
}`}
            </ResponseExample>
          </div>

          {/* Set Default */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Set Default Wallet</h3>
            <Endpoint method="PATCH" path="/wallets/default" description="Set a wallet as the default receive wallet" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "walletId", type: "string", required: true, description: "ID of wallet to set as default" },
              ]}
            />

            <Callout type="warning">
              Only ONE wallet can be the default across all wallet types (onchain + offchain).
            </Callout>
          </div>
        </section>
      )}

      {/* Payments Section */}
      {activeSection === "payments" && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Payments</h2>

          {/* Create Order */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Create Payment Order</h3>
            <Endpoint method="POST" path="/payments/orders" description="Create a new prefund payment order" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "qrString", type: "string", required: true, description: "VietQR bank QR of recipient" },
                { name: "usdcAmount", type: "number", required: true, description: "Amount of USDC to send" },
                { name: "payerWalletAddress", type: "string", required: true, description: "Your Sui wallet address" },
                { name: "fiatCurrency", type: "string", required: false, description: "Target fiat currency (VND, PHP). Default: VND" },
                { name: "clientRequestId", type: "string", required: false, description: "Unique ID for idempotency" },
              ]}
            />

            <CodeBlock language="json" title="Request Body">
{`{
  "qrString": "00020101021138...",
  "usdcAmount": 10,
  "payerWalletAddress": "0x1234...",
  "fiatCurrency": "VND",
  "clientRequestId": "payment-20260118-001"
}`}
            </CodeBlock>

            <ResponseExample status={201} description="Created">
{`{
  "id": "order-clx123456",
  "status": "AWAITING_USER_PAYMENT",
  "exchangeInfo": {
    "exchangeRate": 25500,
    "cryptoAmount": "9.8",
    "feePercent": "1.5",
    "feeAmount": "0.15"
  },
  "hiddenWallet": {
    "feePercent": "0.2",
    "feeRate": 0.002,
    "feeAmount": 19999,
    "amountBeforeFee": 9800000,
    "amountWithFee": 9820000
  },
  "paymentInstruction": {
    "toAddress": "0xPARTNER_WALLET...",
    "coinType": "0xa1ec...::usdc::USDC",
    "totalCrypto": "9.82",
    "totalCryptoRaw": "9820000",
    "totalPayout": 250000
  },
  "payout": {
    "fiatCurrency": "VND"
  }
}`}
            </ResponseExample>
          </div>

          {/* Confirm Payment */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Confirm User Payment</h3>
            <Endpoint method="POST" path="/payments/orders/:id/confirm-user-payment" description="Submit transaction hash after sending USDC" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "userPaymentTxDigest", type: "string", required: true, description: "Sui transaction digest (hash)" },
              ]}
            />

            <ResponseExample status={200} description="Success">
{`{
  "id": "order-clx123456",
  "status": "CONFIRMED_GAIAN_PAYMENT",
  "gaianOrderId": "gaian-order-789",
  "userPaymentTxDigest": "0xTRANSACTION_HASH...",
  "userPaymentVerifiedAt": "2026-01-18T12:00:00.000Z",
  "bankTransferStatus": "PROCESSING"
}`}
            </ResponseExample>

            <ResponseExample status={400} description="Insufficient Amount">
{`{
  "error_code": "RECEIVED_AMOUNT_TOO_LOW",
  "message": "Received amount (9500000) is less than expected (9820000)",
  "details": {
    "expectedRaw": "9820000",
    "receivedRaw": "9500000",
    "shortfallRaw": "320000"
  }
}`}
            </ResponseExample>
          </div>

          {/* Sync Order */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Sync Order Status</h3>
            <Endpoint method="POST" path="/payments/orders/:id/sync" description="Fetch latest status from Gaian" />

            <ResponseExample status={200} description="Success">
{`{
  "id": "order-clx123456",
  "status": "COMPLETED",
  "bankTransferStatus": "COMPLETED",
  "bankTransactionReference": {
    "transactionId": "VCB123456789",
    "completedAt": "2026-01-18T12:05:00.000Z"
  }
}`}
            </ResponseExample>
          </div>

          {/* Order History */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Get Order History</h3>
            <Endpoint method="GET" path="/payments/orders" description="List all orders for the current user" />

            <ParameterTable
              title="Query Parameters"
              parameters={[
                { name: "status", type: "string", required: false, description: "Filter by status" },
                { name: "limit", type: "number", required: false, description: "Max results (default: 20)" },
                { name: "offset", type: "number", required: false, description: "Pagination offset" },
              ]}
            />
          </div>
        </section>
      )}

      {/* Transfer Section */}
      {activeSection === "transfer" && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Transfer & QR</h2>

          {/* Scan QR */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
            <Endpoint method="POST" path="/transfer/scan-qr" description="Scan and resolve QR code or identifier" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "data", type: "string", required: true, description: "QR content, username, or wallet address" },
              ]}
            />

            <p className="text-muted-foreground mb-4">
              The endpoint auto-detects the type of data and returns appropriate information.
            </p>

            <h4 className="font-semibold mb-2">Example: Username</h4>
            <CodeBlock language="json" title="Request">
{`{ "data": "@alice" }`}
            </CodeBlock>
            <ResponseExample status={200} description="Success">
{`{
  "type": "username",
  "user": {
    "userId": "550e8400...",
    "username": "alice",
    "defaultWallet": {
      "type": "onchain",
      "address": "0xabc..."
    }
  }
}`}
            </ResponseExample>

            <h4 className="font-semibold mt-6 mb-2">Example: VietQR</h4>
            <CodeBlock language="json" title="Request">
{`{ "data": "00020101021138..." }`}
            </CodeBlock>
            <ResponseExample status={200} description="Success">
{`{
  "type": "vietqr",
  "bankInfo": {
    "bankCode": "VCB",
    "bankName": "Vietcombank",
    "accountNumber": "1234567890",
    "accountName": "NGUYEN VAN A"
  },
  "user": null
}`}
            </ResponseExample>

            <h4 className="font-semibold mt-6 mb-2">Example: Wallet Address</h4>
            <CodeBlock language="json" title="Request">
{`{ "data": "0x1234567890abcdef..." }`}
            </CodeBlock>
            <ResponseExample status={200} description="Success">
{`{
  "type": "wallet_address",
  "address": "0x1234567890abcdef...",
  "user": {
    "userId": "660e8400...",
    "username": "bob"
  }
}`}
            </ResponseExample>
          </div>

          {/* Transfer Preview */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Transfer Preview</h3>
            <Endpoint method="POST" path="/transfer/preview" description="Preview a transfer before executing" />

            <ParameterTable
              title="Request Body"
              parameters={[
                { name: "recipientType", type: "string", required: true, description: "onchain | offchain" },
                { name: "recipientId", type: "string", required: true, description: "Wallet ID or user ID" },
                { name: "amount", type: "number", required: true, description: "Amount in USDC" },
              ]}
            />

            <ResponseExample status={200} description="Success">
{`{
  "recipient": {
    "type": "offchain",
    "bankName": "Vietcombank",
    "accountNumber": "****7890"
  },
  "exchangeRate": 25500,
  "fiatAmount": 255000,
  "fees": {
    "gaianFee": 3825,
    "hiddenWalletFee": 510,
    "totalFees": 4335
  },
  "totalUsdc": 10.17
}`}
            </ResponseExample>
          </div>
        </section>
      )}

      {/* KYC Section */}
      {activeSection === "kyc" && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">KYC Integration</h2>

          <Callout type="info">
            KYC verification is handled by Gaian. HiddenPay provides wrapper endpoints
            to initiate and check KYC status.
          </Callout>

          {/* Start KYC */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Start KYC Process</h3>
            <Endpoint method="POST" path="/kyc/start" description="Initiate KYC verification with Gaian" />

            <ResponseExample status={200} description="Success">
{`{
  "kycUrl": "https://gaian.io/kyc/verify?token=...",
  "expiresAt": "2026-01-18T13:00:00.000Z"
}`}
            </ResponseExample>

            <p className="text-sm text-muted-foreground mt-3">
              Redirect the user to <code className="px-1 py-0.5 bg-secondary rounded text-xs">kycUrl</code> to complete verification.
            </p>
          </div>

          {/* Check KYC Status */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">Check KYC Status</h3>
            <Endpoint method="GET" path="/kyc/status" description="Get current KYC verification status" />

            <ResponseExample status={200} description="Success">
{`{
  "status": "approved",
  "verifiedAt": "2026-01-15T10:30:00.000Z",
  "canTransfer": true
}`}
            </ResponseExample>

            <h4 className="font-semibold mt-4 mb-2">KYC Status Values</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3 text-left">Status</th>
                    <th className="py-2 px-3 text-left">Description</th>
                    <th className="py-2 px-3 text-left">Can Transfer?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3"><DocsBadge variant="outline">not started</DocsBadge></td>
                    <td className="py-2 px-3 text-muted-foreground">KYC not initiated</td>
                    <td className="py-2 px-3 text-red-500">No</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3"><DocsBadge variant="warning">pending</DocsBadge></td>
                    <td className="py-2 px-3 text-muted-foreground">Verification in progress</td>
                    <td className="py-2 px-3 text-red-500">No</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3"><DocsBadge variant="success">approved</DocsBadge></td>
                    <td className="py-2 px-3 text-muted-foreground">Verification successful</td>
                    <td className="py-2 px-3 text-green-500">Yes</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3"><DocsBadge variant="error">rejected</DocsBadge></td>
                    <td className="py-2 px-3 text-muted-foreground">Verification failed</td>
                    <td className="py-2 px-3 text-red-500">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* KYC Webhook */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">KYC Status Webhook</h3>
            <Endpoint method="POST" path="/kyc/webhook" description="Gaian webhook for KYC status updates (internal)" />

            <Callout type="note">
              This endpoint is called by Gaian to notify HiddenPay of KYC status changes.
              Partners should poll <code className="px-1 py-0.5 bg-secondary rounded text-xs">/kyc/status</code> or
              implement their own webhook handler.
            </Callout>
          </div>
        </section>
      )}
    </DocsLayout>
  );
};

export default DocsApiReference;
