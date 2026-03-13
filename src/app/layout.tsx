import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "MDN Tech - Inovasi Lokal Kualitas Global",
  description:
    "PT. MDN Industry Power Indonesia Corp — Teknologi terdepan dengan performa tinggi untuk kebutuhan harian Anda.",
  icons: {
    icon: "/uploads/mdn-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${montserrat.variable} bg-gray-50 text-gray-900 min-h-screen flex flex-col font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
