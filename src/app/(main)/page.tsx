import Link from "next/link";
import { prisma } from "@/lib/prisma";

import Image from "next/image";
import { FaLaptop, FaDesktop, FaHeadphones, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset, FaChevronRight } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import ProductCard from "@/components/ProductCard";
import { ProductWithMeta } from "@/types";
import FlashSaleCountdown from "@/components/FlashSaleCountdown";

export const dynamic = "force-dynamic";

const categories = [
  { name: "Laptop", icon: FaLaptop, href: "/produk?category=Laptop" },
  { name: "PC", icon: FaDesktop, href: "/produk?category=PC" },
  { name: "Aksesoris", icon: FaHeadphones, href: "/produk?category=Aksesoris" },
];

const benefits = [
  { icon: FaShippingFast, title: "Free Shipping", desc: "On orders over Rp 500.000" },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected transactions" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day return policy" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated customer service" },
];

export default async function HomePage() {
  const [flashSaleProducts, bestSellers, newProducts, allProducts] = await Promise.all([
    prisma.product.findMany({
      where: { isFlashSale: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { isBestSeller: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { isNew: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Visual Icon Bulat */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center p-4">
                <Image
                  src="/uploads/mdn-logo.png"
                  alt="MDN Tech"
                  width={60}
                  height={60}
                  className="object-contain opacity-80"
                />
              </div>
            </div>

            <h1 className="text-[clamp(2.25rem,5.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink mb-4">
              Premium Technology
              <br />For Your Life
            </h1>

            <p className="text-[17px] leading-[1.47] text-ink-secondary mb-10">
              Temukan solusi teknologi terbaik untuk Anda. Mulai di sini.
            </p>

            {/* Tombol Pintasan (Pills) */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-6 py-2 bg-surface text-ink text-[14px] font-medium rounded-full hover:bg-line transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Search Bar Hero */}
            <div className="max-w-xl mx-auto relative group">
              <form action="/produk" method="GET" className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Cari produk atau solusi..."
                  className="w-full px-6 py-4 pl-14 bg-surface border border-line rounded-full text-[16px] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
                <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 section-y">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`group ${idx === 0 ? "md:col-span-2" : ""} bg-surface rounded-panel p-8 flex items-center justify-between gap-6 hover:bg-line transition-colors`}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-ink">{cat.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                    Lihat <FaChevronRight className="text-[10px]" />
                  </span>
                </div>
                <cat.icon className="text-4xl text-primary-600/80" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-line flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <benefit.icon className="text-xl text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-ink text-sm">{benefit.title}</h4>
                <p className="text-xs text-ink-secondary">{benefit.desc}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 section-y">
            <div className="bg-red-600 rounded-panel p-6 md:p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold">
                    <FiZap aria-hidden="true" />
                    Flash Sale
                  </h2>
                  <FlashSaleCountdown
                    endTime={
                      (() => {
                        const p = flashSaleProducts.find((p: any) => p.flashSaleEndTime);
                        return p ? (p as any).flashSaleEndTime?.toISOString() ?? null : null;
                      })()
                    }
                  />
                </div>
                <Link href="/produk?filter=flashsale" className="text-white font-medium hover:underline">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashSaleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image}
                    category={product.category}
                    merk={product.merk}
                    tipe={product.tipe}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    isFlashSale={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="bg-surface">
          <div className="max-w-7xl mx-auto px-4 section-y">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-ink">Best Sellers</h2>
              <Link href="/produk?filter=bestseller" className="text-sm font-medium text-primary-600 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  category={product.category}
                  merk={product.merk}
                  tipe={product.tipe}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  isBestSeller={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 section-y">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="w-full bg-primary-700 rounded-panel p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white/15 rounded-full text-sm font-medium">Limited Offer</span>
            <h3 className="text-3xl font-semibold mt-4 mb-2">Up to 30% Off</h3>
            <p className="text-white/70 mb-6">On all laptop purchases this month</p>
            <Link href="/produk?category=Laptop" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
          </div>
          <div className="w-full bg-gray-900 rounded-panel p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white/15 rounded-full text-sm font-medium">Free Shipping</span>
            <h3 className="text-3xl font-semibold mt-4 mb-2">Free Delivery</h3>
            <p className="text-gray-300 mb-6">On orders above Rp 500.000</p>
            <Link href="/produk" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 section-y">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-ink">New Arrivals</h2>
              <Link href="/produk?filter=new" className="text-sm font-medium text-primary-600 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  category={product.category}
                  merk={product.merk}
                  tipe={product.tipe}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  isNew={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 section-y">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-ink">All Products</h2>
            <Link href="/produk" className="text-sm font-medium text-primary-600 hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                category={product.category}
                merk={product.merk}
                tipe={product.tipe}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Upgrade Your Tech?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust MDN Tech for their technology needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produk" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-colors">
              Browse Products
            </Link>
            <Link href="/hubungi-kami" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
