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
      {/* h-[100dvh] locks it exactly to the phone screen height. overflow-hidden prevents the whole page from moving. */}
      <body className={`${inter.className} bg-[#F9FAFB] text-gray-900 h-[100dvh] flex flex-col overflow-hidden selection:bg-blue-100`}>
        
        {/* The Header is frozen at the top */}
        <div className="z-50 flex-shrink-0">
          <Header />
        </div>

        {/* This is the ONLY part that scrolls */}
        <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto px-6 pb-28 pt-4 relative scroll-smooth">
          {children}
        </main>

        {/* The Bottom Nav is frozen at the bottom */}
        <div className="z-50">
          <BottomNav />
        </div>

      </body>
    </html>
  );
}