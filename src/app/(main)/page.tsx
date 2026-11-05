import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaLaptop, FaDesktop, FaHeadphones, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset, FaBolt, FaChevronRight } from "react-icons/fa";
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
      <section className="relative bg-primary-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              New Collection 2026 Available
            </p>

            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Premium Technology
              <br />For Your Life
            </h1>

            <p className="text-lg lg:text-xl leading-relaxed text-white/70 max-w-2xl mx-auto">
              Discover the latest gadgets and electronics at unbeatable prices. Quality guaranteed with official warranty.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-2">
              <Link
                href="/produk"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/tentang-kami"
                className="inline-flex items-center gap-1.5 text-white font-medium hover:text-white/80 transition-colors"
              >
                Learn More <FaChevronRight className="text-xs" />
              </Link>
            </div>
          </div>

          <div className="mt-16 lg:mt-20 flex justify-center">
            <Image
              src="/uploads/21.png"
              alt="MDN Tech Products"
              width={500}
              height={500}
              className="w-full max-w-2xl h-auto object-contain"
              priority
            />
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
        <section className="max-w-7xl mx-auto px-4 section-y">
          <div className="bg-red-600 rounded-panel p-6 md:p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-semibold">
                  <FaBolt aria-hidden="true" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 section-y">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-semibold text-ink">Best Sellers</h2>
            </div>
            <Link href="/produk?filter=bestseller" className="text-primary-600 font-medium hover:underline">
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
        <section className="max-w-7xl mx-auto px-4 section-y">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary-600 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-semibold text-ink">New Arrivals</h2>
            </div>
            <Link href="/produk?filter=new" className="text-primary-600 font-medium hover:underline">
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
        </section>
      )}

      {/* All Products */}
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 section-y">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-600 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-semibold text-ink">All Products</h2>
          </div>
          <Link href="/produk" className="text-primary-600 font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
