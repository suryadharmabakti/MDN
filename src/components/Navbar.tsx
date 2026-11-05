"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaChevronDown,
  FaBox,
} from "react-icons/fa";
import Image from "next/image";
import { useCartStore, useWishlistStore } from "@/lib/store";
import CartDrawer from "@/components/CartDrawer";

const categories = [
  { name: "Laptop", href: "/produk?category=Laptop" },
  { name: "PC", href: "/produk?category=PC" },
  { name: "Aksesoris", href: "/produk?category=Aksesoris" },
  { name: "Lainnya", href: "/produk?category=Lainnya" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/produk", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/tentang-kami", label: "About" },
  { href: "/hubungi-kami", label: "Contact" },
  { href: "/laporan", label: "Reports" },
  { href: "/cek-garansi", label: "Check Warranty" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const { getTotalItems, openCart } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = isMounted ? getTotalItems() : 0;
  const wishlistCount = isMounted ? wishlistItems.length : 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/produk?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <CartDrawer />
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo - Left aligned */}
            <div className="flex-shrink-0 z-10">
              <Link href="/" className="flex items-center">
                <Image
                  src="/uploads/mdn-logo.png"
                  alt="MDN Tech Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Links - Absolutely Centered */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-1 lg:gap-2 w-full max-w-fit">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-[12px] font-medium tracking-tight transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? "text-ink"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons & Search - Right aligned */}
            <div className="flex items-center gap-2 md:gap-4 z-10">
              {/* Search (Slim on Desktop) */}
              <form
                onSubmit={handleSearch}
                className="hidden lg:flex items-center relative group"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 focus:w-48 px-3 py-1 pl-8 bg-surface border border-line rounded-full text-[12px] focus:outline-none transition-all duration-300"
                />
                <HiSearch className="absolute left-2.5 text-gray-400 text-sm" />
              </form>

              <div className="flex items-center gap-1 md:gap-2">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative p-2 text-ink-secondary hover:text-ink transition-colors"
                  title="Wishlist"
                >
                  <FaHeart className="text-[18px]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <button
                  onClick={openCart}
                  className="relative p-2 text-ink-secondary hover:text-ink transition-colors"
                  title="Shopping Cart"
                >
                  <FaShoppingCart className="text-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 text-ink-secondary hover:text-ink"
                >
                  {menuOpen ? (
                    <HiX className="w-6 h-6" />
                  ) : (
                    <HiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search - Visible only when menu closed on mobile */}
        {!menuOpen && (
          <div className="md:hidden px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-surface border border-line rounded-full text-sm focus:outline-none"
              />
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-line animate-in slide-in-from-top duration-300">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-line">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-surface"
                >
                  My Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-surface"
                >
                  Wishlist ({wishlistCount})
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
