import { NextResponse } from "next/server";
import XLSX from "xlsx";
import { prisma } from "@/lib/prisma";

const REQUIRED_FIELDS = [
  "name",
  "category",
  "merk",
  "tipe",
];

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const array = await file.arrayBuffer();
    const wb = XLSX.read(array, { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

    if (!rows.length) {
      return NextResponse.json({ error: "Sheet kosong" }, { status: 400 });
    }

    const products = [] as any[];
    const errors = [] as string[];
    let rowIndex = 2; // header at 1

    for (const row of rows) {
      for (const f of REQUIRED_FIELDS) {
        if (!row[f] || String(row[f]).trim() === "") {
          errors.push(`Baris ${rowIndex}: kolom '${f}' wajib diisi`);
        }
      }
      if (errors.length) {
        rowIndex++;
        continue;
      }
      products.push({
        name: String(row.name || ""),
        category: String(row.category || ""),
        description: String(row.description || ""),
        merk: String(row.merk || ""),
        tipe: String(row.tipe || ""),
        prosesor: String(row.prosesor || ""),
        kapasitas: String(row.kapasitas || ""),
        sistemOperasi: String(row.sistemOperasi || ""),
        berat: String(row.berat || ""),
        dimensi: String(row.dimensi || ""),
        masaGaransi: String(row.masaGaransi || ""),
        stok: String(row.stok || ""),
        image: String(row.image || ""),
      });
      rowIndex++;
    }

    if (!products.length) {
      return NextResponse.json({ error: "Tidak ada baris valid untuk diimpor", details: errors }, { status: 400 });
    }

    await prisma.product.createMany({ data: products });
    const created = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: products.length,
    });

    return NextResponse.json({
      success: true,
      inserted: products.length,
      errors,
      products: created,
    });
  } catch (e) {
    return NextResponse.json({ error: "Gagal memproses file Excel" }, { status: 500 });
  }
}
