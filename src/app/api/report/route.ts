import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, isuLaporan, lokasi, nomorHp } = body;

    if (!nama || !email || !isuLaporan || !lokasi || !nomorHp) {
      return NextResponse.json(
        { message: "Semua field harus diisi." },
        { status: 400 }
      );
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${nama}" <${process.env.SMTP_USER}>`,
      to: process.env.REPORT_RECEIVER_EMAIL || "sales@mdntech.co.id",
      replyTo: email,
      subject: `Laporan Issue Baru dari ${nama}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Laporan Baru Masuk</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Nama</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${nama}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nomor HP</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${nomorHp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Lokasi</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lokasi}</td>
            </tr>
          </table>
          <div style="margin-top: 30px; padding: 20px; bg-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3 style="margin-top: 0; color: #1e3a8a;">Isi Laporan:</h3>
            <p style="white-space: pre-wrap;">${isuLaporan}</p>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 40px; text-align: center;">
            Email ini dikirim secara otomatis oleh sistem Laporan MDN Indonesia.
          </p>
        </div>
      `,
    };

    // Detect if placeholders are still present
    const isPlaceholder =
      process.env.SMTP_USER === "your-email@gmail.com" ||
      process.env.SMTP_PASS === "your-app-password" ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS;

    if (isPlaceholder) {
      console.log("=== Mode Demo / Development ===");
      console.log("Laporan dari:", nama);
      console.log("Data:", body);
      console.log("===============================");
      return NextResponse.json(
        { message: "Mode Demo: Laporan diterima dan dicatat di log server. (Isi SMTP di .env untuk kirim email asli)" },
        { status: 200 }
      );
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Laporan berhasil dikirim." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Gagal mengirim email. Silakan cek konfigurasi server." },
      { status: 500 }
    );
  }
}
