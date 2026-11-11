import { NextResponse } from "next/server";
import { RajaOngkirError, searchDestinations } from "@/lib/rajaongkir";

export const dynamic = "force-dynamic";

/** GET /api/shipping/destination?search=cempaka putih */
export async function GET(req: Request) {
  const search = new URL(req.url).searchParams.get("search")?.trim() || "";
  if (search.length < 3) {
    return NextResponse.json({ data: [] });
  }

  try {
    const data = await searchDestinations(search.slice(0, 80));
    return NextResponse.json({ data });
  } catch (err) {
    const status = err instanceof RajaOngkirError ? err.status : 500;
    if (status === 404) return NextResponse.json({ data: [] });
    console.error("[shipping/destination]", err);
    const error = status === 503
      ? "Layanan ongkir belum aktif. Silakan hubungi tim MDN."
      : "Gagal mencari lokasi tujuan.";
    return NextResponse.json({ error }, { status });
  }
}
