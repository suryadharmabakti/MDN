import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Tipe file tidak didukung" }, { status: 415 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Ukuran file melebihi 10MB" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert image buffer to base64 Data URI ensuring persistence on serverless providers
    const base64Data = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ path: dataUri }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Gagal mengunggah file" }, { status: 500 });
  }
}
