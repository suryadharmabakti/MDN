"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FaWhatsapp,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaShippingFast,
    FaShieldAlt,
    FaUndo,
    FaMinus,
    FaPlus,
    FaChevronRight,
    FaChevronLeft,
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
    const [selectedImage, setSelectedImage] = useState<string>("");

    const images: string[] = (product as any).images && (product as any).images.length > 0
        ? (product as any).images
        : (product.image ? [product.image] : []);

    const currentDisplayImage = selectedImage || (images.length > 0 ? images[0] : "");
    const currentImageIndex = images.indexOf(currentDisplayImage);

    const handlePrevImage = () => {
        if (images.length <= 1) return;
        const newIndex = currentImageIndex <= 0 ? images.length - 1 : currentImageIndex - 1;
        setSelectedImage(images[newIndex]);
    };

    const handleNextImage = () => {
        if (images.length <= 1) return;
        const newIndex = currentImageIndex >= images.length - 1 ? 0 : currentImageIndex + 1;
        setSelectedImage(images[newIndex]);
    };

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
            price: (product as any).price || 0,
            oldPrice: (product as any).oldPrice || undefined,
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
                price: (product as any).price || 0,
                oldPrice: (product as any).oldPrice || undefined,
                image: product.image || "",
                quantity: 1,
                merk: product.merk || "",
            });
        }
    };

    const productPrice = (product as any).price != null ? Number((product as any).price) : 0;
    const productOldPrice = (product as any).oldPrice != null ? Number((product as any).oldPrice) : undefined;

    const discount = productOldPrice && productOldPrice > productPrice
        ? Math.round(((productOldPrice - productPrice) / productOldPrice) * 100)
        : 0;

    const isServer = product.category === "Server";
    const specifications = [
        { label: "Brand", value: product.merk },
        { label: "Model", value: product.tipe },
        { label: "Kategori", value: product.category },
        { label: "Prosesor", value: product.prosesor },
        { label: isServer ? "Memori & penyimpanan" : "Kapasitas", value: product.kapasitas },
        { label: isServer ? "GPU & ekspansi" : "Sistem operasi", value: product.sistemOperasi },
        { label: "Dimensi", value: product.dimensi },
        { label: "Berat", value: product.berat },
        { label: isServer ? "Daya & keandalan" : "Garansi", value: product.masaGaransi },
        { label: "Ketersediaan", value: product.stok },
    ].filter((spec) => spec.value && spec.value.trim());

    const reviewCount = Number(product.reviewCount || 0);
    const rating = Number(product.rating || 0);
    const waHref = `https://api.whatsapp.com/send/?phone=6282128907619&text=${encodeURIComponent(
        `Halo, saya tertarik dengan produk ${product.name}.`
    )}`;
    const tabClass = (tab: string) =>
        `rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
        }`;
    const benefits = [
        { icon: FaShippingFast, title: "Dikirim ke seluruh Indonesia", text: "Ongkir dihitung otomatis saat checkout." },
        { icon: FaShieldAlt, title: "Garansi resmi 1 tahun", text: "Layanan purna jual dari tim MDN." },
        { icon: FaUndo, title: "Pengembalian 30 hari", text: "Untuk produk yang belum digunakan." },
    ];
    const toSrc = (img: string) => (img.startsWith("data:") || img.startsWith("/") ? img : `/${img}`);

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
                <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <FaChevronRight className="text-[10px] text-gray-300" />
                    <Link href="/produk" className="hover:text-gray-900">Shop</Link>
                    <FaChevronRight className="text-[10px] text-gray-300" />
                    <span className="truncate text-gray-900">{product.name}</span>
                </nav>
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    {/* Image Section */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="group relative aspect-square w-full overflow-hidden rounded-[28px] bg-[#f5f5f7]">
                            {currentDisplayImage ? (
                                <Image
                                    src={toSrc(currentDisplayImage)}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 600px"
                                    className="object-contain p-10 sm:p-14"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button onClick={handlePrevImage} aria-label="Gambar sebelumnya" className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-700 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
                                        <FaChevronLeft className="text-sm" />
                                    </button>
                                    <button onClick={handleNextImage} aria-label="Gambar berikutnya" className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-700 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                                {images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f7] ring-2 transition-all ${currentDisplayImage === img ? "ring-[#0071e3]" : "ring-transparent opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image src={toSrc(img)} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div>
                        {discount > 0 ? (
                            <p className="text-sm font-semibold text-[#bf4800]">Hemat {discount}%</p>
                        ) : (
                            <p className="text-sm font-medium text-gray-500">{product.category || "Produk"}</p>
                        )}
                        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.035em] text-gray-900 [text-wrap:balance] lg:text-[2.75rem] lg:leading-[1.08]">{product.name}</h1>

                        {reviewCount > 0 && (
                            <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                                <FaStar className="text-[#ff9f0a]" aria-hidden="true" />
                                {rating.toFixed(1)} · {reviewCount} ulasan
                            </p>
                        )}

                        <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-gray-600">
                            {product.description || "Belum ada deskripsi."}
                        </p>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <p className="text-2xl font-semibold tracking-tight text-gray-900">
                                Rp {productPrice.toLocaleString("id-ID")}
                            </p>
                            {productOldPrice && productOldPrice > productPrice && (
                                <p className="mt-1 text-sm text-gray-400 line-through">
                                    Rp {productOldPrice.toLocaleString("id-ID")}
                                </p>
                            )}

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex items-center rounded-full bg-[#f5f5f7]">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Kurangi jumlah" className="grid h-12 w-12 place-items-center rounded-full text-gray-600 transition-colors hover:text-gray-900">
                                        <FaMinus className="text-xs" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} aria-label="Tambah jumlah" className="grid h-12 w-12 place-items-center rounded-full text-gray-600 transition-colors hover:text-gray-900">
                                        <FaPlus className="text-xs" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className={`h-12 flex-1 rounded-full font-medium text-white transition-colors ${isAdding ? "bg-[#248a3d]" : "bg-[#0071e3] hover:bg-[#0077ed]"}`}
                                >
                                    {isAdding ? "Ditambahkan" : "Tambah ke keranjang"}
                                </button>
                                <button
                                    onClick={handleWishlist}
                                    aria-label={isInWishlist ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                                    className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-[#f5f5f7] transition-colors ${isInWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
                                >
                                    {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>

                            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#0071e3] hover:underline">
                                <FaWhatsapp aria-hidden="true" /> Tanya tim MDN lewat WhatsApp <span className="text-lg leading-none">›</span>
                            </a>
                        </div>

                        <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
                            {benefits.map((b) => (
                                <li key={b.title} className="flex items-start gap-4 py-4">
                                    <b.icon className="mt-1 text-lg text-gray-500" aria-hidden="true" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                                        <p className="text-sm text-gray-500">{b.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tabs */}
                <section className="mt-20 lg:mt-28">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-4xl">
                            {activeTab === "specs" ? "Spesifikasi teknis." : "Pengiriman & pengembalian."}
                        </h2>
                        <div className="inline-flex self-start rounded-full bg-[#f5f5f7] p-1">
                            <button onClick={() => setActiveTab("specs")} className={tabClass("specs")}>Spesifikasi</button>
                            <button onClick={() => setActiveTab("shipping")} className={tabClass("shipping")}>Pengiriman</button>
                        </div>
                    </div>

                    {activeTab === "specs" && (
                        <dl className="mt-10 grid border-t border-gray-200 md:grid-cols-2 md:gap-x-16">
                            {specifications.map((spec) => (
                                <div key={spec.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 border-b border-gray-200 py-5">
                                    <dt className="text-sm text-gray-500">{spec.label}</dt>
                                    <dd className="text-sm font-medium leading-relaxed text-gray-900">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    {activeTab === "shipping" && (
                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[28px] bg-[#f5f5f7] p-8">
                                <h3 className="text-xl font-semibold tracking-tight text-gray-900">Pengiriman</h3>
                                <ul className="mt-4 space-y-2 leading-relaxed text-gray-600">
                                    <li>Ongkos kirim dihitung otomatis saat checkout sesuai kurir, berat, dan lokasi tujuan.</li>
                                    <li>Pilihan kurir: JNE, J&amp;T, SiCepat, dan POS Indonesia.</li>
                                    <li>Estimasi waktu tiba ditampilkan untuk setiap layanan.</li>
                                    <li>Tersedia ke seluruh Indonesia.</li>
                                </ul>
                            </div>
                            <div className="rounded-[28px] bg-[#f5f5f7] p-8">
                                <h3 className="text-xl font-semibold tracking-tight text-gray-900">Pengembalian</h3>
                                <ul className="mt-4 space-y-2 leading-relaxed text-gray-600">
                                    <li>Pengembalian dalam 30 hari untuk produk yang belum digunakan.</li>
                                    <li>Kemasan asli harus utuh.</li>
                                    <li>Gratis ongkir pengembalian untuk produk cacat.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20 lg:mt-28">
                        <h2 className="text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-4xl">Produk terkait.</h2>
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedProducts.slice(0, 3).map((item) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={Number((item as any).price) || 0}
                                    oldPrice={(item as any).oldPrice ? Number((item as any).oldPrice) : undefined}
                                    image={item.image || ""}
                                    category={item.category || ""}
                                    merk={item.merk || ""}
                                    tipe={item.tipe || ""}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
