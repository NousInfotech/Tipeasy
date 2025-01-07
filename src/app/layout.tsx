import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import { WaiterProvider } from "@/app/context/WaiterContext";
import { ToastContainer } from "react-toastify";

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
      <head>
        {/* Add the Razorpay Checkout script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="antialiased">
        <ToastContainer />
        <CartProvider>
          <WaiterProvider>
            {children}
          </WaiterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
