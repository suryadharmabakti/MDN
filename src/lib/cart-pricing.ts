import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseWeightGrams } from "@/lib/rajaongkir";

export const cartItemsSchema = z
  .array(z.object({ id: z.number().int().positive(), quantity: z.number().int().min(1).max(999) }))
  .min(1)
  .max(100);

export type CartLine = z.infer<typeof cartItemsSchema>[number];

/**
 * Price and weigh a cart using the database as the source of truth,
 * so the browser cannot tamper with prices or weights.
 */
export async function priceCart(items: CartLine[]) {
  const ids = Array.from(new Set(items.map((i) => i.id)));
  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, price: true, berat: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  const missing = ids.filter((id) => !byId.has(id));
  if (missing.length) {
    throw new Error(`Produk tidak ditemukan: ${missing.join(", ")}`);
  }

  let subtotal = 0;
  let weightGrams = 0;
  const lines = items.map((item) => {
    const p = byId.get(item.id)!;
    subtotal += p.price * item.quantity;
    weightGrams += parseWeightGrams(p.berat) * item.quantity;
    return { productId: p.id, quantity: item.quantity, price: p.price };
  });

  return { lines, subtotal, weightGrams };
}
