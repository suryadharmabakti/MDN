import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateCost, RajaOngkirError } from "@/lib/rajaongkir";
import { cartItemsSchema, priceCart } from "@/lib/cart-pricing";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  destinationId: z.number().int().positive(),
  items: cartItemsSchema,
});

/** POST /api/shipping/cost  { destinationId, items: [{ id, quantity }] } */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Data pengiriman tidak valid." }, { status: 400 });
  }

  try {
    const { weightGrams } = await priceCart(parsed.data.items);
    const options = await calculateCost(parsed.data.destinationId, weightGrams);
    return NextResponse.json({ data: { weightGrams, options } });
  } catch (err) {
    const status = err instanceof RajaOngkirError ? err.status : 500;
    console.error("[shipping/cost]", err);
    const error = status === 503
      ? "Layanan ongkir belum aktif. Silakan hubungi tim MDN."
      : "Gagal menghitung ongkos kirim.";
    return NextResponse.json({ error }, { status });
  }
}
