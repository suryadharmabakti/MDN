import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  const headers = [
    "name",
    "category",
    "description",
    "merk",
    "tipe",
    "prosesor",
    "kapasitas",
    "sistemOperasi",
    "berat",
    "dimensi",
    "masaGaransi",
    "stok",
    "image",
  ];

  const sample = [
    [
      "MDN 155 PRO",
      "Laptop",
      "Laptop performa tinggi dengan desain modern",
      "MDN Tech",
      "155 PRO",
      "Intel Core i7-13700H",
      "16GB RAM / 512GB SSD",
      "Windows 11 Home",
      "1.8 Kg",
      "35.6 x 25.4 x 1.8 cm",
      "2 Tahun",
      "Tersedia",
      "/uploads/sample.png",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, ...sample]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=products_template.xlsx",
    },
  });
}
