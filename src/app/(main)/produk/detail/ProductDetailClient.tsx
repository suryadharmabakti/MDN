"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaWhatsapp,
    FaStar,
    FaRegStar,
    FaHeart,
    FaRegHeart,
    FaShippingFast,
    FaShieldAlt,
    FaUndo,
    FaMinus,
    FaPlus,
    FaShoppingCart,
    FaCheck,
    FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import { useCartStore, useWishlistStore, CartItem } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState("specs");

    const addItem = useCartStore((state) => state.addItem);
    const wishlistItems = useWishlistStore((state) => state.items);
    const addToWishlist = useWishlistStore((state) => state.addItem);
    const removeFromWishlist = useWishlistStore((state) => state.removeItem);

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        setIsAdding(true);

        const item: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price || 0,
            oldPrice: product.oldPrice || undefined,
            image: product.image || "",
            quantity: quantity,
            merk: product.merk || "",
        };

        addItem(item);
        setTimeout(() => setIsAdding(false), 1000);
    };

    const handleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price || 0,
                oldPrice: product.oldPrice || undefined,
                image: product.image || "",
                quantity: 1,
                merk: product.merk || "",
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

    const productPrice = product.price != null ? Number(product.price) : 0;
    const productOldPrice = product.oldPrice != null ? Number(product.oldPrice) : undefined;

    const discount = productOldPrice && productOldPrice > productPrice
        ? Math.round(((productOldPrice - productPrice) / productOldPrice) * 100)
        : 0;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-primary-600">
                            Home
                        </Link>
                        <FaChevronRight className="text-gray-300 text-xs" />
                        <Link href="/produk" className="text-gray-500 hover:text-primary-600">
                            Products
                        </Link>
                        <FaChevronRight className="text-gray-300 text-xs" />
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="p-8 bg-gray-50">
                            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-inner">
                                {product.image ? (
                                    <Image
                                        src={product.image.startsWith("/") ? product.image : `/${product.image}`}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {/* Could be dynamic in future */}
                                </div>
                                <button
                                    onClick={handleWishlist}
                                    className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 ${isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
                                        }`}
                                >
                                    {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                                    {product.category || "Uncategorized"}
                                </span>
                            </div>

                            <h1 className="text-3xl font-black text-gray-900 mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {renderStars(Number((product as any).rating || 4.5))}
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-primary-600 font-semibold flex items-center gap-1">
                                    <FaCheck className="text-xs" /> In Stock
                                </span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-primary-600">
                                        Rp {productPrice.toLocaleString("id-ID")}
                                    </span>
                                    {productOldPrice && productOldPrice > productPrice && (
                                        <>
                                            <span className="text-xl text-gray-400 line-through">
                                                Rp {productOldPrice.toLocaleString("id-ID")}
                                            </span>
                                            <span className="px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-lg">
                                                -{discount}%
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-600 mb-8 whitespace-pre-wrap">
                                {product.description || "No description available."}
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
                                    <span className="px-6 py-3 font-medium text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-medium rounded-xl transition-all ${isAdding
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
                                href={`https://api.whatsapp.com/send/?phone=6282128907619&text=${encodeURIComponent(
                                    `Halo, saya tertarik dengan produk ${product.name}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
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
                                className={`px-8 py-4 font-medium transition-colors ${activeTab === "specs"
                                        ? "text-primary-600 border-b-2 border-primary-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Specifications
                            </button>
                            <button
                                onClick={() => setActiveTab("shipping")}
                                className={`px-8 py-4 font-medium transition-colors ${activeTab === "shipping"
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
                                        <span className="font-semibold text-gray-900">{product.merk || "-"}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                                        <span className="text-gray-500">Type</span>
                                        <span className="font-semibold text-gray-900">{product.tipe || "-"}</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl flex justify-between">
                                        <span className="text-gray-500">Category</span>
                                        <span className="font-semibold text-gray-900">{product.category || "-"}</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === "shipping" && (
                                <div className="space-y-4">
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <h4 className="font-medium text-gray-900 mb-4">Delivery Information</h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li>• Free shipping on orders above Rp 500.000</li>
                                            <li>• Standard delivery: 2-4 business days</li>
                                            <li>• Express delivery: Next day delivery (additional cost)</li>
                                            <li>• Delivery available across Indonesia</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <h4 className="font-medium text-gray-900 mb-4">Return Policy</h4>
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
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={Number(item.price) || 0}
                                    oldPrice={item.oldPrice ? Number(item.oldPrice) : undefined}
                                    image={item.image || ""}
                                    category={item.category || ""}
                                    merk={item.merk || ""}
                                    tipe={item.tipe || ""}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
