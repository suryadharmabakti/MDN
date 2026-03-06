import { prisma } from "@/lib/prisma";
import ProductManager from "./ProductManager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <ProductManager initialProducts={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
