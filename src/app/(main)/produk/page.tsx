import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaLaptop, FaSearch } from "react-icons/fa";
import ProductListing from "./ProductListing";

export const dynamic = "force-dynamic";

const categories = [
  "Semua Produk",
  "Leptop",
  "PC",
  "SmartPhone",
  "Aksesoris",
  "Lainnya",
];

export default async function ProdukPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
            Temukan Inovasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Teknologi</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Perangkat berkualitas tinggi dengan performa andal, desain modern, 
            dan fitur yang dirancang untuk mendukung produktivitas Anda setiap hari.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductListing 
          initialProducts={JSON.parse(JSON.stringify(products))} 
          categories={categories} 
        />
      </section>
    </>
  );
}
