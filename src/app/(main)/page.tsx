import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  FaUsers,
  FaSmile,
  FaTag,
  FaLightbulb,
  FaLeaf,
  FaTrophy,
  FaLaptop,
} from "react-icons/fa";
import SerialSearch from "@/components/SerialSearch";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white overflow-hidden">
        {/* Background Logo Pattern */}
        <div className="absolute inset-0 bg-[url('/uploads/17.jpg')] opacity-10 bg-center bg-no-repeat bg-cover pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Column */}
            <div className="space-y-8 text-left z-10">
              <div className="inline-block px-4 py-2 bg-primary-200/10 border border-primary-500/20 rounded-full backdrop-blur-sm">
                <p className="text-primary-400 font-bold text-xs uppercase tracking-[0.3em]">
                  PT. MDN Industry Power Indonesia Corp
                </p>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                Inovasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Lokal</span>
                <br />
                <span className="text-white">Kualitas Global!</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-xl leading-relaxed font-medium">
                Menghadirkan teknologi terdepan dengan performa tinggi untuk mendukung produktivitas harian Anda di era digital.
              </p>

              <div className="pt-4 max-w-xl">
                <SerialSearch />
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <Link
                  href="/produk"
                  className="inline-flex items-center px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-primary-500/30 transform hover:-translate-y-1 active:scale-95 text-lg"
                >
                  Jelajahi Katalog
                </Link>
                <Link
                  href="/tentang-kami"
                  className="inline-flex items-center px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 backdrop-blur-sm text-lg"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Simplified Laptop Showcase ── */}
            <div className="hidden lg:flex justify-center items-center relative h-[520px]">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 via-transparent to-transparent blur-2xl pointer-events-none" />

              {/* Clean card with minimal frame */}
              <div className="relative w-[200%] h-[200%]">
                <div className="shadow-[0_20px_60px_rgba(0,0,0,0.35)]" />
                <div className="relative w-full h-full p-6 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/uploads/21.png"
                      alt="MDN Laptop"
                      fill
                      className="object-contain"
                      style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.45))" }}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Ground shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-8 rounded-full bg-primary-600/40 blur-2xl opacity-40" />
            </div>
            {/* ── END RIGHT COLUMN ── */}

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 hidden lg:block animate-bounce opacity-50">
          <div className="w-1 h-12 bg-gradient-to-b from-primary-400 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 px-4 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-2 sm:p-4 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex items-center gap-6 p-10 justify-center hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 bg-primary-50 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <FaUsers className="text-3xl text-primary-600" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900 tracking-tight">10.000+</p>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mt-1">Unit Terjual</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-10 justify-center hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <FaSmile className="text-3xl text-primary-600" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900 tracking-tight">95%</p>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mt-1">Indeks Kepuasan</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-10 justify-center hover:bg-gray-50 transition-colors group">
              <div className="w-16 h-16 bg-indigo-50 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <FaTag className="text-3xl text-primary-600" />
              </div>
              <div>
                <p className="text-4xl font-black text-gray-900 tracking-tight">30%</p>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mt-1">Lebih Hemat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-white min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-primary-600"></div>
              <p className="text-primary-600 font-black text-sm uppercase tracking-[0.3em]">
                Katalog Terbaru
              </p>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">
              Teknologi <br /> Untuk Masa Depan
            </h2>
          </div>
          <Link href="/produk" className="inline-flex items-center gap-3 text-gray-900 font-extrabold hover:text-primary-600 transition-all group">
            <span className="text-lg">Lihat Semua Katalog</span>
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-primary-600 group-hover:translate-x-2 transition-all">
              <span className="text-xl">→</span>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                href={`/produk/detail?id=${product.id}`}
                className="group bg-white rounded-3xl shadow-xl shadow-gray-200/40 overflow-hidden hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-700 border border-gray-100/50 flex flex-col h-full"
              >
                <div className="h-64 bg-gray-50 flex items-center justify-center relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-200/30 to-transparent z-10"></div>
                  {product.image ? (
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
                      <Image
                        src={product.image.startsWith("/") ? product.image : `/${product.image}`}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <FaLaptop className="text-7xl text-gray-200 group-hover:text-primary-300 transition-all duration-700 transform group-hover:scale-105 group-hover:rotate-1" />
                  )}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1.5 backdrop-blur-md bg-white/80 text-[10px] font-black text-primary-700 rounded-full shadow-sm uppercase tracking-wider border border-white/50">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-extrabold text-2xl text-gray-900 group-hover:text-primary-600 transition-colors mb-3 line-clamp-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-500 line-clamp-2 leading-relaxed mb-6 flex-1 min-h-[48px]">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pt-4 border-t border-gray-50">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{product.merk}</span>
                    <span className="mx-3 opacity-30">•</span>
                    <span>{product.tipe}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-32 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLaptop className="text-3xl text-gray-300" />
              </div>
              <p className="text-gray-500 font-bold text-xl">Katalog sedang diperbarui.</p>
              <p className="text-gray-400 mt-2">Nantikan produk terbaru dari kami segera!</p>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-dark-900 text-white py-24 md:py-32 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <p className="text-primary-400 font-black text-sm uppercase tracking-[0.4em] mb-6">
              Core Values
            </p>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight">
              Kualitas <span className="text-primary-500">Tanpa</span> Kompromi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-12 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <FaLightbulb className="text-4xl text-primary-400" />
              </div>
              <h3 className="text-3xl font-black mb-6">Inovasi Lokal</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Riset mendalam untuk menghadirkan teknologi yang paling relevan dengan gaya hidup masyarakat Indonesia.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-12 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <FaLeaf className="text-4xl text-green-400" />
              </div>
              <h3 className="text-3xl font-black mb-6">Berkelanjutan</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Fokus pada efisiensi energi dan penggunaan material berkualitas untuk masa depan bumi yang lebih baik.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-12 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <FaTrophy className="text-4xl text-yellow-500" />
              </div>
              <h3 className="text-3xl font-black mb-6">Standar Dunia</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Setiap komponen melewati uji ketahanan ekstrem untuk memastikan performa stabil di segala kondisi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
