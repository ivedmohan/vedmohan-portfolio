# SmoothSend Homepage — Redesign Context

This document is for an AI agent tasked with redesigning the SmoothSend marketing homepage (`smoothsend-homepage./`). Read this fully before touching any code.

---

## What SmoothSend Actually Is

SmoothSend is **gasless transaction infrastructure for developers**. It lets dApp users submit blockchain transactions without holding native gas tokens — the developer sponsors gas costs via a credit-based prepaid system.

**This is a B2B developer tool, not a consumer product.** The primary audience is developers building dApps, games, payment apps, and AI agents — not end users sending crypto.

**The core value proposition:**
- 3 lines of code → all your users' transactions are gasless
- Developer pays credits, users pay zero gas
- Works on Aptos today, Solana coming soon

---

## Current Product Reality (April 2026)

### What's live and working
- **Aptos mainnet + testnet** — fully production ready
- **Two integration modes:**
  1. `SmoothSendTransactionSubmitter` — any Aptos transaction, gasless via fee payer pattern. Requires credits on mainnet.
  2. Script Composer — token transfers (USDC, USDT) where the $0.01 fee is deducted from the token itself. Free tier, no credits needed.
- **Per-function sponsorship** — developers whitelist which functions to sponsor. Others fall back to user-pays-gas.
- **Developer revenue share** — developers who use Script Composer earn $0.005 per transfer by adding their wallet address in the dashboard.
- **SDK** — `@smoothsend/sdk` on npm, `SmoothSendTransactionSubmitter`, `useSmoothSend` hook, `ScriptComposerClient`
- **Dashboard** — `dashboard.smoothsend.xyz` — API keys, project settings, usage analytics, credit top-up
- **Credits model** — `MAX(gas_cost × 1.5, $0.01)` per mainnet tx. Testnet always free.

### What's coming (don't promise dates)
- **Solana support** — same model, same SDK, same credits. "Coming soon."
- **Session keys** — user signs once, all subsequent transactions silent. Waiting on Aptos mainnet feature flag.

### What's NOT the product anymore
- ERC-4337 on Avalanche/Base/Arbitrum — this was an earlier experiment, not the current focus. Remove or heavily de-emphasize.
- The homepage currently leads with EVM chains. This is wrong. Aptos is the product.

---

## The Audience

**Primary:** Developers building on Aptos (and soon Solana)
- Game developers who want no wallet popups
- Payment app developers (WhatsApp bots, fintech)
- DeFi protocol developers
- AI agent developers

**Secondary:** Developers evaluating gasless solutions
- Comparing to Geomi (Aptos official), Kora (Solana), Biconomy (EVM)

**Not the audience:** End users, crypto traders, NFT collectors

---

## Messaging That Works

**Hero headline options (pick one direction):**
- "Gasless transactions. 3 lines of code."
- "Your users never pay gas. You never write gas logic."
- "Gasless transactions for humans and agents."

**Subheadline:** Something that explains the developer value — credits model, any transaction type, Aptos + Solana.

**What to emphasize:**
- Simplicity — 3 lines of code, drop-in SDK
- Developer revenue share — earn from your users' transfers (unique differentiator)
- Agents — AI agents can transact with zero SOL/APT, pay fees in USDC
- Testnet is free — no risk to try

**What to avoid:**
- "ERC-4337 account abstraction" — jargon, not the product
- Fake stats — the current homepage has made-up transaction counts and gas saved numbers. Remove them or replace with real ones.
- Consumer framing — "send USDC in 4 steps" is wrong. This is for developers.

---

## Current Homepage Problems to Fix

1. **Hero** — leads with EVM chains and ERC-4337. Wrong product, wrong audience.
2. **Features section** — mentions "four chains: Aptos, Avalanche, Base, Arbitrum" equally. Aptos is the product, EVM is legacy.
3. **Chain showcase** — shows Avalanche/Base/Arbitrum with fake stats. Replace with Aptos (live) + Solana (coming soon).
4. **How It Works** — framed as a consumer flow ("connect wallet, enter amount"). Should be developer-focused ("integrate SDK, configure allowlist, done").
5. **Testimonials** — only one real tweet. Either find more real ones or replace with a code snippet / integration example that speaks for itself.
6. **Stats** — "980K+ transactions", "$420K gas saved" etc. are clearly fabricated. Remove or replace with honest numbers.
7. **Pilot banner** — check if still relevant.

---

## What the Redesigned Homepage Should Have

### 1. Hero
- Strong developer-focused headline
- One-liner subtext explaining the model
- Two CTAs: "Get API Key" (→ dashboard.smoothsend.xyz) and "Read Docs" (→ docs.smoothsend.xyz)
- Optional: a minimal code snippet showing the 3-line integration

### 2. How It Works (developer framing)
```
1. Install SDK — npm install @smoothsend/sdk
2. Add 3 lines — SmoothSendTransactionSubmitter in your wallet provider
3. Done — all your users' transactions are gasless
```

### 3. Features (honest, developer-focused)
- Any Aptos transaction — swaps, NFTs, contract calls, transfers
- Per-function control — whitelist only the functions you want to sponsor
- Developer revenue share — earn $0.005 per Script Composer transfer
- Agents — AI agents pay fees in USDC, zero native token needed
- Testnet free — no credit card, no risk

### 4. Chain Support
- **Aptos** — Live (mainnet + testnet)
- **Solana** — Coming soon
- Remove EVM chains or move to a footnote ("EVM support via ERC-4337 bundler — contact us")

### 5. Code Example
Show the actual 3-line integration. This is the strongest proof of simplicity:
```tsx
const smoothSend = new SmoothSendTransactionSubmitter({
  apiKey: process.env.NEXT_PUBLIC_SMOOTHSEND_API_KEY,
  network: 'mainnet',
});
// Pass to AptosWalletAdapterProvider as transactionSubmitter
// That's it. All transactions are now gasless.
```

### 6. Social Proof
- The one real tweet from Bacardi Sharma — keep it
- If no other real testimonials, replace the section with a "Built for" section showing use cases (games, payment apps, AI agents)

### 7. CTA Section
- "Start free on testnet" → dashboard.smoothsend.xyz
- "Read the docs" → docs.smoothsend.xyz

---

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- shadcn/ui components
- Dark theme (keep — it fits the developer audience)

---

## Links

- Dashboard: https://dashboard.smoothsend.xyz
- Docs: https://docs.smoothsend.xyz
- npm: https://www.npmjs.com/package/@smoothsend/sdk
- Demo (Aptos): https://aptos.smoothsend.xyz

---

## What NOT to Change

- The dark theme and overall visual style — it's fine
- The scroll story / animation structure — keep if it works, simplify if it doesn't
- Footer links
- Privacy/Terms pages

---

## Priority Order

1. Fix the hero — wrong product, wrong audience
2. Fix the chain showcase — remove fake stats, add Solana coming soon
3. Fix How It Works — developer framing, add code snippet
4. Fix Features — remove EVM/ERC-4337 references, add revenue share + agents
5. Testimonials — keep the real tweet, remove or replace fake ones
6. Remove all fabricated statistics
