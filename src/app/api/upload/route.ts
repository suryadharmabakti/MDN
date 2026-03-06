import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
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
      return NextResponse.json({ error: "Ukuran file melebihi 5MB" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = file.type.split("/")[1] || "png";
    const safeBase = (file.name || "image").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `${Date.now()}_${safeBase}.${ext}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, buffer);

    const publicPath = `/uploads/${filename}`;
    return NextResponse.json({ path: publicPath }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Gagal mengunggah file" }, { status: 500 });
  }
}
