import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sn = searchParams.get("sn")?.trim();

  if (!sn) {
    return NextResponse.json({ error: "Parameter 'sn' wajib diisi" }, { status: 400 });
  }

  try {
    const laptop = await prisma.laptop.findUnique({
      where: { serialNumber: sn },
    });

    if (!laptop) {
      return NextResponse.json({ found: false, message: "Serial number tidak ditemukan" }, { status: 404 });
    }

    let warrantyValid = null as null | boolean;
    let warrantyUntil = null as null | string;

    if (laptop.purchaseDate) {
      const until = addMonths(laptop.purchaseDate, laptop.warrantyMonths);
      warrantyValid = new Date() <= until;
      warrantyUntil = until.toISOString();
    }

    return NextResponse.json({
      found: true,
      data: {
        serialNumber: laptop.serialNumber,
        modelName: laptop.modelName,
        productId: laptop.productId,
        purchaseDate: laptop.purchaseDate ? laptop.purchaseDate.toISOString() : null,
        warrantyMonths: laptop.warrantyMonths,
        customerName: laptop.customerName ?? null,
        warrantyValid,
        warrantyUntil,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
