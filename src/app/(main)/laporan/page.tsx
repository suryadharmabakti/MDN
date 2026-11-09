"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaExclamationTriangle, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaBarcode } from "react-icons/fa";
import styles from "../apple-v3-pages.module.css";

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

    return (
        <div className={`${styles.appleV3} apple-v2 ${styles.reportPage} page-report flex flex-col items-center`}>
            <div className={styles.reportPanel}>
                {/* Header Section */}
                <div className={styles.reportHeader}>
                   
                    <h1>Laporan Isu</h1>
                    <p>
                        Berikan masukan atau laporkan masalah Anda. Kami siap membantu dengan sepenuh hati.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className={`${styles.reportForm} space-y-8`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Nama */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FaUser className="text-lg" />
                                </div>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan nama lengkap Anda"
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FaEnvelope className="text-lg" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="email@contoh.com"
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                                Lokasi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FaMapMarkerAlt className="text-lg" />
                                </div>
                                <input
                                    type="text"
                                    name="lokasi"
                                    value={formData.lokasi}
                                    onChange={handleChange}
                                    required
                                    placeholder="Masukkan lokasi Anda"
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Nomor HP */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                                Nomor HP
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FaPhoneAlt className="text-lg" />
                                </div>
                                <input
                                    type="tel"
                                    name="nomorHp"
                                    value={formData.nomorHp}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: 081234567890"
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Serial Number */}
                        <div className="space-y-2 group">
                            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                                Serial Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                    <FaBarcode className="text-lg" />
                                </div>
                                <input
                                    type="text"
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Contoh: MDN-123456"
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Isu Laporan */}
                    <div className="space-y-2 group">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">
                            Isi Laporan / Isu
                        </label>
                        <div className="relative">
                            <div className="absolute top-5 left-5 pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                                <FaExclamationTriangle className="text-lg" />
                            </div>
                            <textarea
                                name="isuLaporan"
                                value={formData.isuLaporan}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Ceritakan detail masalah atau laporan Anda di sini..."
                                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-gray-700 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Alert Message */}
                    {message && (
                        <div
                            className={`p-6 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300 ${message.type === "success"
                                ? "bg-green-50 text-green-700 border border-green-100"
                                : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${message.type === "success" ? "bg-green-100" : "bg-red-100"
                                    }`}
                            >
                                {message.type === "success" ? "✓" : "!"}
                            </div>
                            <p className="font-medium">{message.text}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium rounded-2xl transition-all shadow-xl shadow-primary-500/20 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Kirim Laporan</span>
                                <FaPaperPlane className="text-sm" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
