import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StatusBanner } from "../components/status-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Package Forge",
  description: "Generate full-stack apps with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <StatusBanner />
      </body>
    </html>
  );
}
