import { prisma } from "@/lib/prisma";
import ProductListing from "./ProductListing";

export const dynamic = "force-dynamic";

const categories = [
  "Semua Produk",
  "Server",
  "PC",
  "Aksesoris",
  "Lainnya",
];

export default async function ProdukPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductListing
          initialProducts={JSON.parse(JSON.stringify(products))}
          categories={categories}
        />
      </div>
      </section>
    </>
  );
}
