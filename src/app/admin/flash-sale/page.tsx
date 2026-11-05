import { prisma } from "@/lib/prisma";
import FlashSaleManager from "./FlashSaleManager";

export const dynamic = "force-dynamic";

export default async function FlashSalePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const flashSaleProducts = products.filter((p) => p.isFlashSale);
  const currentFlashSaleIds = flashSaleProducts.map((p) => p.id);

  // Get the earliest end time from current flash sale products
  const endTimes = flashSaleProducts
    .map((p) => (p as any).flashSaleEndTime)
    .filter(Boolean);
  const currentEndTime =
    endTimes.length > 0
      ? new Date(Math.min(...endTimes.map((t: any) => new Date(t).getTime()))).toISOString()
      : null;

  return (
    <div className="max-w-7xl mx-auto">
      <FlashSaleManager
        products={JSON.parse(JSON.stringify(products))}
        currentFlashSaleIds={currentFlashSaleIds}
        currentEndTime={currentEndTime}
      />
    </div>
  );
}
