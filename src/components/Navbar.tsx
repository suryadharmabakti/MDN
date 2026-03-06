"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Produk" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/hubungi-kami", label: "Hubungi Kami" },
  { href: "/download", label: "Download" },
  { href: "/laporan", label: "Laporan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="text-white sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "#03274eff" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
            <Image
              src="/uploads/mdn-logo.png"
              alt="MDN Tech Logo"
              width={100} // Memberikan resolusi target yang lebih tinggi ke optimizer
              height={100}
              quality={100} // Menonaktifkan kompresi bawaan Next.js agar kualitas maksimal
              className="h-12 w-12 object-contain" // Mengunci ukuran tampil di 48px (3rem)
              priority
            />
            <div className="flex flex-col -space-y-1">
              {/* Anda bisa menambahkan teks logo di sini */}
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? "bg-primary-600 text-white"
                  : "text-black-300 hover:bg-dark-700/50 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            title="toggle menu"
            className="md:hidden p-2 rounded-md text-black-300 hover:text-white hover:bg-dark-700"
          >
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/20 animate-in slide-in-from-top duration-300" style={{ backgroundColor: "#2d8ae8" }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === link.href
                  ? "bg-primary-600 text-white"
                  : "text-black-300 hover:bg-dark-700 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}
