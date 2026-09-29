import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeScript } from "@/components/layout/theme-script";
import { SessionProvider } from "@/components/auth/session-provider";
import { ProgressSync } from "@/components/auth/progress-sync";
import { ProgressProvider } from "@/lib/progress/progress-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Stock Market Fundamentals — Learn from Zero",
    template: "%s · MarketLearn",
  },
  description:
    "An interactive course that takes you from understanding your first share to analysing a company's fundamentals — with calculators, simulators and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <ProgressProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
              <SiteFooter />
            </div>
            {/* Invisible: keeps browser progress and the account in step. */}
            <ProgressSync />
          </ProgressProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
