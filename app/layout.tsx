import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthne | By Hoberg Digital Agency",
  description: "Verified Medical Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F9FAFB] text-gray-900 pb-24 selection:bg-blue-100`}>
        <Header />
        <main className="max-w-md mx-auto px-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}