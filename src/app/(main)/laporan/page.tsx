"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBarcode } from "react-icons/fa";

export default function LaporanPage() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        isuLaporan: "",
        lokasi: "",
        nomorHp: "",
        serialNumber: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch("/api/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setMessage({ type: "success", text: data.message || "Laporan berhasil dikirim!" });
                setFormData({ nama: "", email: "", isuLaporan: "", lokasi: "", nomorHp: "", serialNumber: "" });
            } else {
                setMessage({ type: "error", text: data.message || "Gagal mengirim laporan. Silakan periksa kembali formulir Anda." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Terjadi kesalahan sistem. Silakan coba lagi nanti." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const fields = [
        { name: "nama", label: "Nama lengkap", type: "text", placeholder: "Nama Anda", icon: FaUser },
        { name: "email", label: "Email", type: "email", placeholder: "email@contoh.com", icon: FaEnvelope },
        { name: "nomorHp", label: "Nomor HP", type: "tel", placeholder: "Contoh: 081234567890", icon: FaPhoneAlt },
        { name: "lokasi", label: "Lokasi", type: "text", placeholder: "Kota atau alamat perangkat", icon: FaMapMarkerAlt },
    ] as const;

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#006fbd] focus:ring-4 focus:ring-[#006fbd]/15";

    return (
        <main className="apple-v2 bg-white page-report">
            <section className="bg-gradient-to-b from-[#fbfbfd] to-white px-4 pb-12 pt-20 text-center sm:pt-28">

                <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-gray-900 [text-wrap:balance] sm:text-6xl">
                    Ada kendala? Kami bantu selesaikan.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
                    Ceritakan masalah perangkat Anda. Tim MDN akan menghubungi Anda untuk tindak lanjut.
                </p>
            </section>

            <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {fields.map((f) => (
                            <div key={f.name}>
                                <label htmlFor={f.name} className="mb-2 block text-sm font-medium text-gray-700">{f.label}</label>
                                <div className="relative">
                                    <f.icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                                    <input id={f.name} type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required placeholder={f.placeholder} className={inputClass} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="serialNumber" className="mb-2 block text-sm font-medium text-gray-700">Nomor seri perangkat</label>
                        <div className="relative">
                            <FaBarcode className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                            <input id="serialNumber" type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required placeholder="Contoh: MDN-123456" className={inputClass} autoComplete="off" />
                        </div>
                        <Link href="/cek-garansi" className="mt-2 inline-block text-sm text-[#006fbd] hover:underline">Cara menemukan nomor seri ›</Link>
                    </div>

                    <div>
                        <label htmlFor="isuLaporan" className="mb-2 block text-sm font-medium text-gray-700">Detail masalah</label>
                        <textarea
                            id="isuLaporan"
                            name="isuLaporan"
                            value={formData.isuLaporan}
                            onChange={handleChange}
                            required
                            rows={6}
                            placeholder="Jelaskan apa yang terjadi, kapan mulai muncul, dan langkah yang sudah dicoba."
                            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#006fbd] focus:ring-4 focus:ring-[#006fbd]/15"
                        />
                    </div>

                    {message && (
                        <div className={`rounded-2xl p-5 text-sm font-medium ${message.type === "success" ? "bg-[#e8f8ee] text-[#248a3d]" : "bg-[#fdecec] text-[#d70015]"}`} role="status">
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[#006fbd] py-3.5 font-medium text-white transition-colors hover:bg-[#005c9d] disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {loading ? "Mengirim…" : "Kirim laporan"}
                    </button>
                </form>

                <p className="mt-10 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    Butuh jawaban lebih cepat?{" "}
                    <a href="https://api.whatsapp.com/send/?phone=6282128907619" target="_blank" rel="noopener noreferrer" className="text-[#006fbd] hover:underline">
                        Hubungi kami lewat WhatsApp ›
                    </a>
                </p>
            </div>
        </main>
    );
}
