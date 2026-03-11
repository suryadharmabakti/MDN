"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  
  const total = getTotalPrice();
  const shipping = total > 500000 ? 0 : 25000;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-5xl text-gray-400" />
          </div>
          <h2 className="text-3xl font-medium text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Looks like you haven&apos;t added any products to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            Start Shopping <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-6">
                  <div className="relative w-28 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-300">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.merk}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-medium text-primary-600">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                        {item.oldPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            Rp {(item.oldPrice * item.quantity).toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/produk"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `Rp ${shipping.toLocaleString("id-ID")}`
                    )}
                  </span>
                </div>
                {total < 500000 && (
                  <p className="text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                    Add Rp {(500000 - total).toLocaleString("id-ID")} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-black text-primary-600">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
              >
                Proceed to Checkout <FaArrowRight />
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-3 py-3 text-gray-500 hover:text-red-500 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
