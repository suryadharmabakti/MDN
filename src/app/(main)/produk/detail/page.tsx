"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp, FaStar, FaRegStar, FaHeart, FaRegHeart, FaShippingFast, FaShieldAlt, FaUndo, FaMinus, FaPlus, FaShoppingCart, FaCheck, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useCartStore, useWishlistStore, CartItem } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");
  
  const addItem = useCartStore((state) => state.addItem);
  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const isInWishlist = id ? wishlistItems.some((item) => item.id === parseInt(id)) : false;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlist = () => {
    if (!id) return;
    if (isInWishlist) {
      removeFromWishlist(parseInt(id));
    } else {
      addToWishlist({
        id: parseInt(id),
        name: "Product",
        price: 0,
        image: "",
        quantity: 1,
        merk: "",
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <FaChevronRight className="text-gray-300 text-xs" />
            <Link href="/produk" className="text-gray-500 hover:text-primary-600">Products</Link>
            <FaChevronRight className="text-gray-300 text-xs" />
            <span className="text-gray-900 font-medium">Product Detail</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="p-8 bg-gray-50">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="/uploads/21.png"
                  alt="Product Image"
                  fill
                  className="object-contain"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">Flash Sale</span>
                </div>
                <button 
                  onClick={handleWishlist}
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 ${isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                  Laptop
                </span>
              </div>

              <h1 className="text-3xl font-black text-gray-900 mb-4">
                MacBook Pro M3 14 inch Space Black - 16GB RAM 512GB SSD
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(4.5)}
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-primary-600 font-semibold">128 Reviews</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <FaCheck className="text-xs" /> In Stock
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-primary-600">Rp 25.000.000</span>
                  <span className="text-xl text-gray-400 line-through">Rp 30.000.000</span>
                  <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">-17%</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                Experience unprecedented performance with the new MacBook Pro M3. Featuring the revolutionary M3 chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creative users.
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl transition-all ${
                    isAdding 
                      ? "bg-green-500 text-white" 
                      : "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200"
                  }`}
                >
                  <FaShoppingCart />
                  {isAdding ? "Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaShippingFast className="text-2xl text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-700">Free Shipping</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaShieldAlt className="text-2xl text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-700">1 Year Warranty</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <FaUndo className="text-2xl text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-700">30-Day Returns</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://api.whatsapp.com/send/?phone=6282128907619"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-8 py-4 font-bold transition-colors ${
                  activeTab === "specs" 
                    ? "text-primary-600 border-b-2 border-primary-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-8 py-4 font-bold transition-colors ${
                  activeTab === "reviews" 
                    ? "text-primary-600 border-b-2 border-primary-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews (128)
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`px-8 py-4 font-bold transition-colors ${
                  activeTab === "shipping" 
                    ? "text-primary-600 border-b-2 border-primary-600" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Shipping Info
              </button>
            </div>

            <div className="p-8">
              {activeTab === "specs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-semibold text-gray-900">Apple</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Model</span>
                    <span className="font-semibold text-gray-900">MacBook Pro M3</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Processor</span>
                    <span className="font-semibold text-gray-900">Apple M3 Chip</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">RAM</span>
                    <span className="font-semibold text-gray-900">16GB Unified</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold text-gray-900">512GB SSD</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Display</span>
                    <span className="font-semibold text-gray-900">14.2" Liquid Retina XDR</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Battery</span>
                    <span className="font-semibold text-gray-900">Up to 22 hours</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                    <span className="text-gray-500">Warranty</span>
                    <span className="font-semibold text-gray-900">1 Year AppleCare</span>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-black text-gray-900">4.5</div>
                      <div className="flex justify-center gap-1 my-2">{renderStars(4.5)}</div>
                      <p className="text-sm text-gray-500">128 Reviews</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="p-6 border border-gray-100 rounded-2xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-gray-900">John Doe</h4>
                            <div className="flex gap-1 my-1">{renderStars(5)}</div>
                            <p className="text-xs text-gray-500">Verified Purchase</p>
                          </div>
                          <span className="text-sm text-gray-400">2 days ago</span>
                        </div>
                        <p className="text-gray-600">
                          Amazing product! The performance is outstanding and the build quality is top-notch. Highly recommended for anyone looking for a professional laptop.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4">Delivery Information</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Free shipping on orders above Rp 500.000</li>
                      <li>• Standard delivery: 2-4 business days</li>
                      <li>• Express delivery: Next day delivery (additional cost)</li>
                      <li>• Delivery available across Indonesia</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-4">Return Policy</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 30-day return policy for unused items</li>
                      <li>• Original packaging must be intact</li>
                      <li>• Free return shipping for defective items</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <ProductCard
                key={item}
                id={item}
                name={`Related Product ${item}`}
                price={20000000 - item * 1000000}
                oldPrice={25000000 - item * 1000000}
                image="/uploads/21.png"
                category="Laptop"
                merk="Apple"
                tipe="Pro"
                rating={4.5}
                reviewCount={100}
                isNew={item === 1}
                isBestSeller={item === 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductDetailContent />
    </Suspense>
  );
}
