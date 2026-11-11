"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { useCartStore } from "@/lib/store";

const rupiah = (n: number) => `Rp ${Math.round(n).toLocaleString("id-ID")}`;

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  if (!items.length) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#f5f5f7] text-2xl text-gray-400">
            <FaShoppingBag />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Keranjang Anda kosong.</h1>
          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Jelajahi server enterprise kami dan temukan konfigurasi yang sesuai.
          </p>
          <Link
            href="/produk"
            className="mt-7 inline-flex rounded-full bg-[#0071e3] px-6 py-3 font-medium text-white transition-colors hover:bg-[#0077ed]"
          >
            Lihat produk
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl">Keranjang Anda.</h1>
        <p className="mt-3 text-gray-500">
          {count} produk · Total {rupiah(total)}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Items */}
          <section>
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 py-7 sm:gap-7">
                  <Link
                    href={`/produk/detail?id=${item.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f7] sm:h-32 sm:w-32"
                  >
                    {item.image && (
                      <Image
                        src={item.image.startsWith("data:") || item.image.startsWith("/") ? item.image : `/${item.image}`}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-contain p-3"
                      />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                          <Link href={`/produk/detail?id=${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h2>
                        {item.merk && <p className="mt-1 text-sm text-gray-500">{item.merk}</p>}
                      </div>
                      <p className="shrink-0 text-lg font-semibold text-gray-900">
                        {item.price ? rupiah(item.price * item.quantity) : "Sesuai konfigurasi"}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <div className="flex items-center rounded-full bg-[#f5f5f7]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Kurangi jumlah"
                          className="grid h-9 w-9 place-items-center rounded-full text-gray-600 hover:text-gray-900"
                        >
                          <FaMinus className="text-[10px]" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Tambah jumlah"
                          className="grid h-9 w-9 place-items-center rounded-full text-gray-600 hover:text-gray-900"
                        >
                          <FaPlus className="text-[10px]" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-sm text-[#0071e3] hover:underline">
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link href="/produk" className="text-[#0071e3] hover:underline">
                Lanjut belanja ›
              </Link>
              <button onClick={clearCart} className="text-gray-500 hover:text-gray-900">
                Kosongkan keranjang
              </button>
            </div>
          </section>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] bg-[#f5f5f7] p-7">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Ringkasan pesanan</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>{total ? rupiah(total) : "Sesuai konfigurasi"}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Ongkos kirim</dt>
                  <dd>Dihitung saat checkout</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                  <dt>Total</dt>
                  <dd>{total ? rupiah(total) : "—"}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#0071e3] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#0077ed]"
              >
                Checkout
              </Link>
              <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                Harga final dan kebutuhan konfigurasi akan dikonfirmasi oleh tim MDN sebelum pesanan diproses.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
