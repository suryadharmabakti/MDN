"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FaSearch, FaFilter, FaSortAmountDown, FaThLarge, FaList, FaTimes } from "react-icons/fa";
import { Product } from "@prisma/client";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { ProductWithMeta } from "@/types";

interface Props {
  initialProducts: Product[];
  categories: string[];
}

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under Rp 500.000", min: 0, max: 500000 },
  { label: "Rp 500.000 - Rp 1.000.000", min: 500000, max: 1000000 },
  { label: "Rp 1.000.000 - Rp 5.000.000", min: 1000000, max: 5000000 },
  { label: "Rp 5.000.000 - Rp 10.000.000", min: 5000000, max: 10000000 },
  { label: "Above Rp 10.000.000", min: 10000000, max: Infinity },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "bestseller" },
  { label: "Top Rated", value: "rating" },
];

export default function ProductListing({ initialProducts, categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Semua Produk");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [priceRange, setPriceRange] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const products = initialProducts.map(p => ({
    ...p,
    price: (p as any).price || 0,
    oldPrice: (p as any).oldPrice || 0,
    rating: (p as any).rating || 0,
    reviewCount: (p as any).reviewCount || 0,
    isFlashSale: (p as any).isFlashSale || false,
    isBestSeller: (p as any).isBestSeller || false,
    isNew: (p as any).isNew || false,
  })) as ProductWithMeta[];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Semua Produk" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const productPrice = p.price || 0;
    const matchesPrice = productPrice >= priceRanges[priceRange].min && 
      (priceRanges[priceRange].max === Infinity || productPrice < priceRanges[priceRange].max);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (a.price || 0) - (b.price || 0);
      case "price-desc":
        return (b.price || 0) - (a.price || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "bestseller":
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "Semua Produk") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`/produk?${params.toString()}`);
  };

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <FaSortAmountDown className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-primary-600 text-white" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-primary-600 text-white" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FaList />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-semibold rounded-xl"
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Filters</h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPriceRange(idx)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      priceRange === idx
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <p className="text-gray-500 mb-4">
            Showing {sortedProducts.length} products
            {selectedCategory !== "Semua Produk" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          {sortedProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {sortedProducts.map((product) => (
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
                  isFlashSale={product.isFlashSale}
                  isBestSeller={product.isBestSeller}
                  isNew={product.isNew}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSelectedCategory("Semua Produk");
                  setSearchQuery("");
                  setPriceRange(0);
                }}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPriceRange(idx)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        priceRange === idx
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
