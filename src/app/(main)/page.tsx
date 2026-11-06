import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaBolt, FaDatabase, FaMicrochip, FaShieldAlt } from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import styles from "./apple-v2.module.css";

export const dynamic = "force-dynamic";

const strengths = [
  { icon: FaMicrochip, number: "8", suffix: "GPU", title: "Komputasi siap AI", text: "Konfigurasi GPU untuk pelatihan model, inferensi, dan beban kerja intensif." },
  { icon: FaDatabase, number: "600+", suffix: "TB", title: "Penyimpanan padat", text: "Kapasitas besar untuk data yang terus tumbuh tanpa mengorbankan akses." },
  { icon: FaShieldAlt, number: "24/7", suffix: "", title: "Dibuat untuk selalu aktif", text: "Komponen redundant, hot-swap, dan dukungan teknis untuk infrastruktur penting." },
];

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { category: "Server" },
    orderBy: [{ isBestSeller: "desc" }, { createdAt: "asc" }],
    take: 5,
  });

  return (
    <div className={`${styles.appleV2} apple-v2 overflow-hidden bg-white text-ink`}>
      <section className="relative isolate overflow-hidden bg-[#f5f5f7] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary-600"></p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Teknologi untuk
            <br />manusia yang melaju.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
            MDN menghadirkan infrastruktur enterprise yang andal untuk AI, komputasi berperforma tinggi, dan data yang terus bertumbuh.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-base font-medium">
            <Link href="/produk?category=Server" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-white shadow-sm transition-colors hover:bg-primary-700">Lihat produk <FaArrowRight className="text-xs" /></Link>
            <Link href="/hubungi-kami" className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-primary-700 transition-colors hover:bg-primary-50">Konsultasi kebutuhan <FaArrowRight className="text-xs" /></Link>
          </div>
          <p className="mt-5 text-sm text-ink-secondary">Garansi resmi <span className="px-1">·</span> Dukungan teknis <span className="px-1">·</span> Konfigurasi sesuai kebutuhan</p>
          {/* Sebaiknya ganti foto hero ini dengan foto asli tim atau ruang server MDN agar lebih autentik. */}
          <div className={`${styles.heroFrame} relative mx-auto mt-8 h-[300px] max-w-6xl sm:h-[440px] lg:h-[590px]`}>
            <Image src="/uploads/Teknisi-MDN-cutout.png" alt="Teknisi MDN memeriksa infrastruktur server" fill priority className="object-contain object-center" sizes="(max-width: 768px) 100vw, 1200px" />
          </div>
        </div>
      </section>

      <section className="bg-white px-4"><div className={styles.trustStrip}><div><strong>[ISI]</strong><span>tahun beroperasi</span></div><div><strong>[ISI]</strong><span>proyek ditangani</span></div><div><strong>[ISI]</strong><span>kota terlayani</span></div><div><strong>[ISI]</strong><span>unit terkirim</span></div></div></section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center"><p className="text-sm font-semibold tracking-[0.16em] text-primary-600">KEUNGGULAN DEMI KEUNGGULAN</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Performa ketika setiap detik berarti.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">Arsitektur yang dirancang untuk komputasi besar, penyimpanan rapat, dan keandalan yang konsisten.</p></div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {strengths.map((item, index) => <div key={item.title} className={`rounded-panel border border-line bg-surface p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 lg:p-10 ${index === 0 ? "md:row-span-2" : ""}`}><div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm"><item.icon className="text-xl text-primary-600" aria-hidden="true" /></div><p className="text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">{item.number}<span className="ml-1 text-xl tracking-tight text-primary-600">{item.suffix}</span></p></div><h3 className="mt-10 text-2xl font-semibold tracking-tight">{item.title}</h3><p className="mt-3 max-w-md text-base leading-relaxed text-ink-secondary">{item.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold tracking-[0.16em] text-primary-600">OUR PRODUCTS</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Pilih fondasi Anda.</h2></div><Link href="/produk?category=Server" className="inline-flex items-center gap-2 text-lg font-medium text-primary-600 hover:underline">Lihat semua server <FaArrowRight className="text-xs" /></Link></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary-600">CARA KAMI BEKERJA</p>
          <div className="mt-8 grid gap-6 border-t border-line pt-8 md:grid-cols-4">
            {["Konsultasi", "Konfigurasi", "Pengiriman & instalasi", "Dukungan"].map((step, index) => <div key={step}><p className="text-4xl font-semibold tracking-[-0.05em] text-primary-200">0{index + 1}</p><h3 className="mt-4 text-xl font-semibold">{step}</h3><p className="mt-2 text-sm leading-relaxed text-ink-secondary">{index === 0 ? "Diskusikan kebutuhan beban kerja dan target Anda." : index === 1 ? "Pilih komponen yang tepat untuk kebutuhan sistem." : index === 2 ? "Koordinasi pengiriman dan kesiapan implementasi." : "Tim kami siap membantu setelah sistem berjalan."}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#071a42] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="text-sm font-semibold tracking-wide text-primary-300">UNTUK SETIAP AMBISI</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">Dari data center hingga AI generatif.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">Kami membantu instansi pemerintah dan perusahaan membangun infrastruktur yang siap untuk beban kerja hari ini dan pertumbuhan esok hari.</p><Link href="/hubungi-kami" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary-700 transition-colors hover:bg-primary-50">Bicara dengan tim MDN <FaArrowRight className="text-xs" /></Link></div><div className="relative overflow-hidden rounded-panel bg-gradient-to-br from-primary-500/35 to-white/5 p-6 ring-1 ring-white/10 sm:p-9"><div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-primary-300/30 blur-3xl" /><div className="relative flex items-center gap-3 text-primary-200"><FaBolt /><span className="text-sm font-semibold tracking-wide">IMPLEMENTASI YANG TERUKUR</span></div><div className="relative mt-4 h-52 sm:h-60"><Image src="/uploads/server-hgx-ai-8gpu.png" alt="MDN HGX AI Server" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 1024px) 100vw, 500px" /></div><dl className="relative mt-6 grid grid-cols-3 gap-3 text-center"><div className="rounded-xl bg-white/10 p-3"><dt className="text-[11px] text-white/60">Konfigurasi</dt><dd className="mt-1 text-sm font-semibold">Fleksibel</dd></div><div className="rounded-xl bg-white/10 p-3"><dt className="text-[11px] text-white/60">Dukungan</dt><dd className="mt-1 text-sm font-semibold">Profesional</dd></div><div className="rounded-xl bg-white/10 p-3"><dt className="text-[11px] text-white/60">Sektor</dt><dd className="mt-1 text-sm font-semibold">Enterprise</dd></div></dl></div></div>
      </section>

      <section className="bg-white px-4"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold tracking-[0.16em] text-primary-600">SOLUSI UNTUK INDUSTRI</p><h2 className="mt-4 max-w-3xl">Infrastruktur yang mengikuti cara Anda bekerja.</h2><div className={`${styles.industry} mt-10`}><article><h3>Pemerintahan</h3><p>Infrastruktur stabil untuk layanan publik dan kebutuhan data antarunit.</p><span>Beban kerja kritis</span></article><article><h3>Pendidikan</h3><p>Komputasi dan penyimpanan untuk laboratorium, riset, serta pembelajaran.</p><span>Riset & pembelajaran</span></article><article><h3>Perbankan</h3><p>Fondasi yang dapat dikonfigurasi untuk data, aplikasi, dan operasional inti.</p><span>Data & transaksi</span></article><article><h3>Riset AI</h3><p>GPU dan storage berkapasitas tinggi untuk eksperimen dan model skala besar.</p><span>AI & HPC</span></article></div></div></section>

      <section className="bg-[#f5f5f7] px-4"><div className="mx-auto max-w-7xl"><div className={styles.faq}><p className="text-center text-sm font-semibold tracking-[0.16em] text-primary-600">PERTANYAAN UMUM</p><h2 className="mt-4 text-center">Mari mulai dari kebutuhan Anda.</h2>{["Apakah server dapat dikonfigurasi sesuai kebutuhan?", "Bagaimana layanan dukungan setelah implementasi?", "Apakah MDN melayani pengiriman dan instalasi?", "Bagaimana pembelian untuk instansi?", "Bagaimana informasi garansi produk?"].map((question) => <details key={question}><summary>{question}</summary><p>[ISI: Jawaban resmi MDN untuk {question.toLowerCase()}]</p></details>)}</div><div className={`${styles.closing} mt-20`}><h2>Butuh konfigurasi khusus?</h2><p>Ceritakan beban kerja, kapasitas, dan target implementasi Anda. Tim MDN siap membantu menyusun pilihan yang tepat.</p><a href="https://api.whatsapp.com/send/?phone=6282128907619">WhatsApp MDN</a><a href="mailto:sales@mdntech.co.id">sales@mdntech.co.id</a></div></div></section>
    </div>
  );
}
