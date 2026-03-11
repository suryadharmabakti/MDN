import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading product details...</p>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-medium text-gray-900 mb-4">Product Not Found</h2>
      <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
      <Link href="/produk" className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-primary-700 transition">
        <FaChevronLeft /> Back to Products
      </Link>
    </div>
  );
}

export default async function ProductDetailPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const id = searchParams.id ? parseInt(searchParams.id) : 0;

  if (!id) {
    return <ProductNotFound />;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <ProductNotFound />;
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: id }
    },
    take: 4,
  });

  return (
    <Suspense fallback={<LoadingState />}>
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </Suspense>
  );
}
