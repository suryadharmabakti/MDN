"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheck, FaLaptop, FaTimes } from "react-icons/fa";

export default function CheckWarrantyPage() {
    const [sn, setSn] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [showSnHelp, setShowSnHelp] = useState(false);

    const onSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sn) return;
        setLoading(true);
        setResult(null);
        setHasSearched(true);

        try {
            const res = await fetch(`/api/serial?sn=${encodeURIComponent(sn)}`);
            const data = await res.json();
            setResult({ ok: res.ok, ...data });
        } catch (err) {
            setResult({ ok: false, error: "Gagal menghubungi server" });
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15";

    return (
        <main className="apple-v2 bg-white page-warranty">
            <section className="bg-gradient-to-b from-[#fbfbfd] to-white px-4 pb-12 pt-20 text-center sm:pt-28">
                <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-gray-900 [text-wrap:balance] sm:text-6xl">
                    Cek status garansi perangkat Anda.
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
                    Masukkan nomor seri untuk melihat perlindungan dan informasi perangkat MDN Anda.
                </p>
            </section>

            <div className="mx-auto max-w-xl px-4 pb-24 sm:px-6">
                <form onSubmit={onSearch} className="space-y-5">

                    <div>
                        <div className="mb-2 flex items-center justify-between gap-4">
                            <label htmlFor="sn" className="text-sm font-medium text-gray-700">Nomor seri</label>
                            <button type="button" onClick={() => setShowSnHelp(!showSnHelp)} className="text-sm text-[#0071e3] hover:underline">
                                {showSnHelp ? "Tutup panduan" : "Cara menemukan nomor seri ›"}
                            </button>
                        </div>
                        <div className="relative">
                            <FaLaptop className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input id="sn" type="text" value={sn} onChange={(e) => setSn(e.target.value)} placeholder="Contoh: MDN-XYZ-123456" className={inputClass} required autoComplete="off" />
                        </div>
                        {showSnHelp && (
                            <div className="mt-3 rounded-2xl bg-[#f5f5f7] p-5 text-sm leading-relaxed text-gray-600">
                                <ul className="space-y-2">
                                    <li><span className="font-semibold text-gray-900">Laptop:</span> stiker barcode di bagian bawah bodi atau pada kardus kemasan resmi.</li>
                                    <li><span className="font-semibold text-gray-900">PC / server:</span> stiker di bagian belakang atau samping casing.</li>
                                    <li><span className="font-semibold text-gray-900">Windows:</span> buka Command Prompt, ketik <code className="rounded bg-white px-1.5 py-0.5 text-xs text-gray-800">wmic bios get serialnumber</code>, lalu tekan Enter.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading || !sn} className="w-full rounded-full bg-[#0071e3] py-3.5 font-medium text-white transition-colors hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:bg-gray-300">
                        {loading ? "Memeriksa…" : "Cek garansi"}
                    </button>
                </form>

                {/* Results */}
                {hasSearched && !loading && (
                    <div className="mt-10">
                        {result?.ok ? (
                            <div className="rounded-[28px] bg-[#f5f5f7] p-7">
                                <div className="flex items-center gap-3">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f8ee] text-[#248a3d]">
                                        <FaCheck />
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-semibold tracking-tight text-gray-900">Perangkat ditemukan</h2>
                                        <p className="text-sm text-gray-500">{result.data.serialNumber}</p>
                                    </div>
                                </div>
                                <dl className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm">
                                    <div className="flex justify-between gap-4 py-4">
                                        <dt className="text-gray-500">Model produk</dt>
                                        <dd className="text-right font-medium text-gray-900">{result.data.modelName || "Perangkat MDN"}</dd>
                                    </div>
                                    {result.data.warrantyUntil && (
                                        <>
                                            <div className="flex justify-between gap-4 py-4">
                                                <dt className="text-gray-500">Garansi berakhir</dt>
                                                <dd className="text-right font-medium text-gray-900">
                                                    {new Date(result.data.warrantyUntil).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                                                </dd>
                                            </div>
                                            <div className="flex justify-between gap-4 py-4">
                                                <dt className="text-gray-500">Status</dt>
                                                <dd className={`font-semibold ${result.data.warrantyValid ? "text-[#248a3d]" : "text-[#bf4800]"}`}>
                                                    {result.data.warrantyValid ? "Aktif" : "Berakhir"}
                                                </dd>
                                            </div>
                                        </>
                                    )}
                                </dl>
                            </div>
                        ) : (
                            <div className="rounded-[28px] bg-[#f5f5f7] p-7 text-center">
                                <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#fdecec] text-[#d70015]">
                                    <FaTimes />
                                </span>
                                <h2 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">Perangkat tidak ditemukan</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {result?.error || result?.message || "Nomor seri tidak terdaftar. Periksa kembali nomornya lalu coba lagi."}
                                </p>
                                <Link href="/hubungi-kami" className="mt-4 inline-block text-sm text-[#0071e3] hover:underline">
                                    Hubungi dukungan MDN ›
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                <ol className="mt-14 grid gap-6 border-t border-gray-200 pt-10 sm:grid-cols-3">
                    {[
                        "Temukan nomor seri pada stiker perangkat atau kemasan.",
                        "Masukkan nomor seri tanpa spasi tambahan.",
                        "Lihat status dan tanggal akhir garansi.",
                    ].map((step, i) => (
                        <li key={step}>
                            <span className="text-sm font-semibold text-[#0071e3]">0{i + 1}</span>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{step}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
}
