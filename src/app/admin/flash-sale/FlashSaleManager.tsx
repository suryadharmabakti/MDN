"use client";

import { useState, useTransition } from "react";
import { Product } from "@prisma/client";
import { updateFlashSaleSettings } from "./actions";
import {
  FaBolt, FaSearch, FaTimes, FaSave, FaCheck,
  FaDesktop, FaFire, FaClock
} from "react-icons/fa";
import Image from "next/image";

interface Props {
  products: Product[];
  currentFlashSaleIds: number[];
  currentEndTime: string | null;
}

export default function FlashSaleManager({
  products,
  currentFlashSaleIds,
  currentEndTime,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(currentFlashSaleIds)
  );
  const [endTime, setEndTime] = useState<string>(currentEndTime ?? "");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.merk || "").toLowerCase().includes(q) ||
      (p.tipe || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  });

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSaved(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateFlashSaleSettings({
        productIds: Array.from(selectedIds),
        endTime: endTime || null,
      });
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(result.error || "Gagal menyimpan");
      }
    });
  };

  // Format endTime for datetime-local input
  const endTimeLocal = endTime
    ? new Date(endTime).toISOString().slice(0, 16)
    : "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBolt className="text-red-500" />
            Flash Sale Manager
          </h1>
          <p className="text-gray-500 mt-1">
            Pilih produk dan atur waktu berakhirnya flash sale
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95 text-white ${
            saved
              ? "bg-green-500"
              : "bg-red-500 hover:bg-red-600"
          } disabled:opacity-60`}
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <FaCheck />
          ) : (
            <FaSave />
          )}
          {isPending ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Flash Sale"}
        </button>
      </div>

      {/* Status Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaFire className="text-2xl" />
            <span className="font-semibold text-lg">Produk Flash Sale</span>
          </div>
          <p className="text-4xl font-black">{selectedIds.size}</p>
          <p className="text-red-200 text-sm mt-1">produk dipilih</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100 sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
            <FaClock className="text-red-500" />
            Waktu Berakhir Flash Sale
          </label>
          <input
            type="datetime-local"
            value={endTimeLocal}
            onChange={(e) => {
              setEndTime(e.target.value ? new Date(e.target.value).toISOString() : "");
              setSaved(false);
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none text-gray-800 bg-gray-50 text-lg"
          />
          {endTime && (
            <p className="text-xs text-gray-400 mt-1.5">
              Flash sale berakhir:{" "}
              <span className="font-semibold text-gray-600">
                {new Date(endTime).toLocaleString("id-ID", {
                  weekday: "long", day: "numeric", month: "long",
                  year: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </p>
          )}
          {!endTime && (
            <p className="text-xs text-amber-500 mt-1.5">
              ⚠ Belum ada waktu berakhir — countdown tidak akan tampil
            </p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => {
          const isSelected = selectedIds.has(product.id);
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => toggle(product.id)}
              className={`relative text-left rounded-2xl border-2 p-4 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none ${
                isSelected
                  ? "border-red-500 bg-red-50 shadow-red-100"
                  : "border-gray-100 bg-white hover:border-gray-300"
              }`}
            >
              {/* Checkmark badge */}
              <div
                className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-red-500 border-red-500"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && <FaCheck className="text-white text-xs" />}
              </div>

              {/* Flash Badge */}
              {isSelected && (
                <span className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <FaBolt size={8} /> FLASH
                </span>
              )}

              {/* Image */}
              <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-gray-100 mb-3">
                {product.image ? (
                  <Image
                    src={product.image.startsWith("/") ? product.image : `/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FaDesktop size={36} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                  {product.category}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2 leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {product.merk} {product.tipe}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-bold text-red-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  {product.oldPrice > 0 && (
                    <span className="text-xs text-gray-400 line-through">
                      Rp {product.oldPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            <FaSearch className="mx-auto text-4xl mb-3 opacity-20" />
            <p>Produk tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Footer Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={isPending}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95 text-white text-lg ${
            saved ? "bg-green-500" : "bg-red-500 hover:bg-red-600"
          } disabled:opacity-60`}
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <FaCheck />
          ) : (
            <FaSave />
          )}
          {isPending ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Flash Sale"}
        </button>
      </div>
    </div>
  );
}
