import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculateCost, RajaOngkirError } from "@/lib/rajaongkir";
import { cartItemsSchema, priceCart } from "@/lib/cart-pricing";

export const dynamic = "force-dynamic";

const orderSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(30),
  address: z.string().trim().min(5).max(500),
  destination: z.object({
    id: z.number().int().positive(),
    label: z.string().trim().min(3).max(300),
    zipCode: z.string().trim().max(10).default(""),
  }),
  shipping: z.object({
    courier: z.string().trim().min(2).max(20),
    service: z.string().trim().min(1).max(40),
  }),
  paymentMethod: z.enum(["transfer", "credit", "ewallet"]),
  items: cartItemsSchema,
});

/** POST /api/orders — create an order with a server-verified shipping cost. */
export async function POST(req: Request) {
  const parsed = orderSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Data pesanan belum lengkap atau tidak valid." }, { status: 400 });
  }
  const input = parsed.data;

  try {
    const { lines, subtotal, weightGrams } = await priceCart(input.items);

    // Re-quote on the server so the shipping cost cannot be tampered with in the browser.
    const options = await calculateCost(input.destination.id, weightGrams);
    const chosen = options.find(
      (o) => o.courier === input.shipping.courier && o.service === input.shipping.service
    );
    if (!chosen) {
      return NextResponse.json(
        { error: "Layanan pengiriman yang dipilih sudah tidak tersedia. Silakan pilih ulang." },
        { status: 409 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName: input.name,
        customerEmail: input.email,
        customerPhone: input.phone,
        shippingAddress: input.address,
        city: input.destination.label,
        postalCode: input.destination.zipCode,
        paymentMethod: input.paymentMethod,
        destinationId: input.destination.id,
        shippingCourier: chosen.courier,
        shippingService: chosen.service,
        shippingEtd: chosen.etd,
        shippingCost: chosen.cost,
        totalWeight: weightGrams,
        totalAmount: subtotal + chosen.cost,
        items: { create: lines },
      },
      select: { id: true, totalAmount: true, shippingCost: true },
    });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (err) {
    const status = err instanceof RajaOngkirError ? err.status : 500;
    console.error("[orders]", err);
    return NextResponse.json({ error: "Pesanan gagal dibuat. Silakan coba lagi." }, { status });
  }
}
