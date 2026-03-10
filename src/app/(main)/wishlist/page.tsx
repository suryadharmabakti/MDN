"use client";

import Link from "next/link";
import { FaHeart, FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { useWishlistStore, useCartStore, CartItem } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: CartItem) => {
    addItem(item);
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-5xl text-gray-400" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Save your favorite products here so you can easily find them later.
          </p>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Browse Products <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-gray-900">My Wishlist ({items.length} items)</h1>
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative aspect-square bg-gray-50">
                {item.image ? (
                  <img
                    src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaHeart className="text-4xl text-gray-300" />
                  </div>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">{item.name}</h3>
                <p className="text-xl font-black text-primary-600 mb-4">
                  Rp {(item.price || 0).toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium"
          >
            <FaArrowRight /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
