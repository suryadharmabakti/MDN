"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLaptop, FaSearch } from "react-icons/fa";
import { Product } from "@prisma/client";
import Image from "next/image";

interface Props {
  initialProducts: Product[];
  categories: string[];
}

export default function ProductListing({ initialProducts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === "Semua Produk" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-12 transform hover:scale-[1.01] transition-transform">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" />
        <input
          type="text"
          placeholder="Cari produk MDN favorit Anda..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-shadow text-lg font-medium placeholder:text-gray-300"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-16 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border shadow-sm hover:scale-105 active:scale-95 ${selectedCategory === cat
                ? "bg-primary-600 text-white border-primary-600 shadow-primary-200"
                : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-primary-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 border border-gray-100/50 relative flex flex-col h-full"
            >
              <div className="relative h-64 bg-gray-50 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/20 to-transparent"></div>
                {product.image ? (
                  <Image
                    src={product.image.startsWith("/") ? product.image : `/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                ) : (
                  <FaLaptop className="text-8xl text-gray-200 group-hover:text-primary-300 transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3" />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 backdrop-blur-md bg-white/70 text-xs font-bold text-primary-700 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-extrabold text-2xl text-gray-900 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[48px] leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6 border-t border-gray-50 pt-4">
                  <span>{product.merk}</span>
                  <span>•</span>
                  <span>{product.tipe}</span>
                </div>

                <Link
                  href={`/produk/detail?id=${product.id}`}
                  className="mt-auto w-full inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 hover:bg-primary-600 text-white font-bold rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-500/20 transform hover:-translate-y-1"
                >
                  Detail Produk
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-2xl mx-auto">
          <div className="text-gray-200 text-7xl mb-6">
            <FaSearch className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-600">Belum ada produk</h3>
          <p className="text-gray-400 mt-2">Coba kata kunci lain atau kategori yang berbeda</p>
        </div>
      )}
    </>
  );
}
