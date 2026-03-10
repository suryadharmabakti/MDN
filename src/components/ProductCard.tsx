"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-xs" />);
      }
    }
    return stars;
  };

  return (
    <Link
      href={`/produk/detail?id=${id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <Image
            src={image.startsWith("/") ? image : `/${image}`}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-300">No Image</span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isFlashSale && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              FLASH SALE
            </span>
          )}
          {isBestSeller && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              Best Seller
            </span>
          )}
          {isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlist}
            className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
              isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
          <Link
            href={`/produk/detail?id=${id}`}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-primary-600 transition-all hover:scale-110"
          >
            <FaEye />
          </Link>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-3 bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-primary-700 ${
              isAdding ? "bg-green-500" : ""
            }`}
          >
            <FaShoppingCart />
            {isAdding ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 font-medium mb-1">{category}</p>
        <h3 className="font-bold text-gray-900 text-lg line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          {renderStars(rating || 0)}
          <span className="text-xs text-gray-400 ml-1">({reviewCount || 0})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary-600">
              Rp {(price || 0).toLocaleString("id-ID")}
            </span>
            {oldPrice && price && oldPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                Rp {oldPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {merk} {tipe}
          </p>
        </div>
      </div>
    </Link>
  );
}
