"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { Product } from "@prisma/client";
import ProductCard from "@/components/ProductCard";
import { ProductWithMeta } from "@/types";

interface Props { initialProducts: Product[]; categories: string[]; }

export default function ProductListing({ initialProducts, categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "Semua Produk");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const products = initialProducts.map((p) => ({ ...p, price: Number(p.price) || 0, oldPrice: Number(p.oldPrice) || 0, rating: Number(p.rating) || 0, reviewCount: p.reviewCount || 0, isFlashSale: p.isFlashSale || false, isBestSeller: p.isBestSeller || false, isNew: p.isNew || false })) as ProductWithMeta[];
  const changeCategory = (category: string) => { setSelectedCategory(category); const p = new URLSearchParams(searchParams.toString()); category === "Semua Produk" ? p.delete("category") : p.set("category", category); router.push(`/produk?${p}`); };
  const shown = products.filter((p) => (selectedCategory === "Semua Produk" || p.category === selectedCategory) && [p.name, p.merk, p.description].some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))).sort((a,b) => sortBy === "name" ? a.name.localeCompare(b.name) : sortBy === "price" ? Number(a.price || 0) - Number(b.price || 0) : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return <div>
    <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold tracking-[0.16em] text-primary-600"></p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">Temukan fondasi yang tepat.</h2><p className="mx-auto mt-4 max-w-xl text-ink-secondary">Server enterprise dan solusi teknologi untuk pekerjaan yang terus bergerak.</p></div>
    <div className="mt-10 border-y border-line py-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">{categories.map((cat) => <button key={cat} onClick={() => changeCategory(cat)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${selectedCategory === cat ? "bg-ink text-white" : "bg-surface text-ink-secondary hover:bg-line"}`}>{cat}</button>)}</div><div className="flex gap-3"><label className="relative min-w-0 flex-1 lg:w-64"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-secondary"/><input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Cari produk" className="w-full rounded-full border border-line bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-primary-500"/></label><select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="rounded-full border border-line bg-white px-4 text-sm font-medium outline-none"><option value="newest">Terbaru</option><option value="name">Nama</option><option value="price">Harga</option></select></div></div></div>
    <div className="mt-6 flex items-center justify-between"><p className="text-sm text-ink-secondary">{shown.length} produk tersedia</p>{(selectedCategory !== "Semua Produk" || searchQuery) && <button onClick={() => { setSearchQuery(""); changeCategory("Semua Produk"); }} className="text-sm font-semibold text-primary-600 hover:underline">Atur ulang</button>}</div>
    {shown.length ? <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{shown.map((product) => <ProductCard key={product.id} {...product} />)}</div> : <div className="mt-8 rounded-panel bg-surface py-20 text-center"><FaSearch className="mx-auto text-3xl text-ink-secondary"/><h3 className="mt-5 text-2xl font-semibold">Produk tidak ditemukan.</h3><button onClick={() => { setSearchQuery(""); changeCategory("Semua Produk"); }} className="mt-5 inline-flex items-center gap-2 text-primary-600 hover:underline">Lihat semua produk <FaArrowRight className="text-xs"/></button></div>}
  </div>;
}
