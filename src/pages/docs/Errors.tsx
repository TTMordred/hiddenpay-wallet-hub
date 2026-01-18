import { DocsLayout } from "@/components/docs/DocsLayout";
import { CodeBlock, Callout, DocsBadge } from "@/components/docs/DocsComponents";
import { AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ErrorCode {
  code: string;
  httpStatus: number;
  message: string;
  resolution: string;
  category: string;
}

const errorCodes: ErrorCode[] = [
  // Authentication Errors
  {
    code: "INVALID_SIGNATURE",
    httpStatus: 401,
    message: "Signature verification failed",
    resolution: "Ensure the message format is exact (including newlines) and the signature scheme is supported (ED25519, Secp256k1, Secp256r1)",
    category: "Authentication",
  },
  {
    code: "NONCE_NOT_FOUND",
    httpStatus: 401,
    message: "Challenge nonce not found or expired",
    resolution: "Request a new challenge. Nonces expire after 5 minutes.",
    category: "Authentication",
  },
  {
    code: "MESSAGE_EXPIRED",
    httpStatus: 401,
    message: "Authentication message has expired",
    resolution: "The expirationTime has passed. Request a new challenge.",
    category: "Authentication",
  },
  {
    code: "UNSUPPORTED_SIGNATURE_SCHEME",
    httpStatus: 400,
    message: "Signature scheme not supported",
    resolution: "Use ED25519, Secp256k1, or Secp256r1. MultiSig and Passkey are not supported.",
    category: "Authentication",
  },
  {
    code: "UNAUTHORIZED",
    httpStatus: 401,
    message: "Authentication required",
    resolution: "Include a valid JWT token in the Authorization header: 'Bearer YOUR_TOKEN'",
    category: "Authentication",
  },
  {
    code: "TOKEN_EXPIRED",
    httpStatus: 401,
    message: "JWT token has expired",
    resolution: "Re-authenticate to obtain a new token. Tokens expire after 7 days.",
    category: "Authentication",
  },

  // User Errors
  {
    code: "USER_NOT_FOUND",
    httpStatus: 404,
    message: "User not found",
    resolution: "Verify the username or wallet address exists in the system.",
    category: "Users",
  },
  {
    code: "USERNAME_ALREADY_EXISTS",
    httpStatus: 409,
    message: "Username is already taken",
    resolution: "Choose a different username.",
    category: "Users",
  },
  {
    code: "WALLET_ALREADY_REGISTERED",
    httpStatus: 409,
    message: "Wallet address already linked to another user",
    resolution: "Use a different wallet or contact support if this is your wallet.",
    category: "Users",
  },
  {
    code: "ONBOARDING_ALREADY_COMPLETED",
    httpStatus: 400,
    message: "User has already completed onboarding",
    resolution: "Onboarding can only be done once. Use profile update endpoints instead.",
    category: "Users",
  },
  {
    code: "KYC_NOT_APPROVED",
    httpStatus: 403,
    message: "KYC verification required for this action",
    resolution: "Complete KYC verification before attempting transfers.",
    category: "Users",
  },

  // Wallet Errors
  {
    code: "WALLET_NOT_FOUND",
    httpStatus: 404,
    message: "Wallet not found",
    resolution: "Verify the wallet ID exists and belongs to the authenticated user.",
    category: "Wallets",
  },
  {
    code: "INVALID_WALLET_ADDRESS",
    httpStatus: 400,
    message: "Invalid wallet address format",
    resolution: "Ensure the address is valid for the specified chain.",
    category: "Wallets",
  },
  {
    code: "INVALID_QR_STRING",
    httpStatus: 400,
    message: "Invalid or malformed QR string",
    resolution: "Ensure the QR string is a valid VietQR format.",
    category: "Wallets",
  },
  {
    code: "UNSUPPORTED_BANK",
    httpStatus: 400,
    message: "Bank not supported",
    resolution: "Check the list of supported banks. Currently supports Vietnam (VietQR) and Philippines banks.",
    category: "Wallets",
  },

  // Payment Errors
  {
    code: "ORDER_NOT_FOUND",
    httpStatus: 404,
    message: "Payment order not found",
    resolution: "Verify the order ID is correct and belongs to the authenticated user.",
    category: "Payments",
  },
  {
    code: "ORDER_ALREADY_CONFIRMED",
    httpStatus: 400,
    message: "Payment order has already been confirmed",
    resolution: "This order has already been processed. Check order status or create a new order.",
    category: "Payments",
  },
  {
    code: "ORDER_CANCELLED",
    httpStatus: 400,
    message: "Payment order has been cancelled",
    resolution: "Create a new payment order to proceed.",
    category: "Payments",
  },
  {
    code: "RECEIVED_AMOUNT_TOO_LOW",
    httpStatus: 400,
    message: "Received USDC amount is less than expected",
    resolution: "Send additional USDC to cover the shortfall or create a new order with the correct amount.",
    category: "Payments",
  },
  {
    code: "TRANSACTION_NOT_FOUND",
    httpStatus: 400,
    message: "Transaction not found on blockchain",
    resolution: "Wait for transaction to be indexed (can take a few seconds) and retry.",
    category: "Payments",
  },
  {
    code: "INVALID_TRANSACTION",
    httpStatus: 400,
    message: "Transaction validation failed",
    resolution: "Ensure the transaction sent USDC to the correct partner wallet address.",
    category: "Payments",
  },
  {
    code: "GAIAN_PLACE_ORDER_PREFUND_FAILED",
    httpStatus: 500,
    message: "Failed to initiate bank transfer via Gaian",
    resolution: "Contact support. Your crypto has been received but bank transfer needs manual intervention.",
    category: "Payments",
  },
  {
    code: "DUPLICATE_CLIENT_REQUEST_ID",
    httpStatus: 409,
    message: "Client request ID already used",
    resolution: "Use a unique clientRequestId for each new payment order.",
    category: "Payments",
  },

  // Transfer Errors
  {
    code: "UNKNOWN_QR_TYPE",
    httpStatus: 400,
    message: "Unable to determine QR code type",
    resolution: "The scanned data is not a recognized format (username, wallet, or VietQR).",
    category: "Transfer",
  },
  {
    code: "RECIPIENT_NOT_FOUND",
    httpStatus: 404,
    message: "Transfer recipient not found",
    resolution: "Verify the recipient username or wallet address exists.",
    category: "Transfer",
  },
  {
    code: "INSUFFICIENT_BALANCE",
    httpStatus: 400,
    message: "Insufficient USDC balance",
    resolution: "Ensure your wallet has enough USDC to complete the transfer.",
    category: "Transfer",
  },

  // KYC Errors
  {
    code: "KYC_ALREADY_STARTED",
    httpStatus: 400,
    message: "KYC process already initiated",
    resolution: "Check KYC status. If rejected, wait before retrying.",
    category: "KYC",
  },
  {
    code: "KYC_VERIFICATION_FAILED",
    httpStatus: 400,
    message: "KYC verification was rejected",
    resolution: "Review rejection reason and resubmit with correct documents.",
    category: "KYC",
  },

  // General Errors
  {
    code: "VALIDATION_ERROR",
    httpStatus: 400,
    message: "Request validation failed",
    resolution: "Check the error details for specific field validation issues.",
    category: "General",
  },
  {
    code: "RATE_LIMITED",
    httpStatus: 429,
    message: "Too many requests",
    resolution: "Wait before retrying. Implement exponential backoff.",
    category: "General",
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    httpStatus: 500,
    message: "An unexpected error occurred",
    resolution: "Retry the request. If the issue persists, contact support.",
    category: "General",
  },
];

const DocsErrors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(errorCodes.map((e) => e.category))];

  const filteredErrors = errorCodes.filter((error) => {
    const matchesSearch =
      error.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      error.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || error.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: number) => {
    if (status >= 500) return "text-red-500 bg-red-500/20";
    if (status >= 400) return "text-yellow-500 bg-yellow-500/20";
    return "text-green-500 bg-green-500/20";
  };

  return (
    <DocsLayout
      title="Error Codes"
      description="Comprehensive reference for all API error codes and their resolutions."
      lastUpdated="January 2026"
    >
      {/* Error Response Format */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Error Response Format
        </h2>
        <p className="text-muted-foreground mb-4">
          All API errors follow a consistent response format:
        </p>

        <CodeBlock language="json" title="Error Response Structure">
{`{
  "error_code": "ERROR_CODE_HERE",
  "message": "Human-readable error description",
  "details": {
    // Optional: Additional context about the error
  }
}`}
        </CodeBlock>

        <Callout type="info" title="HTTP Status Codes">
          <ul className="mt-2 space-y-1">
            <li>• <strong>400</strong> - Bad Request (validation errors, invalid input)</li>
            <li>• <strong>401</strong> - Unauthorized (authentication required or failed)</li>
            <li>• <strong>403</strong> - Forbidden (insufficient permissions)</li>
            <li>• <strong>404</strong> - Not Found (resource doesn't exist)</li>
            <li>• <strong>409</strong> - Conflict (duplicate or conflicting operation)</li>
            <li>• <strong>429</strong> - Rate Limited (too many requests)</li>
            <li>• <strong>500</strong> - Internal Server Error (unexpected error)</li>
          </ul>
        </Callout>
      </section>

      {/* Search & Filter */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search error codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-colors",
                !selectedCategory
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Error Codes List */}
      <section>
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredErrors.length} of {errorCodes.length} error codes
        </div>

        <div className="space-y-4">
          {filteredErrors.map((error) => (
            <div
              key={error.code}
              className="p-4 rounded-xl border border-border bg-card hover:border-foreground/10 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <code className="font-mono font-semibold text-sm">{error.code}</code>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-bold",
                      getStatusColor(error.httpStatus)
                    )}
                  >
                    {error.httpStatus}
                  </span>
                  <DocsBadge variant="outline">{error.category}</DocsBadge>
                </div>
              </div>

              <p className="text-sm font-medium mb-2">{error.message}</p>

              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Resolution: </strong>
                {error.resolution}
              </div>
            </div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No error codes match your search.</p>
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 pb-2 border-b border-border">
          Error Handling Best Practices
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Always Check error_code</h3>
            <p className="text-muted-foreground mb-3">
              Use the <code className="px-1 py-0.5 bg-secondary rounded text-xs">error_code</code> field
              for programmatic error handling, not the message.
            </p>
            <CodeBlock language="javascript" title="Error Handling Example">
{`try {
  const response = await api.createOrder(orderData);
} catch (error) {
  switch (error.error_code) {
    case 'KYC_NOT_APPROVED':
      showKycPrompt();
      break;
    case 'RECEIVED_AMOUNT_TOO_LOW':
      showAmountShortfallDialog(error.details);
      break;
    case 'RATE_LIMITED':
      await wait(error.retryAfter || 5000);
      return retry();
    default:
      showGenericError(error.message);
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Implement Retry Logic</h3>
            <p className="text-muted-foreground mb-3">
              For transient errors (429, 500), implement exponential backoff.
            </p>
            <CodeBlock language="javascript" title="Retry with Backoff">
{`async function withRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.httpStatus === 429 || error.httpStatus >= 500) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Log Errors for Debugging</h3>
            <p className="text-muted-foreground">
              Always log the full error response including <code className="px-1 py-0.5 bg-secondary rounded text-xs">details</code> for debugging purposes.
              Include timestamps and request IDs when available.
            </p>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsErrors;
