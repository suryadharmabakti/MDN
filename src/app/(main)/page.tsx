import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import HomeFaq from "@/components/HomeFaq";
import styles from "./apple-v2.module.css";

export const dynamic = "force-dynamic";

const strengths = [
  { number: "8", suffix: "GPU", title: "Komputasi siap AI", text: "Konfigurasi GPU untuk pelatihan model, inferensi, dan beban kerja intensif." },
  { number: "600+", suffix: "TB", title: "Penyimpanan padat", text: "Kapasitas besar untuk data yang terus tumbuh tanpa mengorbankan akses." },
  { number: "24/7", suffix: "Uptime", title: "Dibuat untuk selalu aktif", text: "Komponen redundant, hot-swap, dan dukungan teknis untuk infrastruktur penting." },
];

const sectorLogos = [
  ["sektor-pemerintah-0-0.png", "Kementerian Komunikasi dan Digital"], ["sektor-pemerintah-0-1.png", "Kementerian Keuangan"], ["sektor-pemerintah-0-2.png", "Kementerian Kesehatan"], ["sektor-pemerintah-0-3.png", "Kementerian Pendidikan"], ["sektor-pemerintah-0-4.png", "Kementerian Pertahanan"],
  ["sektor-komersial-0-0.png", "Telkom Indonesia"], ["sektor-komersial-0-1.png", "Telkomsel"], ["sektor-komersial-0-2.png", "Indosat"], ["sektor-komersial-0-3.png", "XL Axiata"], ["sektor-komersial-0-4.png", "BCA"],
  ["sektor-komersial-1-0.png", "BRI"], ["sektor-komersial-1-1.png", "Bank Mandiri"], ["sektor-komersial-1-2.png", "BNI"], ["sektor-komersial-1-3.png", "GoTo"], ["sektor-komersial-1-4.png", "Bukalapak"],
  ["sektor-komersial-2-0.png", "Traveloka"], ["sektor-komersial-2-1.png", "Pertamina"], ["sektor-komersial-2-2.png", "PLN"], ["sektor-komersial-2-3.png", "BCA Digital"], ["sektor-komersial-2-4.png", "Biznet"],
] as const;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { category: "Server" },
    orderBy: [{ isBestSeller: "desc" }, { createdAt: "asc" }],
    take: 3,
  });

  return (
    <div className={`${styles.appleV2} apple-v2 overflow-hidden bg-white text-ink`}>
      <section className="relative isolate overflow-hidden bg-[#f5f5f7] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl text-center">
                    <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
            Koneksi Cerdas,
            <br />Infrastruktur Anda.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
            MDN menghadirkan infrastruktur enterprise yang andal untuk AI, komputasi berperforma tinggi, dan data yang terus bertumbuh.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 text-base font-medium">
            <Link href="/produk?category=Server" className="inline-flex items-center rounded-full bg-[#006fbd] px-6 py-3 text-white transition-colors hover:bg-[#005c9d]">Lihat produk</Link>
            <Link href="/hubungi-kami" className="inline-flex items-center px-4 py-3 text-[#006fbd] hover:underline">Konsultasi kebutuhan ›</Link>
          </div>
          <p className="mt-6 text-[15px] text-[#6e6e73]">Garansi resmi <span className="px-1">·</span> Dukungan teknis <span className="px-1">·</span> Konfigurasi sesuai kebutuhan</p>
          {/* Sebaiknya ganti foto hero ini dengan foto asli tim atau ruang server MDN agar lebih autentik. */}
          <div className={`${styles.heroFrame} relative mx-auto mt-8 h-[250px] max-w-6xl mb-8 sm:mt-14 sm:mb-16 sm:h-[440px] lg:h-[590px]`}>
            <Image src="/uploads/Teknisi-MDN-cutout.png" alt="Teknisi MDN memeriksa infrastruktur server" fill priority className="object-contain object-center" sizes="(max-width: 768px) 100vw, 1200px" />
          </div>
        </div>
      </section>

      <section className={`${styles.sectorSection} bg-white`} aria-label="Sektor yang dilayani MDN">
        <p className="mb-8 text-center text-sm font-medium tracking-[0.16em] text-ink-secondary">DIPERCAYA OLEH BERBAGAI SEKTOR</p>
        <div className={styles.logoMarquee}>
          <div className={styles.logoTrack}>
            {[...sectorLogos, ...sectorLogos].map(([fileName, label], index) => (
              <div className={styles.logoPanel} key={`${fileName}-${index}`} aria-hidden={index >= sectorLogos.length}>
                <Image src={`/uploads/${fileName}`} alt={index < sectorLogos.length ? label : ""} fill sizes="(max-width: 768px) 160px, 220px" className={`${styles.logoImg} object-contain`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.productSection} bg-[#f5f5f7] px-4 py-16 sm:px-6 lg:px-8 lg:py-24`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Pilih fondasi Anda.</h2><Link href="/produk?category=Server" className="text-lg text-[#006fbd] hover:underline sm:pb-2">Lihat semua server ›</Link></div>
          <div className={`${styles.productGrid} mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
            {products.map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.performanceSection} bg-white px-4 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center"><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] [text-wrap:balance] sm:text-6xl">Performa ketika setiap detik berarti.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">Arsitektur yang dirancang untuk komputasi besar, penyimpanan rapat, dan keandalan yang konsisten.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {strengths.map((item) => <article key={item.title} className="flex flex-col rounded-[28px] bg-[#f5f5f7] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"><p className="flex items-baseline gap-2"><span className="bg-gradient-to-br from-[#006fbd] to-[#3a97d6] bg-clip-text text-5xl font-semibold tracking-[-0.06em] text-transparent sm:text-6xl lg:text-7xl">{item.number}</span>{item.suffix && <span className="text-lg font-medium tracking-tight text-ink-secondary">{item.suffix}</span>}</p><div className="mt-8 h-px bg-black/[0.08]" /><h3 className="mt-6 text-2xl font-semibold tracking-tight">{item.title}</h3><p className="mt-3 text-base leading-relaxed text-ink-secondary">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#003c66] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"><div className="lg:-mt-24"><h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">Dari data center hingga AI generatif.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">Kami membantu instansi pemerintah dan perusahaan membangun infrastruktur yang siap untuk beban kerja hari ini dan pertumbuhan esok hari.</p><Link href="/hubungi-kami" className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-medium text-[#006fbd] transition-colors hover:bg-[#e8f0ff]">Bicara dengan tim MDN</Link></div><div className="relative"><div className="pointer-events-none absolute left-1/2 top-[42%] h-72 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/25 blur-[90px]" /><div className="relative h-60 sm:h-80"><Image src="/uploads/server-ai-training-6u.png" alt="MDN AI Training Server" fill className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]" sizes="(max-width: 1024px) 100vw, 560px" /></div><dl className="relative mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6 text-center"><div className="px-2"><dt className="text-sm text-white/55">Konfigurasi</dt><dd className="mt-1.5 text-base font-semibold tracking-tight sm:text-lg">Fleksibel</dd></div><div className="px-2"><dt className="text-sm text-white/55">Dukungan</dt><dd className="mt-1.5 text-base font-semibold tracking-tight sm:text-lg">Profesional</dd></div><div className="px-2"><dt className="text-sm text-white/55">Sektor</dt><dd className="mt-1.5 text-base font-semibold tracking-tight sm:text-lg">Enterprise</dd></div></dl></div></div>
      </section>

      <section className={`${styles.industrySection} bg-white px-4 sm:px-6 lg:px-8`}><div className="mx-auto max-w-7xl"><h2 className={`${styles.industryHeading} mt-4 max-w-4xl`}>Infrastruktur yang mengikuti cara Anda bekerja.</h2><div className={`${styles.industry} mt-10`}><article><h3>Pemerintahan</h3><p>Infrastruktur stabil untuk layanan publik dan kebutuhan data antarunit.</p><span>Beban kerja kritis</span></article><article><h3>Pendidikan</h3><p>Komputasi dan penyimpanan untuk laboratorium, riset, serta pembelajaran.</p><span>Riset & pembelajaran</span></article><article><h3>Perbankan</h3><p>Fondasi yang dapat dikonfigurasi untuk data, aplikasi, dan operasional inti.</p><span>Data & transaksi</span></article><article><h3>Riset AI</h3><p>GPU dan storage berkapasitas tinggi untuk eksperimen dan model skala besar.</p><span>AI & HPC</span></article></div></div></section>

      <section className="bg-[#f5f5f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start"><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] [text-wrap:balance] sm:text-6xl">Dari kebutuhan hingga sistem berjalan.</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-ink-secondary">Setiap tahap dirancang agar keputusan teknis dan implementasi terasa lebih jelas.</p><Link href="/hubungi-kami" className="mt-8 inline-block text-lg font-medium text-[#006fbd] hover:underline">Mulai konsultasi ›</Link></div>
          <ol className="border-t border-black/10">
            {[["Konsultasi", "Diskusikan kebutuhan beban kerja, kapasitas, dan target Anda bersama tim kami."], ["Konfigurasi", "Kami bantu memilih komponen yang tepat untuk kebutuhan sistem Anda."], ["Pengiriman & instalasi", "Koordinasi pengiriman hingga perangkat siap digunakan di lokasi."], ["Dukungan", "Tim kami tetap siap membantu setelah sistem berjalan."]].map(([step, text], index) => <li key={step} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-black/10 py-8 sm:grid-cols-[4.5rem_1fr] sm:py-10"><span className="pt-1 text-sm font-semibold tabular-nums text-ink-secondary transition-colors group-hover:text-[#006fbd]">0{index + 1}</span><div><h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{step}</h3><p className="mt-3 max-w-lg text-base leading-relaxed text-ink-secondary sm:text-lg">{text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.faqSection} bg-white px-4 sm:px-6 lg:px-8`}><div className="mx-auto max-w-7xl"><HomeFaq /><div className={`${styles.closing} mt-16`}><h2>Butuh konfigurasi khusus?</h2><p>Ceritakan beban kerja, kapasitas, dan target implementasi Anda. Tim MDN siap membantu menyusun pilihan yang tepat.</p><a href="https://api.whatsapp.com/send/?phone=6282128907619">WhatsApp MDN</a><a href="mailto:sales@mdntech.co.id">sales@mdntech.co.id</a></div></div></section>
    </div>
  );
}
