"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLaptop, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";
import styles from "../apple-v3-pages.module.css";

export default function CheckWarrantyPage() {
    const [sn, setSn] = useState("");
    const [country, setCountry] = useState("Indonesia");
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

    return (
        <main className={`${styles.appleV3} apple-v2 ${styles.warrantyPage} page-warranty`}>
            <section className={styles.warrantyHero}>
                <p className={styles.eyebrow}>MDN Care</p>
                <h1 className={styles.warrantyTitle}>Cek status garansi perangkat Anda.</h1>
                <p className={styles.warrantyLead}>Masukkan nomor seri untuk melihat perlindungan dan informasi perangkat MDN Anda.</p>
            </section>

            <div className={styles.warrantyMain}>
                <div className={styles.warrantyGrid}>
                    <section className={styles.formPanel} aria-labelledby="warranty-form-title">
                        <h2 id="warranty-form-title" className={styles.panelTitle}>Mulai pemeriksaan</h2>
                        <p className={styles.panelIntro}>Pilih negara pembelian, lalu masukkan nomor seri perangkat Anda.</p>
                        <form onSubmit={onSearch}>

                    {/* Country Field */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>
                            Country/Region of purchase
                        </label>
                        <div className={styles.fieldControl}>
                            <div className={styles.fieldIcon}>
                                <FaMapMarkerAlt />
                            </div>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className={styles.select}
                            >
                                <option value="Indonesia">Indonesia</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Serial Number Field */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>
                            <span>Serial Number</span>
                            <button
                                type="button"
                                onClick={() => setShowSnHelp(!showSnHelp)}
                                className={styles.helpButton}
                            >
                                <FaQuestionCircle />
                                {showSnHelp ? "Tutup panduan" : "Find my serial number"}
                            </button>
                        </label>
                        <div className={styles.fieldControl}>
                            <div className={styles.fieldIcon}>
                                <FaLaptop />
                            </div>
                            <input
                                type="text"
                                value={sn}
                                onChange={(e) => setSn(e.target.value)}
                                placeholder="e.g. MDN-XYZ-123456"
                                className={styles.input}
                                required
                            />
                        </div>
                        {showSnHelp && (
                            <div className={styles.serialHelp}>
                                <p>Cara menemukan Nomor Seri perangkat Anda:</p>
                                <ul>
                                    <li><strong>Laptop:</strong> Cek stiker barcode di bagian bawah bodi laptop atau pada kardus kemasan resmi.</li>
                                    <li><strong>PC / Desktop:</strong> Cek stiker di bagian belakang atau samping casing.</li>
                                    <li><strong>Windows:</strong> Buka Command Prompt (cmd) lalu ketik <code>wmic bios get serialnumber</code> lalu tekan Enter.</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !sn}
                        className={styles.submit}
                    >
                        {loading ? "Checking Database..." : "Check Warranty"}
                    </button>
                </form>

                {/* Results Area */}
                {hasSearched && (
                    <div className={`${styles.result} ${loading ? "hidden" : result?.ok ? styles.success : styles.failure}`}>
                        {result?.ok ? (
                            <div>
                                <div className={styles.resultHeader}>
                                    <div className={styles.statusIcon}>
                                        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className={styles.resultTitle}>Perangkat ditemukan</h3>
                                        <p className={styles.serial}>{result.data.serialNumber}</p>
                                    </div>
                                </div>

                                <div className={styles.resultCard}>
                                    <div className={styles.resultRow}>
                                        <span>Model produk</span>
                                        <strong>{result.data.modelName || "MDN Device"}</strong>
                                    </div>

                                    {result.data.warrantyUntil && (
                                        <>
                                            <div className={styles.resultRow}>
                                                <span>Masa garansi berakhir</span>
                                                <strong>
                                                    {new Date(result.data.warrantyUntil).toLocaleDateString("id-ID", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </strong>
                                            </div>
                                            <div className={styles.resultRow}>
                                                <span>Status</span>
                                                {result.data.warrantyValid ? (
                                                    <strong className={`${styles.badge} ${styles.active}`}>
                                                        Aktif
                                                    </strong>
                                                ) : (
                                                    <strong className={`${styles.badge} ${styles.expired}`}>
                                                        Berakhir
                                                    </strong>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-2">
                                <div className={`${styles.statusIcon} mx-auto mb-3`}>
                                    <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h3 className={styles.resultTitle}>Perangkat tidak ditemukan</h3>
                                <p className={`${styles.panelIntro} mt-1 mb-0`}>
                                    {result?.error || result?.message || "We couldn't find a device with that serial number. Please check the number and try again."}
                                </p>
                                <div className={styles.support}>
                                    <p>Butuh bantuan? <Link href="/hubungi-kami">Hubungi dukungan MDN</Link></p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                    </section>

                    <aside className={styles.sidePanel}>
                        <p className={styles.sideKicker}>Bantuan mandiri</p>
                        <h2>Perlindungan yang mudah dipahami.</h2>
                        <p>Gunakan nomor seri resmi perangkat untuk mendapatkan informasi yang paling sesuai.</p>
                        <ol className={styles.steps}>
                            <li><span className={styles.stepNumber}>1</span><span>Pilih negara atau wilayah tempat perangkat dibeli.</span></li>
                            <li><span className={styles.stepNumber}>2</span><span>Masukkan nomor seri tanpa spasi tambahan.</span></li>
                            <li><span className={styles.stepNumber}>3</span><span>Lihat status dan tanggal perlindungan perangkat Anda.</span></li>
                        </ol>
                    </aside>
                </div>
            </div>
            <p className={styles.signIn}>Memeriksa beberapa perangkat? <Link href="/login">Masuk ke akun Anda</Link></p>
        </main>
    );
}
