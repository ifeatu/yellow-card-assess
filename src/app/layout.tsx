import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yellow Card Assess | Free CMMC Readiness Scorecard",
  description:
    "Find out if your company is ready for CMMC Level 2 certification. Free 10-minute readiness scorecard for defense contractors.",
  openGraph: {
    title: "Yellow Card Assess | Free CMMC Readiness Scorecard",
    description:
      "Find out if your company is ready for CMMC Level 2 certification in 10 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
