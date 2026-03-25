import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaLaptop, FaDesktop, FaHeadphones, FaShippingFast, FaShieldAlt, FaUndo, FaHeadset, FaStar, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import { ProductWithMeta } from "@/types";

export const dynamic = "force-dynamic";

const categories = [
  { name: "Laptop", icon: FaLaptop, href: "/produk?category=Laptop", color: "bg-blue-500" },
  { name: "PC", icon: FaDesktop, href: "/produk?category=PC", color: "bg-green-500" },
  { name: "Aksesoris", icon: FaHeadphones, href: "/produk?category=Aksesoris", color: "bg-orange-500" },
];

const benefits = [
  { icon: FaShippingFast, title: "Free Shipping", desc: "On orders over Rp 500.000" },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected transactions" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day return policy" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated customer service" },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 50, // Increase take to ensure we have enough products to filter
  });

  const flashSaleProducts = products.filter(p => p.isFlashSale).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const allProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/uploads/17.jpg')] opacity-10 bg-center bg-no-repeat bg-cover" />

        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">New Collection 2026 Available</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Premium <span className="text-primary-300">Technology</span>
                <br />For Your Life
              </h1>

              <p className="text-lg text-primary-100 max-w-lg">
                Discover the latest gadgets and electronics at unbeatable prices. Quality guaranteed with official warranty.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Shop Now <FaChevronRight />
                </Link>
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-full blur-3xl" />
                <Image
                  src="/uploads/21.png"
                  alt="MDN Tech Products"
                  width={500}
                  height={500}
                  className="relative w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-3"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center`}>
                <cat.icon className="text-2xl text-white" />
              </div>
              <span className="font-medium text-gray-900">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <benefit.icon className="text-xl text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{benefit.title}</h4>
                <p className="text-xs text-gray-500">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-6 md:p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-medium">Flash Sale</h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white text-red-600 font-medium rounded-lg text-sm">02</span>
                  <span className="px-3 py-1 bg-white text-red-600 font-medium rounded-lg text-sm">15</span>
                  <span className="px-3 py-1 bg-white text-red-600 font-medium rounded-lg text-sm">30</span>
                </div>
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
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-orange-500 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900">Best Sellers</h2>
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
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="w-full bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
              <Image src="/uploads/21.png" alt="" fill className="object-contain" />
            </div>
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Limited Offer</span>
              <h3 className="text-3xl font-medium mt-4 mb-2">Up to 30% Off</h3>
              <p className="text-primary-100 mb-6">On all laptop purchases this month</p>
              <Link href="/produk?category=Laptop" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
              <Image src="/uploads/21.png" alt="" fill className="object-contain" />
            </div>
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">Free Shipping</span>
              <h3 className="text-3xl font-medium mt-4 mb-2">Free Delivery</h3>
              <p className="text-gray-300 mb-6">On orders above Rp 500.000</p>
              <Link href="/produk" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-green-500 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900">New Arrivals</h2>
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
      <section className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900">All Products</h2>
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
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Ready to Upgrade Your Tech?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust MDN Tech for their technology needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produk" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors">
              Browse Products
            </Link>
            <Link href="/hubungi-kami" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
