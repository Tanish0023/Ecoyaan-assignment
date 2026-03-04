# Ecoyaan Checkout Flow

A simplified, multi-step checkout flow built for the Ecoyaan frontend engineering assessment.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: React Context API (`CartContext`)
- **Form Validation**: `react-hook-form` + `zod`
- **Icons**: `lucide-react`

## Architecture

### SSR Data Fetching
The cart page (`/`) is a **Next.js Server Component** that calls `fetchCartData()` (a server action simulating an async API fetch) and passes the result as props to the client component — demonstrating SSR without `getServerSideProps` via the App Router pattern.

### State Management
`CartContext` (React Context API) persists cart items, shipping fee, and the entered shipping address across all checkout screens. This avoids prop drilling across the multi-step flow.

### Form Validation
The shipping address form uses `react-hook-form` with a `zod` schema for declarative, type-safe validation. Each field renders error messages via shadcn's `FormMessage` component.

### Component Structure

```
src/
├── actions/
│   └── cart.ts             # Server action (mock API)
├── app/
│   ├── page.tsx            # Cart page (SSR Server Component)
│   ├── checkout/
│   │   ├── address/page.tsx
│   │   ├── payment/page.tsx
│   │   └── success/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── cart/CartClient.tsx
│   ├── checkout/
│   │   ├── AddressForm.tsx
│   │   └── PaymentScreen.tsx
│   └── ui/                 # shadcn/ui components
└── context/
    └── CartContext.tsx
```

## Checkout Flow

1. **`/`** — Cart page: renders product list with subtotal/shipping/grand total. Data fetched via SSR.
2. **`/checkout/address`** — Shipping form with Zod validation (name, email, 10-digit phone, PIN code, city, state).
3. **`/checkout/payment`** — Final summary of items and address. "Pay Securely Now" simulates a 2s payment delay.
4. **`/checkout/success`** — Order confirmation page.

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```
# Ecoyaan-assignment
