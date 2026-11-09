"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaMinus, FaPlus, FaShoppingBag, FaTimes, FaTrash } from "react-icons/fa";
import { useCartStore } from "@/lib/store";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  if (!isOpen) return null;

  const total = getTotalPrice();
  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Tutup keranjang" onClick={closeCart} className="absolute inset-0 cursor-default bg-black/35 backdrop-blur-sm" />
      <aside aria-label="Keranjang belanja" className="absolute inset-y-0 right-0 flex w-full max-w-[430px] flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div><p className="text-xs font-semibold tracking-[0.16em] text-primary-600"></p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Bag</h2></div>
          <button onClick={closeCart} aria-label="Tutup" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-line"><FaTimes /></button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"><div className="grid h-20 w-20 place-items-center rounded-full bg-primary-50 text-3xl text-primary-600"><FaShoppingBag /></div><h3 className="mt-6 text-2xl font-semibold">Bag Anda kosong.</h3><p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-secondary">Temukan solusi server yang tepat untuk kebutuhan Anda.</p><Link onClick={closeCart} href="/produk?category=Server" className="mt-6 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700">Jelajahi server</Link></div>
          ) : <div className="space-y-6">{items.map((item) => <article key={item.id} className="border-b border-line pb-6"><div className="flex gap-4"><div className="relative aspect-square h-[88px] w-[88px] shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f7] p-2 sm:h-28 sm:w-28 sm:p-3">{item.image && <Image src={item.image.startsWith("data:") || item.image.startsWith("/") ? item.image : `/${item.image}`} alt={item.name} fill sizes="(max-width: 640px) 88px, 112px" className="object-contain" />}</div><div className="min-w-0 flex-1"><div className="flex gap-3"><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold leading-snug">{item.name}</h3><p className="mt-1 text-xs text-ink-secondary">{item.merk}</p></div><button onClick={() => removeItem(item.id)} aria-label={`Hapus ${item.name}`} className="text-ink-secondary hover:text-red-600"><FaTrash /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-line bg-white"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid h-8 w-8 place-items-center"><FaMinus className="text-[10px]" /></button><span className="w-7 text-center text-sm font-semibold">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-8 w-8 place-items-center"><FaPlus className="text-[10px]" /></button></div><span className="text-sm font-semibold">{item.price ? `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}` : "Hubungi kami"}</span></div></div></div></article>)}</div>}
        </div>
        {items.length > 0 && <footer className="border-t border-line bg-surface px-6 py-6"><div className="flex items-baseline justify-between"><span className="text-sm text-ink-secondary">Subtotal</span><span className="text-xl font-semibold">{total ? `Rp ${total.toLocaleString("id-ID")}` : "Sesuai konfigurasi"}</span></div><p className="mt-2 text-xs leading-relaxed text-ink-secondary">Harga dan konfigurasi akhir akan dikonfirmasi oleh tim MDN.</p><Link onClick={closeCart} href="/checkout" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700">Lanjutkan <FaArrowRight className="text-xs" /></Link><Link onClick={closeCart} href="/cart" className="mt-4 block text-center text-sm font-medium text-primary-600 hover:underline">Lihat Bag</Link></footer>}
      </aside>
    </div>
  );
}
