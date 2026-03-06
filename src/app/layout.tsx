import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "MDN Tech - Inovasi Lokal Kualitas Global",
  description:
    "PT. MDN Industry Power Indonesia Corp — Teknologi terdepan dengan performa tinggi untuk kebutuhan harian Anda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
