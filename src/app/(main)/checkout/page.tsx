"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { useCartStore } from "@/lib/store";

type Destination = { id: number; label: string; zipCode: string };
type ShippingOption = {
  courier: string;
  courierName: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};

const rupiah = (n: number) => `Rp ${Math.round(n).toLocaleString("id-ID")}`;
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15";
const labelClass = "mb-2 block text-sm font-medium text-gray-700";

const paymentMethods = [
  { value: "transfer", title: "Transfer bank", text: "BCA, Mandiri, BRI, atau BNI" },
  { value: "credit", title: "Kartu kredit/debit", text: "Visa, Mastercard, atau JCB" },
  { value: "ewallet", title: "E-wallet", text: "GoPay, OVO, atau DANA" },
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", paymentMethod: "transfer" });

  // Destination search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Destination[]>([]);
  const [searching, setSearching] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [searchError, setSearchError] = useState("");

  // Shipping options
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [loadingCost, setLoadingCost] = useState(false);
  const [costError, setCostError] = useState("");
  const [selected, setSelected] = useState<string>("");

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<{ id: number; totalAmount: number } | null>(null);

  const cartPayload = items.map((i) => ({ id: i.id, quantity: i.quantity }));
  const cartKey = JSON.stringify(cartPayload);
  const subtotal = getTotalPrice();
  const chosen = options.find((o) => `${o.courier}:${o.service}` === selected) || null;
  const grandTotal = subtotal + (chosen?.cost || 0);

  // Debounced destination search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (destination && query === destination.label) return;
    clearTimeout(searchTimer.current);
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      setSearchError("");
      try {
        const res = await fetch(`/api/shipping/destination?search=${encodeURIComponent(query.trim())}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setResults(json.data || []);
      } catch (e) {
        setSearchError(e instanceof Error && e.message ? e.message : "Gagal mencari lokasi.");
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(searchTimer.current);
  }, [query, destination]);

  // Fetch shipping options when destination or cart changes
  useEffect(() => {
    if (!destination || items.length === 0) return;
    let cancelled = false;
    (async () => {
      setLoadingCost(true);
      setCostError("");
      setOptions([]);
      setSelected("");
      try {
        const res = await fetch("/api/shipping/cost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destinationId: destination.id, items: JSON.parse(cartKey) }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        if (cancelled) return;
        const list: ShippingOption[] = json.data?.options || [];
        setOptions(list);
        if (list[0]) setSelected(`${list[0].courier}:${list[0].service}`);
        if (list.length === 0) setCostError("Tidak ada layanan kurir yang tersedia untuk tujuan ini.");
      } catch (e) {
        if (!cancelled) setCostError(e instanceof Error && e.message ? e.message : "Gagal menghitung ongkir.");
      } finally {
        if (!cancelled) setLoadingCost(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [destination, cartKey, items.length]);

  const pickDestination = (d: Destination) => {
    setDestination(d);
    setQuery(d.label);
    setResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!destination) return setSubmitError("Pilih lokasi tujuan pengiriman terlebih dahulu.");
    if (!chosen) return setSubmitError("Pilih layanan pengiriman terlebih dahulu.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          destination,
          shipping: { courier: chosen.courier, service: chosen.service },
          items: cartPayload,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPlacedOrder(json.data);
      clearCart();
    } catch (err) {
      setSubmitError(err instanceof Error && err.message ? err.message : "Pesanan gagal dibuat.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8f8ee]">
            <FaCheck className="text-2xl text-[#248a3d]" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">Pesanan diterima.</h1>
          <p className="mt-3 text-gray-500">
            Nomor pesanan Anda <span className="font-semibold text-gray-900">#{placedOrder.id}</span> dengan total{" "}
            {rupiah(placedOrder.totalAmount)}. Tim MDN akan segera menghubungi Anda untuk konfirmasi pembayaran.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/produk" className="rounded-full bg-[#0071e3] px-6 py-3 font-medium text-white hover:bg-[#0077ed]">
              Lanjut belanja
            </Link>
            <Link href="/" className="text-[#0071e3] hover:underline">
              Kembali ke beranda ›
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Keranjang Anda kosong.</h1>
          <Link href="/produk" className="mt-3 inline-block text-[#0071e3] hover:underline">
            Lanjut belanja ›
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl">Checkout.</h1>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-12">
            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Kontak</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">Nama lengkap</label>
                  <input id="name" required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">Email</label>
                  <input id="email" type="email" required className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="phone">Nomor telepon</label>
                  <input id="phone" type="tel" required className={inputClass} placeholder="0812-3456-7890" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
            </section>

            {/* Shipping address */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Alamat pengiriman</h2>
              <div className="mt-5 space-y-4">
                <div className="relative">
                  <label className={labelClass} htmlFor="destination">Kelurahan / kecamatan / kota</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="destination"
                      autoComplete="off"
                      className={`${inputClass} pl-10`}
                      placeholder="Ketik minimal 3 huruf, mis. Cempaka Putih"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (destination) {
                          setDestination(null);
                          setOptions([]);
                          setSelected("");
                        }
                      }}
                    />
                    {searching && <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
                  </div>
                  {results.length > 0 && !destination && (
                    <ul className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-gray-100 bg-white py-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                      {results.map((d) => (
                        <li key={d.id}>
                          <button type="button" onClick={() => pickDestination(d)} className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-[#f5f5f7]">
                            {d.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {searchError && <p className="mt-2 text-sm text-[#d70015]">{searchError}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="address">Alamat lengkap</label>
                  <textarea id="address" required rows={3} className={inputClass} placeholder="Nama jalan, nomor rumah/gedung, RT/RW, patokan" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>
              </div>
            </section>

            {/* Courier */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Pengiriman</h2>
              <div className="mt-5">
                {!destination && <p className="text-gray-500">Pilih lokasi tujuan untuk melihat pilihan kurir dan ongkos kirim.</p>}
                {loadingCost && (
                  <p className="flex items-center gap-2 text-gray-500">
                    <FaSpinner className="animate-spin" /> Menghitung ongkos kirim…
                  </p>
                )}
                {costError && <p className="text-sm text-[#d70015]">{costError}</p>}
                {options.length > 0 && (
                  <div className="space-y-3">
                    {options.map((o) => {
                      const key = `${o.courier}:${o.service}`;
                      const active = key === selected;
                      return (
                        <label key={key} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${active ? "border-[#0071e3] bg-[#f5f9ff]" : "border-gray-200 hover:border-gray-300"}`}>
                          <input type="radio" name="shipping" value={key} checked={active} onChange={() => setSelected(key)} className="h-4 w-4 accent-[#0071e3]" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {o.courier.toUpperCase()} {o.service}
                            </p>
                            <p className="text-sm text-gray-500">
                              {o.description}
                              {o.etd ? ` · Estimasi ${o.etd.replace(/day/i, "hari")}` : ""}
                            </p>
                          </div>
                          <p className="font-medium text-gray-900">{rupiah(o.cost)}</p>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Pembayaran</h2>
              <div className="mt-5 space-y-3">
                {paymentMethods.map((m) => {
                  const active = form.paymentMethod === m.value;
                  return (
                    <label key={m.value} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${active ? "border-[#0071e3] bg-[#f5f9ff]" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="paymentMethod" value={m.value} checked={active} onChange={() => setForm({ ...form, paymentMethod: m.value })} className="h-4 w-4 accent-[#0071e3]" />
                      <div>
                        <p className="font-medium text-gray-900">{m.title}</p>
                        <p className="text-sm text-gray-500">{m.text}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] bg-[#f5f5f7] p-7">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Ringkasan pesanan</h2>
              <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                      {item.image && (
                        <Image
                          src={item.image.startsWith("data:") || item.image.startsWith("/") ? item.image : `/${item.image}`}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Jumlah: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{rupiah(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>{rupiah(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Ongkos kirim{chosen ? ` (${chosen.courier.toUpperCase()} ${chosen.service})` : ""}</dt>
                  <dd>{chosen ? rupiah(chosen.cost) : "—"}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                  <dt>Total</dt>
                  <dd>{rupiah(grandTotal)}</dd>
                </div>
              </dl>

              {submitError && <p className="mt-4 text-sm text-[#d70015]">{submitError}</p>}

              <button
                type="submit"
                disabled={submitting || !chosen}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#0071e3] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {submitting && <FaSpinner className="animate-spin" />}
                {submitting ? "Memproses…" : "Buat pesanan"}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">Ongkos kirim dihitung otomatis melalui RajaOngkir.</p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
