# HiddenPay Wallet Hub

A privacy-first crypto payment platform built on the Sui blockchain. Send and receive payments using just a username.

## Features

- **Username-based Payments**: Send and receive crypto using human-readable usernames
- **Multi-Wallet Support**: Connect and manage multiple wallets from one interface
- **Privacy Control**: Keep your main vault private with burner wallets for daily use
- **Smart Routing**: Receive funds to your username, automatically routed to your default wallet
- **Instant Settlements**: Near-instant transaction finality on Sui blockchain

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Sui Blockchain

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hiddenpay-wallet-hub.git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── landing/     # Landing page components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── pages/           # Page components
```

## License

MIT
