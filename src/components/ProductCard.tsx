"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useCartStore, useWishlistStore, CartItem } from "@/lib/store";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price?: number;
  oldPrice?: number;
  image: string;
  category: string;
  merk: string;
  tipe: string;
  rating?: number;
  reviewCount?: number;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  merk,
  tipe,
  rating,
  reviewCount,
  isFlashSale,
  isBestSeller,
  isNew,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const [isAdding, setIsAdding] = useState(false);

  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    const item: CartItem = {
      id,
      name,
      price: price || 0,
      oldPrice,
      image,
      quantity: 1,
      merk,
    };

    addItem(item);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item: CartItem = {
      id,
      name,
      price: price || 0,
      oldPrice,
      image,
      quantity: 1,
      merk,
    };

    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(item);
    }
  };

  const discount = oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const label = isFlashSale
    ? `Flash Sale${discount > 0 ? ` · Hemat ${discount}%` : ""}`
    : discount > 0
      ? `Hemat ${discount}%`
      : isNew
        ? "Baru"
        : isBestSeller
          ? "Terlaris"
          : null;
  const labelColor = isFlashSale || discount > 0 ? "text-[#bf4800]" : "text-[#0071e3]";
  const href = `/produk/detail?id=${id}`;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#f5f5f7] transition-transform duration-300 hover:-translate-y-1">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden" aria-label={`Lihat detail ${name}`}>
        {image ? (
          <Image
            src={image.startsWith("data:") || image.startsWith("/") ? image : `/${image}`}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03] sm:p-10"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">No Image</div>
        )}
      </Link>

      <button
        onClick={handleWishlist}
        aria-label={isInWishlist ? "Hapus dari wishlist" : "Tambah ke wishlist"}
        className={`absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 transition-all hover:bg-white ${
          isInWishlist ? "text-red-500 opacity-100" : "text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100"
        }`}
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="flex flex-1 flex-col px-7 pb-7">
        {label ? (
          <p className={`text-xs font-semibold ${labelColor}`}>{label}</p>
        ) : (
          <p className="text-xs font-medium text-gray-500">{category}</p>
        )}
        <h3 className="mt-1.5 line-clamp-2 text-xl font-semibold tracking-tight text-gray-900">
          <Link href={href}>{name}</Link>
        </h3>

        {(reviewCount || 0) > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <FaStar className="text-[#ff9f0a]" aria-hidden="true" />
            {(rating || 0).toFixed(1)} <span className="text-gray-400">({reviewCount})</span>
          </div>
        )}

        <div className="mt-auto pt-5">
          <p className="text-[15px] text-gray-900">
            Rp {(price || 0).toLocaleString("id-ID")}
            {oldPrice && price && oldPrice > price ? (
              <span className="ml-2 text-sm text-gray-400 line-through">Rp {oldPrice.toLocaleString("id-ID")}</span>
            ) : null}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`rounded-full px-5 py-2 text-sm font-medium text-white transition-colors ${
                isAdding ? "bg-[#248a3d]" : "bg-[#0071e3] hover:bg-[#0077ed]"
              }`}
            >
              {isAdding ? "Ditambahkan" : "Beli"}
            </button>
            <Link href={href} className="inline-flex items-center gap-1 text-sm text-[#0071e3] hover:underline">
              Lihat detail <span className="text-base leading-none">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
