import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WaiterProvider } from "@/context/WaiterContext";

export const metadata: Metadata = {
  title: "Tip Easyy",
  description: "A QR-based tipping solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <CartProvider>
          <WaiterProvider>
            {children}
          </WaiterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
