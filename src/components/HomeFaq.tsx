"use client";

import { useState } from "react";
import styles from "@/app/(main)/apple-v2.module.css";

const faqs = [
  {
    q: "Apakah server dapat dikonfigurasi sesuai kebutuhan?",
    a: "Ya, MDN menyediakan solusi server yang dapat disesuaikan dengan kebutuhan operasional dan infrastruktur IT pelanggan. Konfigurasi dapat direncanakan berdasarkan kebutuhan prosesor, RAM, penyimpanan, kapasitas komputasi, serta tujuan penggunaan, seperti data center, virtualisasi, AI, dan pengolahan data berskala besar. Ketersediaan konfigurasi akan dikonfirmasi melalui konsultasi teknis.",
  },
  {
    q: "Bagaimana layanan dukungan setelah implementasi?",
    a: "MDN menyediakan layanan after-sales berupa dukungan teknis, bantuan penanganan kendala, perbaikan, dan layanan garansi produk. Dukungan diberikan sesuai ketentuan layanan dan cakupan garansi yang disepakati untuk membantu menjaga keandalan operasional pelanggan.",
  },
  {
    q: "Apakah MDN melayani pengiriman dan instalasi?",
    a: "MDN dapat membantu mengoordinasikan kebutuhan pengiriman dan instalasi perangkat sesuai lokasi proyek serta ruang lingkup pekerjaan yang disepakati. Untuk kebutuhan instalasi server, pelanggan dapat berkonsultasi terlebih dahulu mengenai spesifikasi perangkat, kesiapan infrastruktur, dan kebutuhan teknis di lokasi.",
  },
  {
    q: "Bagaimana pembelian untuk instansi?",
    a: "Perusahaan, instansi pemerintah, dan organisasi dapat menghubungi tim MDN untuk menyampaikan kebutuhan pengadaan perangkat IT. Tim MDN akan membantu proses konsultasi spesifikasi, penyusunan penawaran harga, serta kelengkapan dokumen pendukung sesuai mekanisme pengadaan yang berlaku.",
  },
  {
    q: "Bagaimana informasi garansi produk?",
    a: "Produk MDN dilengkapi layanan garansi sesuai jenis perangkat dan ketentuan pembelian. Informasi mengenai masa berlaku, cakupan garansi, serta prosedur klaim dapat diperoleh melalui tim MDN sebelum melakukan pemesanan.",
  },
  {
    q: "Produk dan layanan apa saja yang tersedia di MDN?",
    a: "MDN menyediakan berbagai solusi teknologi, meliputi server, komputer dan laptop, komponen elektronik, solusi Internet of Things (IoT), pengembangan perangkat lunak dan AI, serta layanan dukungan teknis dan purna jual.",
  },
  {
    q: "Apakah server MDN dapat digunakan untuk data center?",
    a: "Ya, MDN menyediakan solusi server untuk mendukung kebutuhan infrastruktur data center, termasuk pemrosesan data, penyimpanan berskala besar, dan aplikasi dengan kebutuhan komputasi tinggi. Pemilihan perangkat disesuaikan dengan kapasitas dan kebutuhan sistem pelanggan.",
  },
  {
    q: "Apakah MDN menyediakan server untuk kebutuhan AI?",
    a: "MDN menyediakan solusi server yang ditujukan untuk kebutuhan komputasi AI dan high-performance computing. Spesifikasi perangkat, termasuk kebutuhan GPU, CPU, RAM, dan penyimpanan, dapat didiskusikan bersama tim teknis berdasarkan karakteristik beban kerja.",
  },
  {
    q: "Apakah MDN melayani pembelian dalam jumlah besar?",
    a: "MDN melayani konsultasi kebutuhan pengadaan perangkat untuk perusahaan dan organisasi, termasuk kebutuhan proyek berskala besar. Ketersediaan produk, jumlah unit, dan jadwal pengiriman akan dikonfirmasi berdasarkan kebutuhan pemesanan.",
  },
  {
    q: "Apakah MDN menyediakan layanan konsultasi sebelum pembelian?",
    a: "Ya, pelanggan dapat berkonsultasi mengenai kebutuhan perangkat dan spesifikasi teknis sebelum melakukan pembelian. Konsultasi ini membantu menentukan solusi yang sesuai dengan kebutuhan operasional dan anggaran.",
  },
  {
    q: "Berapa lama proses pemesanan dan pengiriman server?",
    a: "Waktu pemesanan dan pengiriman bergantung pada jenis perangkat, ketersediaan stok, konfigurasi yang dibutuhkan, dan lokasi tujuan. Estimasi waktu akan diinformasikan melalui penawaran atau konfirmasi pemesanan.",
  },
  {
    q: "Bagaimana cara mendapatkan penawaran harga dari MDN?",
    a: "Pelanggan dapat menghubungi tim MDN dengan menyampaikan jenis perangkat, jumlah unit, spesifikasi, dan kebutuhan implementasi. Tim MDN akan membantu menyiapkan penawaran sesuai kebutuhan yang disampaikan.",
  },
];

const VISIBLE = 5;

export default function HomeFaq() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? faqs : faqs.slice(0, VISIBLE);

  return (
    <div className={styles.faq}>
      <h2 className="text-center">Mari mulai dari kebutuhan Anda.</h2>
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="text-[17px] font-medium text-[#006fbd] hover:underline"
        >
          {showAll ? "View less ‹" : "View more ›"}
        </button>
      </div>
    </div>
  );
}
