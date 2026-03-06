import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaWhatsapp, FaArrowLeft, FaLaptop, FaMicrochip, FaMemory, FaHdd, FaWeight, FaRulerCombined, FaShieldAlt } from "react-icons/fa";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;
  if (!id) return notFound();

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Produk tidak ditemukan
        </h1>
        <Link
          href="/produk"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-bold transition-all shadow-lg hover:shadow-primary-300"
        >
          <FaArrowLeft /> Kembali ke Katalog Produk
        </Link>
      </div>
    );
  }

  const specItems = [
    { label: "Merk / Brand", value: product.merk, icon: <FaLaptop /> },
    { label: "Tipe / Model", value: product.tipe, icon: <FaInfoCircle className="text-blue-500" /> },
    { label: "Prosesor", value: product.prosesor, icon: <FaMicrochip className="text-purple-500" /> },
    { label: "RAM / Kapasitas", value: product.kapasitas, icon: <FaMemory className="text-green-500" /> },
    { label: "Sistem Operasi", value: product.sistemOperasi, icon: <FaLaptop className="text-blue-400" /> },
    { label: "Berat", value: product.berat, icon: <FaWeight className="text-gray-500" /> },
    { label: "Dimensi", value: product.dimensi, icon: <FaRulerCombined className="text-orange-500" /> },
    { label: "Masa Garansi", value: product.masaGaransi, icon: <FaShieldAlt className="text-red-500" /> },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8 font-medium">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/produk" className="hover:text-primary-600">Produk</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Product Image */}
          <div className="lg:col-span-5 bg-gray-50 rounded-[40px] aspect-square flex items-center justify-center border border-gray-100 shadow-inner relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent z-10 pointer-events-none"></div>
             {product.image ? (
               <Image
                 src={product.image.startsWith("/") ? product.image : `/${product.image}`}
                 alt={product.name}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
             ) : (
               <FaLaptop className="text-[160px] text-gray-200 group-hover:scale-110 transition-transform duration-700" />
             )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="inline-block text-sm font-bold bg-primary-50 text-primary-600 px-4 py-1.5 rounded-full mb-6 tracking-wide">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">{product.description}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {specItems.filter(s => s.value).map((spec) => (
                 <div key={spec.label} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100/50 hover:bg-white hover:shadow-md transition-all">
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm mr-4 text-primary-600">
                        {spec.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{spec.label}</p>
                        <p className="text-sm font-extrabold text-gray-800">{spec.value}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a
                href={`https://api.whatsapp.com/send/?phone=6282128907619&text=Halo MDN Tech, saya tertarik dengan produk ${product.name}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-green-600 hover:bg-green-700 text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-green-200 hover:-translate-y-1"
              >
                <FaWhatsapp className="text-2xl" /> Pesan Sekarang
              </a>
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-all"
              >
                <FaArrowLeft /> Kembali ke Katalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaInfoCircle } from "react-icons/fa";
