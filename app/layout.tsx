import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Beyond Taleem - Your Guide to Education in Pakistan",
  description: "Explore, Compare, and Enroll in top schools, colleges, and universities across Pakistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"font-sans antialiased"} suppressHydrationWarning>
        <Providers>
          <Suspense fallback={
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                {children}
              </main>
            </div>
          }>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
