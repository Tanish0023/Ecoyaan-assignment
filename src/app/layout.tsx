
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "A beautiful, sustainable checkout experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-stone-50 text-stone-900 antialiased selection:bg-emerald-200`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                    E
                  </div>
                  <span className="font-semibold text-xl tracking-tight text-emerald-950">Ecoyaan</span>
                </div>
                <div className="text-sm font-medium text-stone-500">Secure Checkout</div>
              </div>
            </header>

            <main className="flex-grow">
              {children}
            </main>

          </div>
        </CartProvider>
      </body>
    </html>
  );
}
