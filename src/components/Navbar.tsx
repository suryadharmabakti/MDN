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
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-primary-600 text-white text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <p>Welcome to MDN Tech - Your Trusted Technology Partner</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">
                Help
              </a>
              <a href="#" className="hover:underline">
                Track Order
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/uploads/mdn-logo.png"
                alt="MDN Tech Logo"
                width={70}
                height={700}
                className="h-18 w-18 object-contain"
              />
            </Link>

            {/* Category Dropdown */}
            <div className="relative hidden md:block" ref={categoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
              >
                <HiMenu className="text-lg" />
                Categories
                <FaChevronDown
                  className={`text-xs transition-transform ${categoryOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
              {categoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setCategoryOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-2xl hidden md:block"
            >
              <div className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-l-xl focus:border-primary-500 focus:outline-none transition-colors"
                  />
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-r-xl transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden lg:flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative">
                  <FaHeart className="text-xl text-gray-600" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600 mt-1">
                  Wishlist
                </span>
              </Link>

              {/* Account */}
              <Link
                href="/login"
                className="hidden lg:flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <FaUser className="text-xl text-gray-600" />
                <span className="text-xs font-medium text-gray-600 mt-1">
                  Account
                </span>
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative">
                  <FaShoppingCart className="text-xl text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600 mt-1">
                  Cart
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 hover:bg-gray-50 rounded-lg"
              >
                {menuOpen ? (
                  <HiX className="w-6 h-6 text-gray-700" />
                ) : (
                  <HiMenu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-l-xl focus:border-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-r-xl"
              >
                <HiSearch />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Nav (Desktop) */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm font-semibold transition-colors ${pathname === link.href
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-primary-600"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex-1" />
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors"
              >
                <FaBox />
                Seller Central
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${pathname === link.href
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  My Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
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
