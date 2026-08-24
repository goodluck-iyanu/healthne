import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "../components/Header"; // This connects your new animated header!
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
        
        {/* New Interactive Header */}
        <Header />

        {/* Page Content */}
        <main className="max-w-md mx-auto px-6">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-6 left-0 right-0 z-40">
          <div className="max-w-xs mx-auto bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 rounded-full px-6 py-3 flex justify-between items-center text-gray-400">
            <Link href="/" className="p-2 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </Link>
            <Link href="/search" className="p-2 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <Link href="/ai" className="p-2 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </Link>
            <Link href="/feed" className="p-2 hover:text-blue-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}